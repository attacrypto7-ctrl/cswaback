-- =====================================================================
-- Schema SaaS CS AI (PostgreSQL + pgvector)
-- Cocok dengan data model frontend (frontend/src/mock/data.ts)
-- =====================================================================

-- Enable pgvector extension for RAG (similarity search on embeddings)
CREATE EXTENSION IF NOT EXISTS vector;

-- ---------------------------------------------------------------------
-- TENANT: perusahaan / bisnis yang memakai platform
-- ---------------------------------------------------------------------
CREATE TYPE plan_enum AS ENUM ('Starter', 'Growth', 'Scale');
CREATE TYPE tenant_status_enum AS ENUM ('aktif', 'suspend');

CREATE TABLE tenants (
    id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nama             VARCHAR(255) NOT NULL,
    industri         VARCHAR(255) NOT NULL,
    plan             plan_enum NOT NULL DEFAULT 'Starter',
    email            VARCHAR(255) NOT NULL UNIQUE,
    bergabung        TIMESTAMP NOT NULL DEFAULT NOW(),
    status           tenant_status_enum NOT NULL DEFAULT 'aktif',
    nomor_wa         INTEGER NOT NULL DEFAULT 0,
    chat_bulan_ini   INTEGER NOT NULL DEFAULT 0,
    kuota_chat       INTEGER NOT NULL DEFAULT 3000,
    token_bulan_ini  INTEGER NOT NULL DEFAULT 0,
    lisensi_berakhir TIMESTAMP,
    created_at       TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at       TIMESTAMP NOT NULL DEFAULT NOW()
);

-- ---------------------------------------------------------------------
-- LICENSE: kode lisensi yang dikaitkan ke tenant
-- ---------------------------------------------------------------------
CREATE TYPE license_status_enum AS ENUM ('aktif', 'nonaktif', 'revoked', 'expired');

CREATE TABLE licenses (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    kode        VARCHAR(32) NOT NULL UNIQUE,
    tenant_id   UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    plan        plan_enum NOT NULL,
    status      license_status_enum NOT NULL DEFAULT 'nonaktif',
    dibuat      TIMESTAMP NOT NULL DEFAULT NOW(),
    berakhir    TIMESTAMP NOT NULL,
    kuota_chat  INTEGER NOT NULL,
    created_at  TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMP NOT NULL DEFAULT NOW()
);

-- ---------------------------------------------------------------------
-- WA_NUMBERS: nomor WhatsApp yang terhubung per tenant
-- ---------------------------------------------------------------------
CREATE TYPE wa_status_enum AS ENUM ('tersambung', 'memindai', 'terputus');

CREATE TABLE wa_numbers (
    id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id         UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    label             VARCHAR(255) NOT NULL,
    nomor             VARCHAR(32) NOT NULL,
    status            wa_status_enum NOT NULL DEFAULT 'terputus',
    terakhir_aktif    TIMESTAMP,
    auto_chat         BOOLEAN NOT NULL DEFAULT TRUE,
    auto_iklan        BOOLEAN NOT NULL DEFAULT TRUE,
        session_encrypted TEXT,
    created_at        TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at        TIMESTAMP NOT NULL DEFAULT NOW()
);

-- ---------------------------------------------------------------------
-- KNOWLEDGE_DOCS: dokumen / FAQ manual yang diunggah tenant
-- ---------------------------------------------------------------------
CREATE TYPE doc_tipe_enum AS ENUM ('PDF', 'Teks', 'FAQ Manual');
CREATE TYPE doc_status_enum AS ENUM ('terindeks', 'memproses', 'gagal');

CREATE TABLE knowledge_docs (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id   UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    nama        VARCHAR(255) NOT NULL,
    tipe        doc_tipe_enum NOT NULL DEFAULT 'Teks',
    ukuran      VARCHAR(32),
    potongan    INTEGER NOT NULL DEFAULT 0,
    versi       INTEGER NOT NULL DEFAULT 1,
    diperbarui  TIMESTAMP NOT NULL DEFAULT NOW(),
    status      doc_status_enum NOT NULL DEFAULT 'memproses',
    created_at  TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMP NOT NULL DEFAULT NOW()
);

