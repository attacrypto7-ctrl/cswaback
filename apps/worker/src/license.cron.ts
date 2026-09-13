import { sql } from "drizzle-orm";
import { db } from "./util";

/**
 * Cron lisensi — matikan bot yang lisensinya expired.
 * Dijalankan via BullMQ repeatable job (setiap jam) dari main.ts.
 * Menandai tenant expired: status → suspend + catat audit.
 */
export async function runLicenseCron(): Promise<void> {
  const database = db();
  const res: any = await database.execute(sql`
    UPDATE tenants t SET status = 'suspend', updated_at = now()
    WHERE t.status = 'aktif'
      AND t.lisensi_berakhir IS NOT NULL
      AND t.lisensi_berakhir < now()
    RETURNING t.id, t.email`);

  const rows: Array<{ id: string; email: string }> = Array.isArray(res) ? res : res?.rows ?? [];
  for (const r of rows) {
    // drizzle tidak punya akses mudah ke auditLog di sini? ada — via schema:
    const { schema } = await import("@cs-ai/database");
    await database.insert(schema.auditLog).values({
      tenantId: r.id,
      aktor: "system",
      aksi: "Suspend otomatis — lisensi expired",
      target: r.email,
    });
    console.log(`[worker][license-cron] suspend ${r.email}`);
  }

  // Tandai licenses yang lewat tanggal sebagai expired
  await database.execute(sql`
    UPDATE licenses SET status = 'expired', updated_at = now()
    WHERE status = 'aktif' AND berakhir < now()`);
}
