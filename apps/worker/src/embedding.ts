// =====================================================================
// Embedding lokal (gratis, tanpa API) — PLAN.md bagian 4.3 opsi 1.
// Groq tidak punya endpoint embeddings, jadi worker menghitung vektor
// sendiri sebelum menyimpan chunk ke knowledge_chunks.
//
// Implementasi default: hash-word-vector 768 dimensi (sesuai VECTOR(768)
// di schema.sql), dinormalisasi L2 — cukup untuk RAG skala UMKM dan
// berjalan offline tanpa download model.
//
// Upgrade path: ganti fungsi embed() dengan @xenova/transformers
// (all-MiniLM-L6-v2) atau API embedding eksternal tanpa mengubah
// kode lain — cukup jaga kontrak (string -> number[768]).
// =====================================================================

export const EMBEDDING_DIM = 768;

function hashWord(word: string): number {
  let h = 2166136261;
  for (let i = 0; i < word.length; i++) {
    h ^= word.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Ubah teks menjadi vektor 768-dim yang dinormalisasi L2. */
export function embed(text: string, dim = EMBEDDING_DIM): number[] {
  const vec = new Array<number>(dim).fill(0);
  const words = text.toLowerCase().split(/[^a-z0-9\u00c0-\u024f]+/u).filter(Boolean);
  for (const w of words) {
    // Setiap kata mengaktifkan 3 posisi (unigram + 2 variasi) agar mirip
    // kata tetap berdekatan di ruang vektor.
    for (const salt of ["", "#2", "#3"]) {
      const idx = hashWord(w + salt) % dim;
      vec[idx] += 1;
    }
  }
  const norm = Math.sqrt(vec.reduce((s, v) => s + v * v, 0)) || 1;
  return vec.map((v) => v / norm);
}

/** Cosine similarity untuk dua vektor ternormalisasi. */
export function cosine(a: number[], b: number[]): number {
  const n = Math.min(a.length, b.length);
  let s = 0;
  for (let i = 0; i < n; i++) s += a[i] * b[i];
  return s;
}

/** Potong teks menjadi chunk ~500 karakter dengan overlap 50. */
export function chunkText(content: string, size = 500, overlap = 50): string[] {
  const clean = content.replace(/\s+/g, " ").trim();
  if (!clean) return [];
  const chunks: string[] = [];
  let start = 0;
  while (start < clean.length) {
    chunks.push(clean.slice(start, start + size));
    if (start + size >= clean.length) break;
    start += size - overlap;
  }
  return chunks;
}
