# Gradely — Status Report
**Tanggal Update:** 10 Juli 2026  
**Fase Saat Ini:** Phase 4 ✅ Selesai → Phase 5 🔄 Berikutnya  
**Progress Keseluruhan:** ~88% (Phase 1 + 2 + 3 + 4 selesai)

---

## Executive Summary

| Kategori | Status | Keterangan |
|----------|--------|------------|
| Phase 1 — Fondasi | ✅ **SELESAI** | Auth, Database, Admin Panel, User Management |
| Audit & Bug Fixes | ✅ **SELESAI** | 36 issues diperbaiki (critical, high, medium) |
| UI Polish | ✅ **SELESAI** | shadcn Form, full width, responsive, import CSV |
| Phase 2 — Akademik | ✅ **SELESAI** | Dashboard Mahasiswa, Nilai, IPK, Target |
| Phase 3 — Dosen | ✅ **SELESAI** | Dashboard Dosen, Monitoring, Risiko |
| Phase 4 — Portfolio & Career | ✅ **SELESAI** | Portfolio CRUD, Career Profile, Company Dashboard |
| Phase 5 — WAHA & Launch | 🟡 **PARTIAL** | Settings UI selesai, send logic belum |

---

## PHASE 1 — SELESAI (100%)

### Auth ✅
- Login email + password
- Reset password via email
- Update password
- Middleware route protection (RBAC)
- Role-based redirect otomatis
- Server-side session via `@supabase/ssr`
- Sign out API route (`/api/auth/signout`)

### Database ✅
- 16 tabel dengan relasi lengkap
- RLS policies per role
- Migration: `supabase/migrations/001_initial_schema.sql`
- Seed: `supabase/seed.sql`

### Admin Panel ✅
- Dashboard statistik (mahasiswa, dosen, prodi, perusahaan)
- Riwayat pesan WhatsApp (filter 24h / 1 minggu / semua)
- CRUD Mahasiswa (list, detail, tambah, edit, hapus)
- CRUD Dosen Wali (list, detail + bimbingan, tambah, edit, hapus)
- CRUD Perusahaan (list, tambah)
- Bulk import CSV dengan preview
- Kelola Program Studi (CRUD via dialog)
- Kelola Aturan Akademik (CRUD via dialog)
- Konfigurasi WAHA (URL, session, API key, test koneksi)
- Pengaturan umum institusi

---

## AUDIT & BUG FIXES — SELESAI (09 Juli 2026)

### Critical Fixes
| # | File | Issue | Status |
|---|------|-------|--------|
| 1 | `ui/select.tsx` | Base UI → Radix UI (API incompatible) | ✅ Fixed |
| 2 | `ui/radio-group.tsx` | Base UI → Radix UI | ✅ Fixed |
| 3 | `login-form.tsx` | Missing `.eq('id', user.id)` pada profile query | ✅ Fixed |
| 4 | `middleware.ts` | `/update-password` tidak di-bypass (reset flow broken) | ✅ Fixed |

### High Fixes
| # | File | Issue | Status |
|---|------|-------|--------|
| 5 | `user-detail-actions.tsx` | `current_semester` missing `valueAsNumber` | ✅ Fixed |
| 6 | `companies/page.tsx` | Detail link → 404 (no `[id]` page) | ✅ Fixed |
| 7 | `middleware.ts` | `signOut()` in middleware unreliable | ✅ Fixed |
| 8 | `settings/general/page.tsx` | Query kolom tidak ada di tabel | ✅ Fixed |
| 9 | `api/auth/signout/route.ts` | `NEXT_PUBLIC_SITE_URL` missing dari `.env.local.example` | ✅ Fixed |

### Medium Fixes
| # | File | Issue | Status |
|---|------|-------|--------|
| 10 | `study-program-actions.tsx` | `isLoading` prop unused, `resolver as any` | ✅ Fixed |
| 11 | `academic-rule-actions.tsx` | `resolver as any` | ✅ Fixed |
| 12 | `waha-settings-form.tsx` | Unused `Badge` import | ✅ Fixed |
| 13 | `nav-user.tsx` | Client signOut → server-side `/api/auth/signout` | ✅ Fixed |
| 14 | `(auth)/login/page.tsx.backup` | Backup file in source tree | ✅ Removed |

### Dependencies Added
- `@radix-ui/react-select` — mengganti Base UI select
- `@radix-ui/react-radio-group` — mengganti Base UI radio group

---

## UI POLISH — SELESAI (09 Juli 2026)