-- ---------------------------------------------------------------------
-- KNOWLEDGE_CHUNKS: potongan teks + embedding vektor (untuk RAG)
-- ---------------------------------------------------------------------
CREATE TABLE knowledge_chunks (
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    doc_id     UUID NOT NULL REFERENCES knowledge_docs(id) ON DELETE CASCADE,
    tenant_id  UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    content    TEXT NOT NULL,
    embedding  VECTOR(768),
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_knowledge_chunks_embedding ON knowledge_chunks USING hnsw (embedding vector_cosine_ops);
CREATE INDEX idx_knowledge_chunks_tenant_doc ON knowledge_chunks(tenant_id, doc_id);

-- ---------------------------------------------------------------------
-- FAQ_ITEMS: FAQ manual per tenant
-- ---------------------------------------------------------------------
CREATE TABLE faq_items (
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id  UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    pertanyaan TEXT NOT NULL,
    jawaban    TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- ---------------------------------------------------------------------
-- AD_TEMPLATES: template jawaban untuk chat dari iklan
-- ---------------------------------------------------------------------
CREATE TYPE ad_cara_cocok_enum AS ENUM ('sama_persis', 'boleh_mirip');

CREATE TABLE ad_templates (
    id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id         UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    pertanyaan        TEXT NOT NULL,
    jawaban           TEXT,
    mode              VARCHAR(16),
    cara_mencocokkan  ad_cara_cocok_enum NOT NULL DEFAULT 'boleh_mirip',
    aktif             BOOLEAN NOT NULL DEFAULT TRUE,
        dipakai           INTEGER NOT NULL DEFAULT 0,
    created_at        TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at        TIMESTAMP NOT NULL DEFAULT NOW()
);

-- ---------------------------------------------------------------------
-- AD_TEMPLATE_STEPS: langkah-langkah balasan (teks / gambar) per template
-- ---------------------------------------------------------------------
CREATE TYPE step_tipe_enum AS ENUM ('teks', 'gambar');

CREATE TABLE ad_template_steps (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    template_id   UUID NOT NULL REFERENCES ad_templates(id) ON DELETE CASCADE,
    urutan        INTEGER NOT NULL,
    tipe          step_tipe_enum NOT NULL,
    isi_teks      TEXT,
    url_gambar    VARCHAR(512),
    nama_gambar   VARCHAR(255),
        created_at    TIMESTAMP NOT NULL DEFAULT NOW()
);

-- ---------------------------------------------------------------------
-- CHAT_LOGS: riwayat percakapan WhatsApp
-- ---------------------------------------------------------------------
CREATE TYPE chat_kanal_enum AS ENUM ('Chat', 'Iklan');
CREATE TYPE chat_status_enum AS ENUM ('terjawab', 'perlu_manusia', 'diambil_alih');

CREATE TABLE chat_logs (
    id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id        UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    wa_number_id     UUID REFERENCES wa_numbers(id),
    kontak           VARCHAR(255) NOT NULL,
    nomor            VARCHAR(32) NOT NULL,
    kanal            chat_kanal_enum NOT NULL DEFAULT 'Chat',
    pesan_terakhir   TEXT NOT NULL,
    balasan          TEXT,
    waktu            TIMESTAMP NOT NULL DEFAULT NOW(),
    keyakinan        REAL NOT NULL DEFAULT 0,
    status           chat_status_enum NOT NULL DEFAULT 'perlu_manusia',
    created_at       TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at       TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_chat_logs_tenant ON chat_logs(tenant_id);
CREATE INDEX idx_chat_logs_waktu  ON chat_logs(tenant_id, waktu DESC);

-- ---------------------------------------------------------------------
-- USAGE_LOGS: pencatat penggunaan token (untuk rate-limit per tenant)
-- ---------------------------------------------------------------------
CREATE TABLE usage_logs (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id     UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    model         VARCHAR(128) NOT NULL,
    tokens_input  INTEGER NOT NULL,
    tokens_output INTEGER NOT NULL,
    cost_cents    INTEGER NOT NULL DEFAULT 0,
    created_at    TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_usage_logs_tenant ON usage_logs(tenant_id);
CREATE INDEX idx_usage_logs_day    ON usage_logs(tenant_id, created_at);

-- ---------------------------------------------------------------------
-- AUDIT_LOG: catatan aktivitas admin / sistem
-- ---------------------------------------------------------------------
CREATE TABLE audit_log (
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id  UUID REFERENCES tenants(id),
    aktor      VARCHAR(255) NOT NULL,
    aksi       VARCHAR(255) NOT NULL,
    target     VARCHAR(512),
    waktu      TIMESTAMP NOT NULL DEFAULT NOW(),
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_audit_log_tenant ON audit_log(tenant_id);
CREATE INDEX idx_audit_log_waktu  ON audit_log(waktu DESC);

-- ---------------------------------------------------------------------
-- BOT_SETTINGS: konfigurasi bot per tenant
-- ---------------------------------------------------------------------
CREATE TYPE ai_level_enum AS ENUM ('hemat', 'seimbang', 'akurat');
CREATE TYPE bot_language_enum AS ENUM ('id', 'en', 'auto');

CREATE TABLE bot_settings (
    id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id          UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    nama_bot           VARCHAR(255),
    gaya_bahasa        TEXT,
    tingkat_kepintaran ai_level_enum NOT NULL DEFAULT 'hemat',
    bahasa_balasan     bot_language_enum NOT NULL DEFAULT 'id',
    ambang_alih        INTEGER NOT NULL DEFAULT 60,
    auto_sapaan        BOOLEAN NOT NULL DEFAULT TRUE,
    stop_setelah_admin BOOLEAN NOT NULL DEFAULT TRUE,
    simpan_transkrip   BOOLEAN NOT NULL DEFAULT TRUE,
    auto_chat_aktif    BOOLEAN NOT NULL DEFAULT TRUE,
    auto_iklan_aktif   BOOLEAN NOT NULL DEFAULT TRUE,
    ai_engine          VARCHAR(64),
    fallow_unknown     BOOLEAN NOT NULL DEFAULT FALSE,
    created_at         TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at         TIMESTAMP NOT NULL DEFAULT NOW()
);
CREATE UNIQUE INDEX idx_bot_settings_tenant ON bot_settings(tenant_id);

-- ---------------------------------------------------------------------
-- MESSAGE_QUEUE: audit log untuk pesan masuk/keluar
-- (queue utama di Redis/BullMQ; tabel ini untuk fallback dan audit)
-- ---------------------------------------------------------------------
CREATE TABLE message_queue (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    direction     VARCHAR(4) NOT NULL CHECK (direction IN ('in', 'out')),
    tenant_id     UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    wa_number_id  UUID REFERENCES wa_numbers(id),
    nomor         VARCHAR(32) NOT NULL,
    kontak        VARCHAR(255),
    pesan         TEXT NOT NULL,
    status        VARCHAR(20) NOT NULL DEFAULT 'pending',
    created_at    TIMESTAMP NOT NULL DEFAULT NOW()
);

-- ---------------------------------------------------------------------
-- TRIGGERS: otomatis update updated_at
-- (NOTE: trigger admin_users dibuat setelah tabel admin_users di bawah)
-- ---------------------------------------------------------------------
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_tenants_updated
  BEFORE UPDATE ON tenants
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_licenses_updated
  BEFORE UPDATE ON licenses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_wa_numbers_updated
  BEFORE UPDATE ON wa_numbers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_knowledge_docs_updated
  BEFORE UPDATE ON knowledge_docs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_faq_items_updated
  BEFORE UPDATE ON faq_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_ad_templates_updated
  BEFORE UPDATE ON ad_templates
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_chat_logs_updated
  BEFORE UPDATE ON chat_logs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_bot_settings_updated
  BEFORE UPDATE ON bot_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ---------------------------------------------------------------------
-- ADMIN_USERS: akun admin platform
-- ---------------------------------------------------------------------
CREATE TABLE admin_users (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email         VARCHAR(255) NOT NULL UNIQUE,
    password_hash TEXT,
    nama          VARCHAR(255) NOT NULL,
    is_active     BOOLEAN NOT NULL DEFAULT TRUE,
    created_at    TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at    TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TRIGGER trg_admin_users_updated
  BEFORE UPDATE ON admin_users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
