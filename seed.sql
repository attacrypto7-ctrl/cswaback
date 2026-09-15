-- Seed awal: jalankan SETELAH schema.sql
-- Ganti '$2b$10$0PwZ5OiAvSwH70RT9tBiDu182GMrex1no8lXslRffxbjX.tzldWqG' dengan hash bcrypt dari password admin.
-- Cara buat hash: npx bcryptjs (atau: node -e "console.log(require('bcryptjs').hashSync('pw',10))")

INSERT INTO admin_users (email, password_hash, nama)
VALUES ('admin@balasin.id', '$2b$10$0PwZ5OiAvSwH70RT9tBiDu182GMrex1no8lXslRffxbjX.tzldWqG', 'Super Admin')
ON CONFLICT (email) DO NOTHING;