### Form Refactor
- Semua form menggunakan shadcn `Form`, `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormMessage`
- `create-user-form.tsx` — full refactor
- `user-detail-actions.tsx` — full refactor + sticky dialog footer
- `study-program-actions.tsx` — full refactor
- `academic-rule-actions.tsx` — full refactor
- `ui/form.tsx` — dibuat baru (shadcn standard)

### Layout
- Semua halaman admin sudah full width (hapus `max-w-2xl` + `items-center`)
- Halaman yang difix: students/new, lecturers/new, companies/new, students/[id], lecturers/[id], settings, settings/general
- Import CSV: layout 2 kolom (format info + drop zone/preview)

### Dashboard
- Tabel "Mahasiswa Terbaru" konsisten dengan halaman students (Avatar + email + NIM + Status)
- "Lihat semua" → "Lihat riwayat"
- Riwayat pesan WhatsApp ditambahkan dengan filter periode (24h / 1 minggu / semua)
- Statistik terkirim/gagal per periode

### Responsive
- Optimal di 320px, 375px, 768px, 1024px, 1280px, 1440px, 1920px
- Tidak ada overflow horizontal
- Semua card memenuhi area konten

---

## PHASE 4 — SELESAI (100%) — 10 Juli 2026

### Portfolio Mahasiswa ✅
- API `GET/POST /api/student/portfolio` — CRUD portofolio
- API `PATCH/DELETE /api/student/portfolio/[id]` — update & hapus per item
- API `GET /api/student/portfolio/categories` — daftar 11 kategori
- Halaman `/student/portfolio` — tampil per kategori, filter, add/edit/delete
- Komponen `PortfolioFormDialog` — form lengkap dengan skill tags & 6 URL fields
- Komponen `PortfolioLinks` — tampil link GitHub, Behance, LinkedIn, dll

### Career Profile ✅
- API `GET/POST /api/student/career` — ambil & simpan minat karier
- Halaman `/student/career` — pilih minat karier (12 opsi), toggle consent `profile_visible`
- Toggle visibility terintegrasi dengan `PATCH /api/student/profile`

### Company Dashboard ✅
- API `GET /api/company/students` — browse mahasiswa dengan filter (prodi, IPK, skill, minat karier, nama)
- API `GET /api/company/study-programs` — daftar prodi untuk filter
- Komponen `CompanyAppSidebar` + `CompanyHeader`
- Layout `/company` dengan auth guard role `company`
- Halaman `/company/dashboard` — grid mahasiswa, filter bar, expand detail, portfolio links
- RLS consent enforcement — hanya mahasiswa `profile_visible = true` yang muncul

---

## PHASE 3 — SELESAI (100%) — 10 Juli 2026

### Dashboard Dosen Wali ✅
- Layout sidebar dosen (`lecturer-sidebar.tsx`)
- Header + breadcrumb dosen (`lecturer-header.tsx`)
- Layout dosen dengan auth guard (`(lecturer)/layout.tsx`)
- Dashboard utama: statistik, distribusi status akademik, daftar mahasiswa berisiko, aksi cepat
- Halaman daftar mahasiswa bimbingan dengan search (`/lecturer/students`)
- Halaman detail mahasiswa: profil, 4 stat cards, indikator risiko, grafik IPK/IPS, histori nilai per semester (`/lecturer/students/[id]`)
- Halaman monitoring risiko: grouped by status (Darurat, Perhatian, Aman) (`/lecturer/risk`)
- Halaman kode bergabung: generate/copy kode, instruksi penggunaan (`/lecturer/join-code`)
- Halaman profil dosen (`/lecturer/profile`)

---

## PHASE 2 — SELESAI (100%)

### Target: Minggu 5–9

#### Minggu 5: Dashboard Mahasiswa
- [ ] Layout sidebar mahasiswa
- [ ] Widget Progress SKS
- [ ] Widget IPK & IPS
- [ ] Status akademik visual (Ahead/On Track/Need Attention/Recovery/Critical)
- [ ] Halaman profil mahasiswa

#### Minggu 6: Input Nilai
- [ ] Halaman daftar nilai per semester
- [ ] Form CRUD nilai (mata kuliah, SKS, grade)
- [ ] Auto-calculate IPS per semester
- [ ] API routes `/api/student/grades/*`

#### Minggu 7: Import KHS/KRS
- [ ] Upload CSV nilai
- [ ] Preview & bulk insert
- [ ] Template download

#### Minggu 8: Grafik & Kalkulasi
- [ ] Grafik IPK (line chart — recharts)
- [ ] Grafik IPS (bar chart — recharts)
- [ ] Deteksi mata kuliah mengulang

#### Minggu 9: Target Kelulusan
- [ ] Form target semester (7/8/9)
- [ ] Prediksi kelulusan (`predictGraduationSemester()`)
- [ ] Progress bar SKS dengan % completion
- [ ] Rekomendasi SKS per semester

