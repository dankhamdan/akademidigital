'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  Check,
  Globe,
  Zap,
  Shield,
  Send,
  Menu,
  X,
  FileSpreadsheet,
  Calculator,
  BookOpen,
  Star,
  Heart,
  Users,
  BarChart3,
  Download,
  ExternalLink,
  Code2,
  ClipboardList,
  Receipt,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from '@/components/ui/sheet'
import { Toaster, toast } from 'sonner'

// ─── Animations ──────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.5, ease: 'easeOut' },
  }),
}

// ─── Product Data ──────────────────────────────────────────────
const products = [
  {
    id: 'zakat',
    name: 'Aplikasi Zakat',
    tagline: 'Sistem pengelolaan zakat digital untuk masjid & lembaga',
    icon: Calculator,
    color: 'emerald',
    gradient: 'from-emerald-500 to-teal-500',
    lightBg: 'bg-emerald-50',
    lightBorder: 'border-emerald-100',
    textColor: 'text-emerald-600',
    badgeBg: 'bg-emerald-100',
    price: '249K',
    features: [
      'Kalkulasi zakat fitrah & mal otomatis',
      'Input data mustahik (penerima zakat)',
      'Pencatatan penerimaan & penyaluran',
      'Laporan real-time di Google Sheets',
      'Cetak bukti pembayaran zakat',
      'Dashboard statistik per bulan/tahun',
      'Multi-admin (takmir masjid)',
      'QR Code untuk pembayaran digital',
    ],
    preview: [
      { label: 'Dashboard', icon: BarChart3 },
      { label: 'Kalkulator', icon: Calculator },
      { label: 'Data Mustahik', icon: Users },
      { label: 'Laporan', icon: Receipt },
    ],
    desc: 'Kelola zakat masjid atau lembaga Anda secara digital. Semua data tersimpan rapi di Google Sheets — bisa diakses kapan saja, di mana saja. Cocok untuk masjid, musholla, LAZ, dan lembaga zakat.',
    stack: ['Next.js', 'Tailwind CSS', 'Google Apps Script', 'Google Sheets', 'Vercel'],
  },
  {
    id: 'taunan',
    name: 'Aplikasi Taunan Sekolah',
    tagline: 'Laporan tahunan digital & buku tahunan sekolah otomatis',
    icon: BookOpen,
    color: 'blue',
    gradient: 'from-blue-500 to-indigo-500',
    lightBg: 'bg-blue-50',
    lightBorder: 'border-blue-100',
    textColor: 'text-blue-600',
    badgeBg: 'bg-blue-100',
    price: '299K',
    features: [
      'Input data siswa, guru, & staf',
      'Generate laporan tahunan otomatis',
      'Statistik akademik & non-akademik',
      'Galeri foto kegiatan sekolah',
      'Template buku tahunan (yearbook)',
      'Cetak PDF laporan tahunan',
      'Dashboard kepala sekolah',
      'Multi-user (guru & admin)',
    ],
    preview: [
      { label: 'Dashboard', icon: BarChart3 },
      { label: 'Data Siswa', icon: Users },
      { label: 'Laporan', icon: ClipboardList },
      { label: 'Yearbook', icon: BookOpen },
    ],
    desc: 'Buat laporan tahunan sekolah dan buku tahunan digital secara otomatis. Data siswa, prestasi, dan kegiatan tercatat di Google Sheets. Cetak PDF atau bagikan link digital ke orang tua.',
    stack: ['Next.js', 'Tailwind CSS', 'Google Apps Script', 'Google Sheets', 'Vercel'],
  },
  {
    id: 'sikurban',
    name: 'Aplikasi Sikurban',
    tagline: 'Sistem kurban digital — pendaftaran, pembayaran & distribusi',
    icon: Heart,
    color: 'amber',
    gradient: 'from-amber-500 to-orange-500',
    lightBg: 'bg-amber-50',
    lightBorder: 'border-amber-100',
    textColor: 'text-amber-600',
    badgeBg: 'bg-amber-100',
    price: '199K',
    features: [
      'Form pendaftaran kurban online',
      'Pencatatan jenis hewan kurban',
      'Tracking pembayaran iuran kurban',
      'Distribusi daging otomatis',
      'Cetak kartu penerima kurban',
      'Laporan real-time panitia',
      'QR Code validasi penerima',
      'WhatsApp notification otomatis',
    ],
    preview: [
      { label: 'Dashboard', icon: BarChart3 },
      { label: 'Pendaftaran', icon: ClipboardList },
      { label: 'Pembayaran', icon: Receipt },
      { label: 'Distribusi', icon: Users },
    ],
    desc: 'Panitia kurban masjid atau lembaga bisa mengelola pendaftaran, pembayaran iuran, dan distribusi daging kurban secara digital. Semua data tersinkron ke Google Sheets secara real-time.',
    stack: ['Next.js', 'Tailwind CSS', 'Google Apps Script', 'Google Sheets', 'Vercel'],
  },
]

