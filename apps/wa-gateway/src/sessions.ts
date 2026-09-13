import fs from "fs";
import path from "path";
import QRCode from "qrcode";
import {
  makeWASocket,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  DisconnectReason,
  type WASocket,
} from "@whiskeysockets/baileys";

// Status per nomor: socket aktif + QR terakhir (base64 data URL untuk dashboard)
interface Session {
  sock: WASocket | null;
  qr: string | null;
  status: "tersambung" | "memindai" | "terputus";
}

const sessions = new Map<string, Session>();

function sessionDir(waNumberId: string): string {
  const base = process.env.WA_SESSION_VOLUME_PATH || "/tmp/wa-sessions";
  const dir = path.join(base, waNumberId);
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

function apiBase(): string {
  return (process.env.INTERNAL_API_URL || "http://localhost:3000/api").replace(/\/$/, "");
}
function internalHeaders(): Record<string, string> {
  return { "Content-Type": "application/json", "x-internal-secret": process.env.INTERNAL_SECRET ?? "" };
}

async function pushStatus(waNumberId: string, status: string): Promise<void> {
  const s = sessions.get(waNumberId);
  if (s) s.status = status as Session["status"];
  await fetch(`${apiBase()}/internal/wa-status`, {
    method: "POST",
    headers: internalHeaders(),
    body: JSON.stringify({ waNumberId, status }),
  }).catch(() => undefined);
}

/** Terima pesan masuk → teruskan ke api (yang memvalidasi kuota & enqueue worker). */
async function pushIncoming(waNumberId: string, nomor: string, kontak: string | undefined, pesan: string): Promise<void> {
  // Heuristik kanal: pesan mengandung kata iklan/promo → Iklan, selain itu Chat.
  // Klasifikasi pasti dilakukan worker; di sini cukup default Chat.
  await fetch(`${apiBase()}/internal/incoming`, {
    method: "POST",
    headers: internalHeaders(),
    body: JSON.stringify({ waNumberId, nomor, kontak, pesan, kanal: "Chat" }),
  }).catch((e) => console.error("[wa] incoming gagal:", (e as Error).message));
}

function textOf(msg: any): string | null {
  const m = msg.message;
  if (!m) return null;
  return (
    m.conversation ??
    m.extendedTextMessage?.text ??
    m.imageMessage?.caption ??
    m.videoMessage?.caption ??
    null
  );
}

/** Buat / sambung ulang sesi Baileys untuk satu wa_number. */
export async function connect(waNumberId: string): Promise<void> {
  const existing = sessions.get(waNumberId);
  if (existing?.sock) return;

  const { state, saveCreds } = await useMultiFileAuthState(sessionDir(waNumberId));
  const { version } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    version,
    auth: state,
    printQRInTerminal: false,
    browser: ["CS AI SaaS", "Chrome", "1.0"],
  });

  sessions.set(waNumberId, { sock, qr: existing?.qr ?? null, status: "memindai" });

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("connection.update", async (u) => {
    const { connection, lastDisconnect, qr } = u;
    if (qr) {
      const dataUrl = await QRCode.toDataURL(qr);
      sessions.set(waNumberId, { sock, qr: dataUrl, status: "memindai" });
      await pushStatus(waNumberId, "memindai");
    }
    if (connection === "open") {
      sessions.set(waNumberId, { sock, qr: null, status: "tersambung" });
      await pushStatus(waNumberId, "tersambung");
      console.log(`[wa] ${waNumberId} tersambung`);
    }
    if (connection === "close") {
      const code = (lastDisconnect?.error as any)?.output?.statusCode;
      sessions.set(waNumberId, { sock: null, qr: null, status: "terputus" });
      await pushStatus(waNumberId, "terputus");
      // Reconnect otomatis kecuali logout eksplisit (401)
      if (code !== DisconnectReason.loggedOut) {
        console.log(`[wa] ${waNumberId} terputus (code ${code}), reconnect 5 dtk...`);
        setTimeout(() => connect(waNumberId).catch(console.error), 5000);
      } else {
        fs.rmSync(sessionDir(waNumberId), { recursive: true, force: true });
      }
    }
  });

  sock.ev.on("messages.upsert", async ({ messages, type }) => {
    if (type !== "notify") return;
    for (const msg of messages) {
      if (msg.key.fromMe) continue;
      const teks = textOf(msg);
      if (!teks) continue;
      const nomor = (msg.key.remoteJid ?? "").replace(/@.*$/, "");
      const kontak = msg.pushName || nomor;
      await pushIncoming(waNumberId, nomor, kontak, teks);
    }
  });
}

export async function disconnect(waNumberId: string): Promise<void> {
  const s = sessions.get(waNumberId);
  try {
    await s?.sock?.logout();
  } catch { /* abaikan */ }
  sessions.set(waNumberId, { sock: null, qr: null, status: "terputus" });
  await pushStatus(waNumberId, "terputus");
}

export function getQr(waNumberId: string): { qr: string | null; status: string } {
  const s = sessions.get(waNumberId);
  return { qr: s?.qr ?? null, status: s?.status ?? "terputus" };
}

export function getSocket(waNumberId: string): WASocket | null {
  return sessions.get(waNumberId)?.sock ?? null;
}

/** Kirim pesan teks via socket aktif. */
export async function sendText(waNumberId: string, nomor: string, pesan: string): Promise<void> {
  const sock = getSocket(waNumberId);
  if (!sock) throw new Error(`Sesi ${waNumberId} tidak tersambung`);
  const jid = nomor.includes("@") ? nomor : `${nomor}@s.whatsapp.net`;
  await sock.sendMessage(jid, { text: pesan });
}