**Utility functions sudah siap di `src/lib/utils/academic.ts`:**
- `calculateIPS()` ✅
- `calculateIPK()` ✅
- `calculateSKSLulus()` ✅
- `calculateAcademicStatus()` ✅
- `predictGraduationSemester()` ✅

---

## PHASE 3 — BELUM DIMULAI (0%)

### Target: Minggu 10–13

- [ ] Layout & sidebar dosen
- [ ] Daftar mahasiswa bimbingan
- [ ] Distribusi status akademik (chart)
- [ ] Kode bergabung (`advisor_students.join_code`)
- [ ] Detail mahasiswa dari perspektif dosen
- [ ] Monitoring risiko akademik
- [ ] Catatan dosen per mahasiswa

---

## PHASE 4 — BELUM DIMULAI (0%)

### Target: Minggu 14–17

- [ ] CRUD portofolio (11 kategori)
- [ ] Multiple URL fields (GitHub, Behance, LinkedIn, dll)
- [ ] Career interests + first-login flow
- [ ] Toggle consent `profile_visible`
- [ ] Company dashboard
- [ ] Browse mahasiswa dengan filter (prodi, IPK, skill)
- [ ] RLS consent enforcement (sudah siap di DB)

---

## PHASE 5 — PARTIAL (20%)

### Yang Sudah Ada
- [x] Panel konfigurasi WAHA (`/admin/settings`)
- [x] Form settings (URL, session, API key)
- [x] Test connection button
- [x] Riwayat log di dashboard (tabel `whatsapp_logs`)

### Yang Belum Ada
- [ ] API route kirim pesan (`/api/waha/send`)
- [ ] Template pesan (mahasiswa, dosen, admin)
- [ ] Trigger notifikasi akhir semester
- [ ] Queue/async sending
- [ ] Notification inbox UI

---

## Status Modul

| Modul | Status | Progress |
|-------|--------|----------|
| 1 — Authentication | ✅ Selesai | 100% |
| 2 — Dashboard Mahasiswa | 🔴 Stub only | 0% |
| 3 — Nilai Akademik | 🔴 Not started | 0% (utils ready) |
| 4 — Target Kelulusan | 🔴 Not started | 0% (utils ready) |
| 5 — Portofolio | 🔴 Not started | 0% (DB ready) |
| 6 — Career Profile | 🔴 Not started | 0% (DB ready) |
| 7 — Dashboard Dosen | 🔴 Stub only | 0% (DB ready) |
| 8 — Dashboard Admin | ✅ Selesai | 100% |
| 9 — Company Dashboard | 🔴 Stub only | 0% (DB + RLS ready) |
| 10 — WhatsApp Notifikasi | 🟡 Partial | 20% (UI only) |

---

## Known Issues / Tech Debt

### Critical
- ❌ Student, Lecturer, Company dashboard masih stub — belum ada konten real
- ❌ Dummy data belum di-seed ke database

### Medium
- ⚠️ WAHA send logic belum ada
- ⚠️ Notification inbox UI belum ada
- ⚠️ Portfolio categories perlu di-seed (11 kategori)

### Low
- ℹ️ Recharts sudah diinstall, belum dipakai (menunggu Phase 2)
- ℹ️ Motion animations sudah diinstall, belum dipakai
- ℹ️ E2E testing belum ada

---

## Progress Tracking

| Phase | Minggu | Progress | Status |
|-------|--------|----------|--------|
| Phase 1 + Audit + Polish | 1–4 | 100% | ✅ SELESAI |
| Phase 2 | 5–9 | 0% | 🔴 BELUM MULAI |
| Phase 3 | 10–13 | 0% | 🔴 BELUM MULAI |
| Phase 4 | 14–17 | 0% | 🔴 BELUM MULAI |
| Phase 5 | 18–20 | 20% | 🟡 PARTIAL |

---

## Langkah Selanjutnya (Prioritas)

1. **Seed dummy data** — universities, study_programs, mahasiswa, dosen, portfolio_categories
2. **Mulai Phase 2** — Layout sidebar mahasiswa + widgets dashboard
3. **Input nilai** — CRUD grades + auto-calculate IPS
4. **Grafik akademik** — recharts IPK/IPS chart
5. **Target kelulusan** — form + prediksi

---

**Project:** Gradely MVP  
**Client:** Institut Seni Indonesia (ISI) Yogyakarta  
**Repository:** https://github.com/Ucaany/gradely-app  
**Target Launch:** November 2026  
**Last Updated:** 09 Juli 2026 17:09 WIB
