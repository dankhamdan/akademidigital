'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Check,
  Globe,
  Zap,
  Shield,
  Smartphone,
  ChevronDown,
  Star,
  Send,
  Menu,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
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
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' },
  }),
}

// ─── Data ─────────────────────────────────────────────────────
const navLinks = [
  { label: 'Layanan', href: '#layanan' },
  { label: 'Harga', href: '#harga' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Kontak', href: '#kontak' },
]

const fiturList = [
  {
    icon: Globe,
    title: 'Website Modern',
    desc: 'Desain responsif dan profesional, siap pakai tanpa coding.',
  },
  {
    icon: Zap,
    title: 'Cepat Jadi',
    desc: 'Dalam 24 jam website Anda sudah live dan bisa diakses.',
  },
  {
    icon: Shield,
    title: 'Aman & Stabil',
    desc: 'Hosting Vercel — serverless, auto-scaling, 99.9% uptime.',
  },
  {
    icon: Smartphone,
    title: 'Responsif',
    desc: 'Tampilan sempurna di HP, tablet, dan laptop.',
  },
]

const hargaList = [
  {
    name: 'Starter',
    price: '299K',
    desc: 'Cocok untuk bisnis kecil & UMKM',
    features: [
      '1 halaman landing page',
      'Desain responsif',
      'Hosting Vercel (1 tahun)',
      'Domain .vercel.app gratis',
      'Revisi 2x',
    ],
    popular: false,
  },
  {
    name: 'Professional',
    price: '599K',
    desc: 'Untuk bisnis yang ingin tampil profesional',
    features: [
      '3 halaman website',
      'Desain premium responsif',
      'Hosting Vercel (1 tahun)',
      'Domain custom gratis',
      'Form kontak & WhatsApp',
      'Revisi 5x',
      'SEO optimal',
    ],
    popular: true,
  },
  {
    name: 'Business',
    price: '999K',
    desc: 'Solusi lengkap untuk growing business',
    features: [
      '5 halaman website',
      'Desain premium + animasi',
      'Hosting Vercel (1 tahun)',
      'Domain custom gratis',
      'Google Sheets backend',
      'Dashboard admin',
      'Revisi unlimited',
      'Support 3 bulan',
    ],
    popular: false,
  },
]

const faqList = [
  {
    q: 'Apakah saya perlu paham coding?',
    a: 'Tidak perlu sama sekali! Semua proses pembuatan, deploy, dan maintenance kami tangani. Anda hanya perlu siapkan konten dan gambar.',
  },
  {
    q: 'Berapa lama website saya jadi?',
    a: 'Untuk paket Starter 1-2 hari kerja, Professional 3-5 hari kerja, dan Business 5-7 hari kerja.',
  },
  {
    q: 'Apa itu Google Sheets backend?',
    a: 'Data dari form kontak, pendaftaran, dan pesan pengunjung website Anda akan otomatis tersimpan di Google Sheets. Jadi Anda bisa kelola data dengan mudah tanpa database rumit.',
  },
  {
    q: 'Domain custom itu apa?',
    a: 'Anda bisa pakai domain sendiri seperti namabisnis.com. Kami bantu setup DNS dan koneksi ke Vercel.',
  },
  {
    q: 'Bagaimana cara revisi?',
    a: 'Setelah website jadi, Anda kirimkan feedback revisi via WhatsApp. Kami kerjakan revisi sesuai paket yang dipilih.',
  },
]

// ─── Component ────────────────────────────────────────────────
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)
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
        toast.success('Pesan terkirim! Kami akan segera menghubungi Anda.')
        form.reset()
      } else {
        toast.error('Gagal mengirim pesan. Coba lagi.')
      }
    } catch {
      toast.error('Terjadi kesalahan. Coba lagi nanti.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      {/* ─── Navbar ─────────────────────────────────── */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
          <a href="#" className="text-lg font-bold tracking-tight text-emerald-700">
            AkademiDigital
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-gray-600 transition hover:text-emerald-600"
              >
                {l.label}
              </a>
            ))}
            <a href="#kontak">
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                Hubungi Kami
              </Button>
            </a>
          </nav>

          {/* Mobile nav */}
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <SheetTitle className="text-emerald-700 font-bold">AkademiDigital</SheetTitle>
              <nav className="mt-8 flex flex-col gap-4">
                {navLinks.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-base text-gray-700 transition hover:text-emerald-600"
                  >
                    {l.label}
                  </a>
                ))}
                <a href="#kontak" onClick={() => setMenuOpen(false)}>
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white mt-2">
                    Hubungi Kami
                  </Button>
                </a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* ─── Hero ───────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-teal-50" />
        <div className="relative mx-auto max-w-5xl px-4 py-20 md:py-28 text-center">
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.08 } } }}>
            <motion.div variants={fadeUp} custom={0}>
              <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 mb-4">
                ✨ Website Profesional untuk Bisnis Anda
              </span>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-3xl font-extrabold leading-tight tracking-tight md:text-5xl"
            >
              Website Modern dengan{' '}
              <span className="text-emerald-600">Google Sheets Backend</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="mx-auto mt-4 max-w-2xl text-base text-gray-500 md:text-lg"
            >
              Kami buatkan website profesional yang terhubung langsung ke Google Sheets Anda.
              Tanpa server rumit, tanpa database mahal — cukup spreadsheet yang Anda sudah kenal.
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a href="#harga">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2">
                  Lihat Paket Harga <ArrowRight className="h-4 w-4" />
                </Button>
              </a>
              <a href="#layanan">
                <Button size="lg" variant="outline" className="border-gray-300">
                  Pelajari Lebih Lanjut
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── Fitur / Layanan ────────────────────────── */}
      <section id="layanan" className="py-16 md:py-20 bg-white">
        <div className="mx-auto max-w-5xl px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
            className="text-center mb-10"
          >
            <motion.h2 variants={fadeUp} custom={0} className="text-2xl font-bold md:text-3xl">
              Kenapa Pilih Kami?
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="mt-2 text-gray-500">
              Solusi website paling simpel dan efisien untuk bisnis Anda
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {fiturList.map((f, i) => (
              <motion.div key={f.title} variants={fadeUp} custom={i}>
                <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow h-full">
                  <CardHeader className="pb-3">
                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                      <f.icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-base font-semibold">{f.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500">{f.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Cara Kerja ─────────────────────────────── */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="mx-auto max-w-5xl px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold md:text-3xl">Cara Kerja</h2>
            <p className="mt-2 text-gray-500">3 langkah simpel, website Anda langsung live</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              { step: '01', title: 'Konsultasi', desc: 'Ceritakan kebutuhan bisnis Anda via WhatsApp. Kami bantu tentukan paket terbaik.' },
              { step: '02', title: 'Desain & Build', desc: 'Kami desain dan bangun website sesuai kebutuhan. Preview dikirim untuk approval.' },
              { step: '03', title: 'Live!', desc: 'Website Anda online di Vercel. Tinggal pakai dan terima order!' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-white font-bold text-lg">
                  {item.step}
                </div>
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="mt-1 text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Harga ──────────────────────────────────── */}
      <section id="harga" className="py-16 md:py-20 bg-white">
        <div className="mx-auto max-w-5xl px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold md:text-3xl">Paket Harga</h2>
            <p className="mt-2 text-gray-500">Pilih paket yang sesuai kebutuhan bisnis Anda</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {hargaList.map((pkg) => (
              <Card
                key={pkg.name}
                className={`relative flex flex-col border ${
                  pkg.popular
                    ? 'border-emerald-500 shadow-lg ring-1 ring-emerald-500'
                    : 'border-gray-100 shadow-sm'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-emerald-600 px-3 py-0.5 text-xs font-semibold text-white">
                      Paling Populer
                    </span>
                  </div>
                )}
                <CardHeader className="text-center pb-2">
                  <CardTitle className="text-lg">{pkg.name}</CardTitle>
                  <p className="text-sm text-gray-400">{pkg.desc}</p>
                  <div className="mt-3">
                    <span className="text-3xl font-extrabold">Rp {pkg.price}</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <a href="#kontak" className="w-full">
                    <Button
                      className={`w-full ${
                        pkg.popular
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                      variant={pkg.popular ? 'default' : 'outline'}
                    >
                      Pilih {pkg.name}
                    </Button>
                  </a>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ────────────────────────────────────── */}
      <section id="faq" className="py-16 md:py-20 bg-gray-50">
        <div className="mx-auto max-w-3xl px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold md:text-3xl">Pertanyaan Umum</h2>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqList.map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left text-sm font-medium">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-gray-500 leading-relaxed">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ─── CTA / Kontak ───────────────────────────── */}
      <section id="kontak" className="py-16 md:py-20 bg-white">
        <div className="mx-auto max-w-lg px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold md:text-3xl">Siap Memulai?</h2>
            <p className="mt-2 text-gray-500">
              Hubungi kami sekarang dan dapatkan konsultasi gratis!
            </p>
          </div>

          <Card className="border border-gray-100 shadow-sm">
            <CardContent className="pt-6">
              <form onSubmit={handleContact} className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium">Nama</label>
                  <Input name="nama" placeholder="Nama lengkap Anda" required className="border-gray-200" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Email</label>
                  <Input name="email" type="email" placeholder="email@anda.com" required className="border-gray-200" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Pesan</label>
                  <Textarea
                    name="deskripsi"
                    placeholder="Ceritakan kebutuhan website Anda..."
                    required
                    rows={4}
                    className="border-gray-200"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white gap-2"
                >
                  {submitting ? 'Mengirim...' : (
                    <>
                      Kirim Pesan <Send className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <p className="mt-4 text-center text-sm text-gray-400">
            Atau hubungi langsung via{' '}
            <a href="https://wa.me/62" className="font-medium text-emerald-600 hover:underline">
              WhatsApp
            </a>
          </p>
        </div>
      </section>

      {/* ─── Footer ─────────────────────────────────── */}
      <footer className="border-t border-gray-100 bg-gray-50">
        <div className="mx-auto max-w-5xl px-4 py-8 text-center text-sm text-gray-400">
          <p className="font-semibold text-gray-600">AkademiDigital</p>
          <p className="mt-1">Jasa pembuatan website profesional dengan Google Sheets backend.</p>
          <p className="mt-3">© {new Date().getFullYear()} AkademiDigital. All rights reserved.</p>
        </div>
      </footer>

      <Toaster richColors position="top-center" />
    </div>
  )
}
