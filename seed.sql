-- Seed awal: jalankan SETELAH schema.sql
-- Ganti 'GANTI_PASSWORD_HASH' dengan hash bcrypt dari password admin.
-- Cara buat hash: npx bcryptjs (atau: node -e "console.log(require('bcryptjs').hashSync('pw',10))")

INSERT INTO admin_users (email, password_hash, nama)
VALUES ('admin@balasin.id', 'GANTI_PASSWORD_HASH', 'Super Admin')
ON CONFLICT (email) DO NOTHING;