const faqList = [
  { q: 'Saya tidak bisa coding, apakah bisa pakai aplikasi ini?', a: 'Bisa! Setiap pembelian sudah termasuk panduan deploy step-by-step dengan screenshot. Tinggal ikuti langkahnya. Kalau stuck, kami bantu via WhatsApp.' },
  { q: 'Data tersimpan di mana?', a: 'Semua data tersimpan di Google Sheets milik Anda. Anda bisa akses, edit, dan export kapan saja seperti biasa. Tidak ada server database yang perlu dipelihara.' },
  { q: 'Hosting benar-benar gratis?', a: 'Ya! Aplikasi di-deploy di Vercel secara gratis. Domain .vercel.app gratis selamanya. Kalau mau domain custom, bisa beli domain sendiri (mulai 100K/tahun) dan kami bantu setup.' },
  { q: 'Bisa dipakai berapa lama?', a: 'Selamanya! Setelah deploy, aplikasi bisa dipakai tanpa batas waktu. Hosting Vercel gratis tidak punya batas waktu.' },
  { q: 'Bisa request fitur tambahan?', a: 'Bisa! Karena Anda mendapat source code, Anda bisa modif sendiri. Atau kalau mau kami yang tambahkan fitur, ada layanan custom dengan biaya terpisah.' },
  { q: 'Support sampai kapan?', a: 'Kami berikan support via WhatsApp selama 6 bulan untuk pertanyaan seputar deploy dan penggunaan aplikasi.' },
]

