'use client'

import { useState, useRef, useEffect } from 'react'
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
  Wallet,
  Download,
  ExternalLink,
  Code2,
  Play,
  Clock,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
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
    gradient: 'from-emerald-600 to-teal-600',
    lightBg: 'bg-emerald-50',
    lightBorder: 'border-emerald-200',
    textColor: 'text-emerald-600',
    badgeBg: 'bg-emerald-100',
    price: '249K',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '3:45',
    features: [
      'Kalkulasi zakat fitrah & mal otomatis',
      'Input data mustahik (penerima zakat)',
      'Pencatatan penerimaan & penyaluran',
      'Laporan real-time di Google Sheets',
      'Cetak bukti pembayaran zakat',
      'Notifikasi Otomatis pembayaran zakat via Whatsapp',
      'Dashboard statistik per bulan/tahun',
      'Multi-admin (takmir masjid)',
      'QR Code untuk pembayaran digital',
    ],
    desc: 'Kelola zakat masjid atau lembaga Anda secara digital. Semua data tersimpan rapi di Google Sheets — bisa diakses kapan saja, di mana saja. Cocok untuk masjid, musholla, LAZ, dan lembaga zakat.',
  },
  {
    id: 'tabungan',
    name: 'Aplikasi Tabungan Sekolah',
    tagline: 'Sistem tabungan digital siswa — nabung mudah, transparan',
    icon: Wallet,
    gradient: 'from-violet-600 to-purple-600',
    lightBg: 'bg-violet-50',
    lightBorder: 'border-violet-200',
    textColor: 'text-violet-600',
    badgeBg: 'bg-violet-100',
    price: '299K',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '4:12',
    features: [
      'Setoran & penarikan tabungan siswa',
      'Buku tabungan digital otomatis',
      'Laporan per kelas / per siswa',
      'Notifikasi ke orang tua via WhatsApp',
      'Dashboard bendahara sekolah',
      'Import data siswa dari Google Sheets',
      'Cetak slip tabungan',
      'Multi-admin (bendahara & wali kelas)',
    ],
    desc: 'Manajemen tabungan siswa jadi lebih mudah dan transparan. Orang tua bisa memantau saldo tabungan anak secara real-time. Semua data tersinkron ke Google Sheets.',
  },
  {
    id: 'sikurban',
    name: 'Aplikasi Sikurban',
    tagline: 'Sistem kurban digital — pendaftaran, pembayaran & distribusi',
    icon: Heart,
    gradient: 'from-amber-600 to-orange-600',
    lightBg: 'bg-amber-50',
    lightBorder: 'border-amber-200',
    textColor: 'text-amber-600',
    badgeBg: 'bg-amber-100',
    price: '199K',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '3:20',
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
    desc: 'Panitia kurban masjid atau lembaga bisa mengelola pendaftaran, pembayaran iuran, dan distribusi daging kurban secara digital. Semua data tersinkron ke Google Sheets secara real-time.',
  },
  {
    id: 'kas-masjid',
    name: 'Aplikasi Kas Masjid',
    tagline: 'Kelola keuangan masjid — pemasukan, pengeluaran & laporan',
    icon: BarChart3,
    gradient: 'from-rose-600 to-pink-600',
    lightBg: 'bg-rose-50',
    lightBorder: 'border-rose-200',
    textColor: 'text-rose-600',
    badgeBg: 'bg-rose-100',
    price: '249K',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '3:58',
    features: [
      'Pencatatan pemasukan & pengeluaran',
      'Kategori transaksi otomatis',
      'Laporan bulanan & tahunan',
      'Dashboard grafik keuangan',
      'Multi-admin (takmir & bendahara)',
      'Export laporan ke PDF',
      'Notifikasi saldo rendah',
      'Rekap donasi per jamaah',
    ],
    desc: 'Sistem keuangan masjid yang lengkap dan transparan. Catat setiap pemasukan dan pengeluaran, lalu lihat laporannya dalam bentuk grafik yang mudah dipahami. Semua data di Google Sheets.',
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

// ─── Video Card Component ────────────────────────────────────
function VideoCard({ product, onPlay }: { product: typeof products[0]; onPlay: (p: typeof products[0]) => void }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div variants={fadeUp} custom={products.indexOf(product)}>
      <Card
        className="group relative flex flex-col rounded-2xl border-2 border-gray-100 hover:shadow-xl transition-all duration-300 h-full overflow-hidden"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Video Thumbnail Area */}
        <div className="relative aspect-video w-full overflow-hidden cursor-pointer" onClick={() => onPlay(product)}>
          {/* Gradient background simulating video thumbnail */}
          <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-90`} />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.15),transparent_60%)]" />

          {/* App icon & name overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white">
            <motion.div
              animate={{ scale: hovered ? 1.1 : 1 }}
              transition={{ duration: 0.3 }}
              className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30"
            >
              <product.icon className="h-8 w-8" />
            </motion.div>
            <p className="text-sm font-semibold text-white/90">{product.name}</p>
          </div>

          {/* Play button */}
          <motion.div
            animate={{ scale: hovered ? 1.15 : 1, opacity: hovered ? 1 : 0.85 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm">
              <Play className="h-7 w-7 text-gray-800 ml-1" fill="currentColor" />
            </div>
          </motion.div>

          {/* Duration badge */}
          <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-md bg-black/60 px-2 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
            <Clock className="h-3 w-3" />
            {product.duration}
          </div>

          {/* Top price badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-lg bg-white/90 px-2.5 py-1 backdrop-blur-sm shadow-sm">
            <span className="text-[10px] text-gray-400 line-through">Rp {product.price}</span>
            <span className="text-xs font-bold text-emerald-600">Rp 100K</span>
          </div>
        </div>

        <CardHeader className="pb-2 pt-4 px-5">
          <CardTitle className="text-lg font-bold">{product.name}</CardTitle>
          <p className="text-sm text-gray-400 mt-0.5">{product.tagline}</p>
        </CardHeader>

        <CardContent className="flex-1 px-5 pb-5">
          <ul className="space-y-2 mb-4">
            {product.features.slice(0, 4).map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                <Check className={`mt-0.5 h-4 w-4 shrink-0 ${product.textColor}`} />
                {f}
              </li>
            ))}
          </ul>
          <p className="text-xs text-gray-400 mb-4">+{product.features.length - 4} fitur lainnya</p>

          <Button
            className={`w-full rounded-full py-5 font-semibold bg-gradient-to-r ${product.gradient} text-white shadow-sm group-hover:shadow-md transition-shadow gap-2`}
            onClick={() => onPlay(product)}
          >
            Lihat Demo <Play className="h-4 w-4 ml-1" fill="currentColor" />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// ─── Main Component ──────────────────────────────────────────
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeProduct, setActiveProduct] = useState<typeof products[0] | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const videoRef = useRef<HTMLIFrameElement>(null)

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
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 text-white font-bold text-sm">PD</div>
            <span className="text-lg font-bold tracking-tight">ProdukDigital</span>
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
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 text-white font-bold text-sm">PD</div>
                  ProdukDigital
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
        <div className="relative mx-auto max-w-6xl px-5 py-14 md:py-20 text-center">
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

      {/* ─── Products (Video Showcase) ───────────────── */}
      <section id="produk" className="py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="text-center mb-10">
            <p className="text-sm font-medium text-emerald-600 uppercase tracking-wide">Produk Kami</p>
            <h2 className="mt-2 text-2xl font-bold md:text-3xl">4 Aplikasi Siap Pakai</h2>
            <p className="mt-2 text-gray-500">Tonton demo video, pilih yang sesuai kebutuhan Anda</p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
            className="grid gap-6 md:grid-cols-2"
          >
            {products.map((product) => (
              <VideoCard key={product.id} product={product} onPlay={setActiveProduct} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Video Modal ──────────────────────────────── */}
      <AnimatePresence>
        {activeProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setActiveProduct(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-3xl rounded-2xl overflow-hidden bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setActiveProduct(null)}
                className="absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 transition backdrop-blur-sm"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Video Player */}
              <div className="relative aspect-video w-full bg-gray-900">
                <iframe
                  ref={videoRef}
                  src={`${activeProduct.videoUrl}?autoplay=1&rel=0`}
                  title={activeProduct.name}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Product info below video */}
              <div className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${activeProduct.badgeBg} ${activeProduct.textColor}`}>
                        <activeProduct.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{activeProduct.name}</h3>
                        <p className="text-sm text-gray-400">{activeProduct.tagline}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-400 line-through mr-2">Rp {activeProduct.price}</span>
                    <span className="text-2xl font-extrabold text-emerald-600">Rp 100K</span>
                    <a href="#kontak" onClick={() => setActiveProduct(null)} className="flex-1 sm:flex-none">
                      <Button className={`rounded-full px-6 font-semibold bg-gradient-to-r ${activeProduct.gradient} text-white shadow-sm gap-2`}>
                        Pesan Sekarang <ArrowRight className="h-4 w-4" />
                      </Button>
                    </a>
                  </div>
                </div>

                <p className="mt-4 text-sm text-gray-500 leading-relaxed">{activeProduct.desc}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {activeProduct.features.slice(0, 5).map((f) => (
                    <span key={f} className="inline-flex items-center gap-1 rounded-full bg-gray-50 border border-gray-100 px-2.5 py-1 text-xs text-gray-600">
                      <Check className="h-3 w-3 text-emerald-500" />{f}
                    </span>
                  ))}
                  {activeProduct.features.length > 5 && (
                    <span className="inline-flex items-center rounded-full bg-gray-50 border border-gray-100 px-2.5 py-1 text-xs text-gray-400">
                      +{activeProduct.features.length - 5} fitur
                    </span>
                  )}
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
      <section id="harga" className="py-14 md:py-20">
        <div className="mx-auto max-w-5xl px-5">
          <div className="text-center mb-10">
            <p className="text-sm font-medium text-emerald-600 uppercase tracking-wide">Daftar Harga</p>
            <h2 className="mt-2 text-2xl font-bold md:text-3xl">Harga Transparan, Bayar Sekali Untuk Selamanya</h2>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="grid gap-5 md:grid-cols-2 lg:grid-cols-4"
          >
            {products.map((product, idx) => (
              <motion.div key={product.id} variants={fadeUp} custom={idx}>
                <Card className={`rounded-2xl h-full border-2 hover:shadow-lg transition-shadow ${product.lightBorder}`}>
                  <div className={`h-1.5 rounded-t-2xl bg-gradient-to-r ${product.gradient}`} />
                  <CardContent className="pt-5 pb-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${product.badgeBg} ${product.textColor}`}>
                        <product.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-base">{product.name}</h3>
                      </div>
                    </div>

                    <div className="mb-4 flex flex-col gap-0.5">
                      <span className="text-sm text-gray-400 line-through">Rp {product.price}</span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-sm text-gray-400">Rp</span>
                        <span className="text-3xl font-extrabold text-emerald-600">100K</span>
                        <span className="text-sm text-gray-400">/lisensi</span>
                      </div>
                    </div>

                    <ul className="space-y-2 mb-5">
                      {[
                        'Source code lengkap',
                        'Panduan deploy PDF',
                        'Support WA 6 bulan',
                        'Update gratis 6 bulan',
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                          {item}
                        </li>
                      ))}
                    </ul>

                    <a href="#kontak">
                      <Button className={`w-full rounded-full py-5 font-semibold bg-gradient-to-r ${product.gradient} text-white shadow-sm gap-2 text-sm`}>
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
                    <span className="text-sm text-gray-400">Beli semua 4 aplikasi</span>
                  </div>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-sm text-gray-400 line-through">Rp 400K</span>
                    <span className="text-3xl font-extrabold text-emerald-700">Rp 299K</span>
                    <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-bold text-red-600">Hemat 25%</span>
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
      <section id="faq" className="py-14 md:py-20 bg-gray-50 border-y border-gray-100">
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
      <section id="kontak" className="py-14 md:py-20">
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
                  <Input name="deskripsi" placeholder="Aplikasi Zakat / Tabungan Sekolah / Sikurban / Kas Masjid / Bundle" required className="rounded-lg" />
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
      <footer className="border-t border-gray-100 bg-gray-50/50 mt-auto">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-5 py-8 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <div className="flex items-center justify-center gap-2 md:justify-start">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-emerald-500 to-teal-500 text-white text-xs font-bold">PD</div>
              <span className="text-sm font-semibold">ProdukDigital</span>
            </div>
            <p className="mt-1 text-xs text-gray-400">Aplikasi web siap pakai + Google Sheets backend.</p>
          </div>
          <p className="text-xs text-gray-400">&copy; {new Date().getFullYear()} ProdukDigital. All rights reserved.</p>
        </div>
      </footer>

      <Toaster richColors position="top-center" />
    </div>
  )
}
