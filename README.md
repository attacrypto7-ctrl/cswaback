# Backend SaaS CS AI (PLAN.md)

3 service terpisah (satu repo monorepo, npm workspaces):

| Service | Folder | Peran |
|---|---|---|
| `api` | `apps/api` (NestJS) | REST untuk dashboard: auth, tenant, lisensi, FAQ, knowledge, bot settings, WA numbers, chat logs, analitik, ad templates |
| `worker` | `apps/worker` (BullMQ) | Balas chat (Groq + RAG), balas iklan (template + fallback Groq), indexing dokumen, cron lisensi |
| `wa-gateway` | `apps/wa-gateway` (Baileys) | Koneksi WA multi-tenant, QR, kirim/terima pesan |

Libs bersama: `libs/database` (Drizzle), `libs/groq-client` (mapping hemat/seimbang/akurat), `libs/shared-types`.

## Jalankan lokal

```bash
npm install
# isi .env (lihat .env.example) — butuh Postgres + Redis lokal
psql $DATABASE_URL -f schema.sql
psql $DATABASE_URL -f seed.sql
npm run dev   # api :3000, worker, wa-gateway :3002 sekaligus
```

## Endpoint utama (prefix `/api`)

- `POST /api/auth/login|register`, `POST /api/auth/activate-license`
- `GET /api/knowledge/docs`, `POST /api/knowledge/docs` (upload), `DELETE /api/knowledge/docs/:id`
- `GET|POST /api/knowledge/faq`, `PUT|DELETE /api/knowledge/faq/:id`
- `GET|PUT /api/bot/settings`, `POST /api/bot/trial` (Uji Coba Bot)
- `GET|POST /api/whatsapp/numbers`, `GET /api/whatsapp/numbers/:id/qr`, `POST .../disconnect`, `PATCH .../auto`
- `GET /api/ad-templates`, `POST|PUT|DELETE` (Auto Bales Iklan + langkah)
- `GET /api/chat/logs`, `GET /api/chat/stats`, `POST /api/chat/logs/:id/takeover|release`
- `GET /api/analytics/overview`, `GET /api/analytics`
- `GET /api/license/me|status`, `POST /api/license/activate`
- Admin: `GET /api/admin/tenants`, `/api/admin/licenses`, `/api/admin/audit`
- Internal (antar-service, header `x-internal-secret`): `POST /api/internal/incoming|reply-result|wa-status|usage|index-done`

## Catatan

- Groq tidak punya embeddings → worker pakai embedding lokal (`apps/worker/src/embedding.ts`, 768-dim). Ganti dengan model `@xenova/transformers` / API eksternal bila perlu kualitas lebih baik — kontraknya `string → number[768]`.
- Satu `GROQ_API_KEY` untuk semua tenant; rate-limit/kuota per tenant dicek di `POST /api/internal/incoming`.
- Sesi Baileys terenkripsi (AES-256-GCM, `ENCRYPTION_KEY`) di volume `/data/wa-sessions`.