// ─── Component ────────────────────────────────────────────────
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const handleContact = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    const form = e.currentTarget
    const data = new FormData(form)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nama: data.get('nama'),
          email: data.get('email'),
          deskripsi: data.get('deskripsi'),
        }),
      })
      if (res.ok) {
        toast.success('Terima kasih! Kami akan menghubungi Anda segera.')
        form.reset()
      } else {
        toast.error('Gagal mengirim. Silakan coba lagi.')
      }
    } catch {
      toast.error('Terjadi kesalahan jaringan.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      {/* ─── Navbar ─────────────────────────────────── */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-200/60 bg-white/90 backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 text-white font-bold text-sm">AD</div>
            <span className="text-lg font-bold tracking-tight">AkademiDigital</span>
          </div>
          <nav className="hidden items-center gap-1 md:flex">
            <a href="#produk" className="rounded-md px-3 py-2 text-sm text-gray-600 transition hover:bg-gray-100 hover:text-gray-900">Produk</a>
            <a href="#harga" className="rounded-md px-3 py-2 text-sm text-gray-600 transition hover:bg-gray-100 hover:text-gray-900">Harga</a>
            <a href="#faq" className="rounded-md px-3 py-2 text-sm text-gray-600 transition hover:bg-gray-100 hover:text-gray-900">FAQ</a>
          </nav>
          <div className="flex items-center gap-3">
            <a href="#kontak" className="hidden md:block">
              <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-full px-5 shadow-sm">
                Hubungi Kami
              </Button>
            </a>
            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon"><Menu className="h-5 w-5" /></Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <SheetTitle className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 text-white font-bold text-sm">AD</div>
                  AkademiDigital
                </SheetTitle>
                <nav className="mt-8 flex flex-col gap-1">
                  {['#produk', '#harga', '#faq'].map((l) => (
                    <a key={l} href={l} onClick={() => setMenuOpen(false)} className="rounded-md px-3 py-2.5 text-gray-700 transition hover:bg-gray-100">
                      {l.replace('#', '').charAt(0).toUpperCase() + l.replace('#', '').slice(1)}
                    </a>
                  ))}
                  <a href="#kontak" onClick={() => setMenuOpen(false)} className="mt-3">
                    <Button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-full">Hubungi Kami</Button>
                  </a>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* ─── Hero ───────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-gray-100">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-emerald-50/40" />
        <div className="relative mx-auto max-w-6xl px-5 py-16 md:py-24 text-center">
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.08 } } }}>
            <motion.div variants={fadeUp} custom={0}>
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                <FileSpreadsheet className="h-3 w-3" /> Google Sheets Backend
              </span>
            </motion.div>
            <motion.h1 variants={fadeUp} custom={1} className="mt-5 text-3xl font-extrabold leading-[1.15] tracking-tight md:text-5xl">
              Aplikasi Web Siap Pakai
              <br />
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 bg-clip-text text-transparent">
                + Google Sheets Backend
              </span>
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="mx-auto mt-5 max-w-2xl text-base text-gray-500 md:text-lg">
              Aplikasi web profesional yang data-nya langsung tersimpan di Google Sheets. 
              Source code lengkap + panduan deploy. Tinggal pasang, langsung pakai.
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="mt-8 flex flex-wrap justify-center gap-3">
              <a href="#produk">
                <Button size="lg" className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-full gap-2 px-6 shadow-lg shadow-emerald-200/50">
                  Lihat Produk <ArrowRight className="h-4 w-4" />
                </Button>
              </a>
              <a href="#harga">
                <Button size="lg" variant="outline" className="rounded-full px-6 border-gray-200">Lihat Harga</Button>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── Products ───────────────────────────────── */}
      <section id="produk" className="py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-emerald-600 uppercase tracking-wide">Produk Kami</p>
            <h2 className="mt-2 text-2xl font-bold md:text-3xl">3 Aplikasi Siap Pakai</h2>
            <p className="mt-2 text-gray-500">Pilih yang sesuai kebutuhan Anda — atau beli semua dengan harga spesial</p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
            className="grid gap-6 lg:grid-cols-3"
          >
            {products.map((product, idx) => (
              <motion.div key={product.id} variants={fadeUp} custom={idx}>
                <Card className={`group relative flex flex-col rounded-2xl border-2 hover:shadow-xl transition-all duration-300 h-full cursor-pointer ${product.lightBorder}`}
                  onClick={() => setSelectedProduct(product)}
                >
                  {/* Color top bar */}
                  <div className={`h-1.5 rounded-t-2xl bg-gradient-to-r ${product.gradient}`} />
                  
                  <CardHeader className="pb-3 pt-5">
                    <div className="flex items-start justify-between">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${product.badgeBg} ${product.textColor}`}>
                        <product.icon className="h-6 w-6" />
                      </div>
                      <span className="text-2xl font-extrabold text-gray-900">Rp {product.price}</span>
                    </div>
                    <CardTitle className="mt-3 text-xl font-bold">{product.name}</CardTitle>
                    <p className="mt-1 text-sm text-gray-400">{product.tagline}</p>
                  </CardHeader>

                  <CardContent className="flex-1">
                    {/* Preview grid */}
                    <div className={`grid grid-cols-2 gap-2 mb-5`}>
                      {product.preview.map((p) => (
                        <div key={p.label} className={`flex flex-col items-center justify-center gap-1.5 rounded-lg ${product.lightBg} border ${product.lightBorder} p-3`}>
                          <p.icon className={`h-5 w-5 ${product.textColor}`} />
                          <span className="text-[10px] font-medium text-gray-500">{p.label}</span>
                        </div>
                      ))}
                    </div>

                    {/* Top features */}
                    <ul className="space-y-2">
                      {product.features.slice(0, 4).map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                          <Check className={`mt-0.5 h-4 w-4 shrink-0 ${product.textColor}`} />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-3 text-xs text-gray-400">+{product.features.length - 4} fitur lainnya</p>
                  </CardContent>

                  <div className="px-6 pb-5">
                    <Button className={`w-full rounded-full py-5 font-semibold bg-gradient-to-r ${product.gradient} text-white shadow-sm group-hover:shadow-md transition-shadow gap-2`}>
                      Lihat Detail <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Product Detail Modal ──────────────────────── */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/50 backdrop-blur-sm p-4 pt-10 pb-20"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close */}
              <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700 transition">
                <X className="h-4 w-4" />
              </button>

              {/* Header */}
              <div className={`rounded-t-2xl bg-gradient-to-r ${selectedProduct.gradient} p-8 text-white`}>
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/20 backdrop-blur">
                    <selectedProduct.icon className="h-7 w-7" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{selectedProduct.name}</h3>
                    <p className="mt-0.5 text-sm text-white/80">{selectedProduct.tagline}</p>
                  </div>
                </div>
                <div className="mt-6 flex items-end gap-1">
                  <span className="text-sm text-white/70">Mulai dari</span>
                  <span className="text-4xl font-extrabold">Rp {selectedProduct.price}</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-8 space-y-8">
                <p className="text-gray-600 leading-relaxed">{selectedProduct.desc}</p>

                {/* All Features */}
                <div>
                  <h4 className="font-semibold text-lg mb-4">Fitur Lengkap</h4>
                  <div className="grid gap-2.5 sm:grid-cols-2">
                    {selectedProduct.features.map((f) => (
                      <div key={f} className="flex items-start gap-2.5 text-sm">
                        <div className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${selectedProduct.badgeBg}`}>
                          <Check className={`h-3 w-3 ${selectedProduct.textColor}`} />
                        </div>
                        <span className="text-gray-600">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack */}
                <div>
                  <h4 className="font-semibold text-lg mb-3">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.stack.map((s) => (
                      <span key={s} className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-600">{s}</span>
                    ))}
                  </div>
                </div>

                {/* Preview mockup */}
                <div>
                  <h4 className="font-semibold text-lg mb-3">Preview Aplikasi</h4>
                  <div className={`rounded-xl border-2 ${selectedProduct.lightBorder} bg-gradient-to-br ${selectedProduct.lightBg} p-6`}>
                    <div className="grid grid-cols-4 gap-3">
                      {selectedProduct.preview.map((p) => (
                        <div key={p.label} className="flex flex-col items-center gap-2">
                          <div className={`flex h-14 w-14 items-center justify-center rounded-xl bg-white border ${selectedProduct.lightBorder} shadow-sm`}>
                            <p.icon className={`h-6 w-6 ${selectedProduct.textColor}`} />
                          </div>
                          <span className="text-[10px] font-medium text-gray-500 text-center">{p.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="flex gap-3 pt-2">
                  <a href="#kontak" onClick={() => setSelectedProduct(null)} className="flex-1">
                    <Button className={`w-full rounded-full py-5 text-base font-semibold bg-gradient-to-r ${selectedProduct.gradient} text-white shadow-lg gap-2`}>
                      Pesan Sekarang <ArrowRight className="h-4 w-4" />
                    </Button>
                  </a>
                  <a href="#harga" onClick={() => setSelectedProduct(null)}>
                    <Button variant="outline" className="rounded-full px-6 border-gray-200">
                      Lihat Harga
                    </Button>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Kenapa Kami ─────────────────────────────── */}
      <section className="py-14 bg-gray-50 border-y border-gray-100">
        <div className="mx-auto max-w-5xl px-5">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Code2, title: 'Source Code Lengkap', desc: 'Anda dapat full source code, bebas dimodifikasi' },
              { icon: BookOpen, title: 'Panduan Deploy', desc: 'Step-by-step dengan screenshot, mudah diikuti' },
              { icon: Shield, title: 'Hosting Gratis', desc: 'Deploy di Vercel gratis selamanya' },
              { icon: Star, title: 'Support 6 Bulan', desc: 'Bantuan via WhatsApp jika ada kendala' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="text-center"
              >
                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-3 font-semibold text-sm">{item.title}</h3>
                <p className="mt-1 text-xs text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Harga ──────────────────────────────────── */}
      <section id="harga" className="py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-5">
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-emerald-600 uppercase tracking-wide">Daftar Harga</p>
            <h2 className="mt-2 text-2xl font-bold md:text-3xl">Harga Transparan, Bayar Sekali</h2>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="grid gap-5 md:grid-cols-3"
          >
            {products.map((product, idx) => (
              <motion.div key={product.id} variants={fadeUp} custom={idx}>
                <Card className={`rounded-2xl h-full border-2 hover:shadow-lg transition-shadow ${product.lightBorder}`}>
                  <div className={`h-1.5 rounded-t-2xl bg-gradient-to-r ${product.gradient}`} />
                  <CardContent className="pt-6 pb-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${product.badgeBg} ${product.textColor}`}>
                        <product.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{product.name}</h3>
                        <p className="text-xs text-gray-400">{product.tagline}</p>
                      </div>
                    </div>

                    <div className="mb-5 flex items-baseline gap-1">
                      <span className="text-sm text-gray-400">Rp</span>
                      <span className="text-3xl font-extrabold">{product.price}</span>
                      <span className="text-sm text-gray-400">/lisensi</span>
                    </div>

                    <ul className="space-y-2 mb-6">
                      {[
                        'Source code lengkap',
                        'Panduan deploy PDF',
                        'Support WhatsApp 6 bulan',
                        'Update gratis 6 bulan',
                        '1 domain / lisensi',
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                          {item}
                        </li>
                      ))}
                    </ul>

                    <a href="#kontak">
                      <Button className={`w-full rounded-full py-5 font-semibold bg-gradient-to-r ${product.gradient} text-white shadow-sm gap-2`}>
                        Pesan <ArrowRight className="h-4 w-4" />
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Bundle */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}>
            <Card className="mt-6 rounded-2xl border-2 border-emerald-500 bg-gradient-to-r from-emerald-50 to-teal-50 overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-emerald-600 px-3 py-0.5 text-xs font-semibold text-white">Bundle Hemat</span>
                    <span className="text-sm text-gray-400">Beli semua 3 aplikasi</span>
                  </div>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-sm text-gray-400 line-through">Rp 747K</span>
                    <span className="text-3xl font-extrabold text-emerald-700">Rp 499K</span>
                    <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-bold text-red-600">Hemat 33%</span>
                  </div>
                </div>
                <a href="#kontak">
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-8 py-5 font-semibold shadow-lg shadow-emerald-200/50 gap-2 whitespace-nowrap">
                    Pesan Bundle <ArrowRight className="h-4 w-4" />
                  </Button>
                </a>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* ─── FAQ ────────────────────────────────────── */}
      <section id="faq" className="py-16 md:py-20 bg-gray-50 border-y border-gray-100">
        <div className="mx-auto max-w-2xl px-5">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold md:text-3xl">Pertanyaan Umum</h2>
          </div>
          <Accordion type="single" collapsible className="space-y-3">
            {faqList.map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="rounded-xl border border-gray-200 px-4 bg-white">
                <AccordionTrigger className="text-sm font-medium py-4 hover:no-underline">{item.q}</AccordionTrigger>
                <AccordionContent className="text-sm text-gray-500 leading-relaxed pb-4">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ─── Kontak ─────────────────────────────────── */}
      <section id="kontak" className="py-16 md:py-24">
        <div className="mx-auto max-w-xl px-5 text-center">
          <h2 className="text-2xl font-bold md:text-3xl">Tertarik? Hubungi Kami</h2>
          <p className="mt-3 text-gray-500">Pilih produk yang diinginkan, kami akan kirim source code + panduannya.</p>

          <Card className="mt-8 rounded-2xl border-gray-200 shadow-sm text-left">
            <CardContent className="pt-6 space-y-4">
              <form onSubmit={handleContact}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">Nama</label>
                    <Input name="nama" placeholder="Nama Anda" required className="rounded-lg" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">Email</label>
                    <Input name="email" type="email" placeholder="email@anda.com" required className="rounded-lg" />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">No. WhatsApp</label>
                  <Input name="wa" placeholder="08xxxxxxxxxx" required className="rounded-lg" />
                </div>
                <div className="mt-4">
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Produk yang Diminati</label>
                  <Input name="deskripsi" placeholder="Aplikasi Zakat / Taunan Sekolah / Sikurban / Bundle" required className="rounded-lg" />
                </div>
                <Button type="submit" disabled={submitting} className="mt-4 w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-full py-5 gap-2">
                  {submitting ? 'Mengirim...' : <>Kirim Pesan <Send className="h-4 w-4" /></>}
                </Button>
              </form>
            </CardContent>
          </Card>

          <p className="mt-4 text-sm text-gray-400">
            Atau langsung chat via{' '}
            <a href="https://wa.me/62" className="text-emerald-600 font-medium hover:underline inline-flex items-center gap-1">
              WhatsApp <ExternalLink className="h-3 w-3" />
            </a>
          </p>
        </div>
      </section>

      {/* ─── Footer ─────────────────────────────────── */}
      <footer className="border-t border-gray-100 bg-gray-50/50">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-5 py-8 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <div className="flex items-center justify-center gap-2 md:justify-start">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-emerald-500 to-teal-500 text-white text-xs font-bold">AD</div>
              <span className="text-sm font-semibold">AkademiDigital</span>
            </div>
            <p className="mt-1 text-xs text-gray-400">Aplikasi web siap pakai + Google Sheets backend.</p>
          </div>
          <p className="text-xs text-gray-400">© {new Date().getFullYear()} AkademiDigital. All rights reserved.</p>
        </div>
      </footer>

      <Toaster richColors position="top-center" />
    </div>
  )
}
