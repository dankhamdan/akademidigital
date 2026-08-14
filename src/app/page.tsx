'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Check,
  Code2,
  Globe,
  Zap,
  Shield,
  Smartphone,
  BookOpen,
  Download,
  Copy,
  Star,
  Send,
  Menu,
  Layers,
  FileSpreadsheet,
  Server,
  ExternalLink,
  ChevronRight,
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
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' },
  }),
}

// ─── Data ─────────────────────────────────────────────────────
const navLinks = [
  { label: 'Fitur', href: '#fitur' },
  { label: 'Isi Paket', href: '#paket' },
  { label: 'Harga', href: '#harga' },
  { label: 'FAQ', href: '#faq' },
]

const masalahList = [
  'Punya bisnis tapi belum punya website?',
  'Mau bikin website tapi nggak bisa coding?',
  'Bayar developer mahal untuk website sederhana?',
  'Hosting & database terus menguras biaya?',
  'Punya website tapi susah update kontennya?',
]

const fiturList = [
  {
    icon: Globe,
    title: 'Website Responsif',
    desc: 'Tampilan sempurna di semua device — HP, tablet, laptop. Tanpa perlu coding.',
  },
  {
    icon: FileSpreadsheet,
    title: 'Google Sheets Backend',
    desc: 'Data langsung tersimpan di Google Sheets. Dikelola seperti Excel biasa.',
  },
  {
    icon: Server,
    title: 'Hosting Gratis Vercel',
    desc: 'Deploy gratis, SSL gratis, CDN global. Nggak perlu bayar server.',
  },
  {
    icon: Shield,
    title: 'Aman & Stabil',
    desc: 'Infrastruktur Vercel enterprise-grade dengan uptime 99.9%.',
  },
  {
    icon: Zap,
    title: 'Mudah Dipasang',
    desc: 'Ikuti panduan step-by-step. Dari nol sampai live dalam 30 menit.',
  },
  {
    icon: Smartphone,
    title: 'SEO Friendly',
    desc: 'Optimasi mesin pencari bawaan, website mudah ditemukan di Google.',
  },
]

const isiPaket = [
  {
    icon: Code2,
    title: 'Source Code Lengkap',
    desc: 'Semua file source code website (Next.js + Tailwind CSS). Siap dimodifikasi sesuai kebutuhan.',
  },
  {
    icon: BookOpen,
    title: 'Panduan Deploy',
    desc: 'eBook panduan lengkap deploy ke Vercel — langkah demi langkah dengan screenshot.',
  },
  {
    icon: FileSpreadsheet,
    title: 'Template Google Sheets',
    desc: 'File Google Apps Script + template spreadsheet yang langsung bisa dipakai.',
  },
  {
    icon: Download,
    title: 'Update Gratis',
    desc: 'Mendapat akses update source code terbaru selama 6 bulan.',
  },
]

const techStack = [
  { name: 'Next.js', desc: 'React Framework' },
  { name: 'Tailwind CSS', desc: 'Utility CSS' },
  { name: 'Google Apps Script', desc: 'Backend' },
  { name: 'Vercel', desc: 'Hosting' },
]

const faqList = [
  {
    q: 'Saya tidak bisa coding, apakah bisa pakai ini?',
    a: 'Bisa! Panduan deploy kami buat step-by-step dengan screenshot. Anda hanya perlu ikuti langkahnya. Kalau stuck, kami bantu via WhatsApp.',
  },
  {
    q: 'Apa bedanya pakai Google Sheets dibanding database biasa?',
    a: 'Google Sheets gratis, familiar (kaya Excel), bisa diakses dari mana saja, dan nggak perlu setup database server. Cocok untuk website dengan traffic menengah.',
  },
  {
    q: 'Hosting benar-benar gratis selamanya?',
    a: 'Vercel menyediakan hosting gratis (Hobby Plan) yang cukup untuk website personal dan bisnis kecil. Unlimited bandwidth, SSL gratis, domain .vercel.app gratis.',
  },
  {
    q: 'Bisa dipakai untuk berapa website?',
    a: '1 lisensi untuk 1 website. Kalau mau dipakai untuk multiple website/domain, bisa hubungi kami untuk paket lisensi tambahan dengan harga spesial.',
  },
  {
    q: 'Bisa custom tampilan dan fiturnya?',
    a: 'Tentu! Karena Anda dapat source code, Anda bisa modif sesuka hati. Atau kalau mau kami yang customkan, ada layanan tambahan dengan biaya terpisah.',
  },
  {
    q: 'Support sampai kapan?',
    a: 'Kami berikan support WhatsApp selama 6 bulan untuk pertanyaan seputar deploy dan penggunaan. Update source code juga gratis selama 6 bulan.',
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
        toast.success('Terima kasih! Kami akan segera menghubungi Anda.')
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
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white font-bold text-sm">AD</div>
            <span className="text-lg font-bold tracking-tight">AkademiDigital</span>
          </div>
          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="rounded-md px-3 py-2 text-sm text-gray-600 transition hover:bg-gray-100 hover:text-gray-900">
                {l.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a href="#harga" className="hidden md:block">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-5">
                Beli Sekarang
              </Button>
            </a>
            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon"><Menu className="h-5 w-5" /></Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <SheetTitle className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white font-bold text-sm">AD</div>
                  AkademiDigital
                </SheetTitle>
                <nav className="mt-8 flex flex-col gap-1">
                  {navLinks.map((l) => (
                    <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="rounded-md px-3 py-2.5 text-gray-700 transition hover:bg-gray-100">
                      {l.label}
                    </a>
                  ))}
                  <a href="#harga" onClick={() => setMenuOpen(false)} className="mt-3">
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-full">Beli Sekarang</Button>
                  </a>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* ─── Hero ───────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-gray-100">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-emerald-50/80 via-teal-50/40 to-transparent" />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-5 py-16 md:py-24 md:grid-cols-2 md:items-center">
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.08 } } }}>
            <motion.div variants={fadeUp} custom={0}>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                <Download className="h-3 w-3" /> Source Code + Panduan
              </div>
            </motion.div>
            <motion.h1 variants={fadeUp} custom={1} className="mt-5 text-3xl font-extrabold leading-[1.15] tracking-tight md:text-4xl lg:text-[2.8rem]">
              Template Website +
              <br />
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Google Sheets Backend
              </span>
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="mt-5 max-w-lg text-base leading-relaxed text-gray-500">
              Dapatkan source code website profesional dengan backend Google Apps Script. Deploy gratis di Vercel, data tersimpan di Google Sheets. Tanpa server, tanpa database mahal.
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="mt-8 flex flex-wrap gap-3">
              <a href="#harga">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full gap-2 px-6 shadow-lg shadow-emerald-200">
                  Beli Sekarang <ArrowRight className="h-4 w-4" />
                </Button>
              </a>
              <a href="#fitur">
                <Button size="lg" variant="outline" className="rounded-full px-6 border-gray-200">
                  Lihat Detail
                </Button>
              </a>
            </motion.div>
            <motion.div variants={fadeUp} custom={4} className="mt-6 flex flex-wrap items-center gap-4 text-xs text-gray-400">
              <span className="flex items-center gap-1"><Check className="h-3 w-3 text-emerald-500" /> Source code lengkap</span>
              <span className="flex items-center gap-1"><Check className="h-3 w-3 text-emerald-500" /> Panduan deploy</span>
              <span className="flex items-center gap-1"><Check className="h-3 w-3 text-emerald-500" /> Support 6 bulan</span>
            </motion.div>
          </motion.div>

          {/* Hero mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="hidden md:block"
          >
            <div className="relative rounded-2xl border border-gray-200 bg-gray-50 p-3 shadow-2xl shadow-emerald-100/40">
              <div className="rounded-xl bg-white border border-gray-100 overflow-hidden">
                <div className="flex items-center gap-1.5 border-b border-gray-100 px-4 py-2.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                  <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
                  <div className="ml-3 flex-1 rounded-md bg-gray-100 px-3 py-1 text-xs text-gray-400">websiteanda.vercel.app</div>
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 text-xs font-bold">W</div>
                      <div><div className="h-2.5 w-20 rounded bg-gray-200" /></div>
                    </div>
                    <div className="h-7 w-20 rounded-full bg-emerald-600" />
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="h-3 w-3/4 rounded bg-gray-200" />
                    <div className="h-3 w-1/2 rounded bg-gray-100" />
                  </div>
                  <div className="mt-5 grid grid-cols-3 gap-2">
                    {[1, 2, 3].map((n) => (
                      <div key={n} className="h-20 rounded-lg bg-emerald-50 border border-emerald-100 flex flex-col items-center justify-center gap-1">
                        <div className="h-4 w-4 rounded bg-emerald-200" />
                        <div className="h-2 w-10 rounded bg-emerald-100" />
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-lg bg-gray-50 border border-gray-100 p-3 space-y-2">
                      <div className="h-2 w-16 rounded bg-gray-200" />
                      <div className="h-8 w-full rounded bg-emerald-100" />
                    </div>
                    <div className="rounded-lg bg-gray-50 border border-gray-100 p-3 space-y-2">
                      <div className="h-2 w-16 rounded bg-gray-200" />
                      <div className="h-8 w-full rounded bg-emerald-100" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-3 -right-3 rounded-xl border border-white bg-white px-3 py-2 shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs font-medium text-gray-700">Live on Vercel</span>
                </div>
              </div>
              <div className="absolute -top-2 -left-2 rounded-lg border border-white bg-white px-2.5 py-1.5 shadow-md">
                <div className="flex items-center gap-1.5">
                  <FileSpreadsheet className="h-3.5 w-3.5 text-emerald-500" />
                  <span className="text-[10px] font-medium text-gray-600">Google Sheets Synced</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Pain Points ─────────────────────────────── */}
      <section className="border-b border-gray-100 bg-gray-50/50">
        <div className="mx-auto max-w-3xl px-5 py-12 md:py-16 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ visible: { transition: { staggerChildren: 0.06 } } }}>
            <motion.p variants={fadeUp} custom={0} className="text-sm font-medium text-emerald-600 uppercase tracking-wide">Kenapa Anda Butuh Ini?</motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="mt-2 text-2xl font-bold md:text-3xl">Pernah Mengalami Ini?</motion.h2>
            <motion.div variants={fadeUp} custom={2} className="mt-8 space-y-3">
              {masalahList.map((m) => (
                <div key={m} className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 text-left text-sm text-gray-600">
                  <div className="text-lg">😅</div>
                  {m}
                </div>
              ))}
            </motion.div>
            <motion.div variants={fadeUp} custom={3} className="mt-8">
              <p className="text-gray-500">
                Template ini <strong className="text-gray-700">menyelesaikan semua masalah di atas</strong>.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── Fitur ───────────────────────────────────── */}
      <section id="fitur" className="py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-5">
          <div className="text-center mb-10">
            <p className="text-sm font-medium text-emerald-600 uppercase tracking-wide">Fitur Lengkap</p>
            <h2 className="mt-2 text-2xl font-bold md:text-3xl">Apa yang Anda Dapatkan?</h2>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {fiturList.map((f, i) => (
              <motion.div key={f.title} variants={fadeUp} custom={i}>
                <Card className="rounded-xl border-gray-200 hover:shadow-md transition-shadow h-full">
                  <CardHeader className="pb-2">
                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                      <f.icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-base font-semibold">{f.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Tech Stack ──────────────────────────────── */}
      <section className="py-12 bg-gray-50 border-y border-gray-100">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <p className="text-sm text-gray-400 mb-6">Dibangun dengan teknologi terpopuler</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {techStack.map((t) => (
              <div key={t.name} className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm">
                <span className="font-medium text-gray-700">{t.name}</span>
                <span className="ml-1.5 text-xs text-gray-400">{t.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Isi Paket ──────────────────────────────── */}
      <section id="paket" className="py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-5">
          <div className="text-center mb-10">
            <p className="text-sm font-medium text-emerald-600 uppercase tracking-wide">Isi Paket</p>
            <h2 className="mt-2 text-2xl font-bold md:text-3xl">Ajaib — 4 Item yang Anda Dapatkan</h2>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="grid gap-5 sm:grid-cols-2"
          >
            {isiPaket.map((p, i) => (
              <motion.div key={p.title} variants={fadeUp} custom={i}>
                <div className="flex gap-4 rounded-xl border border-gray-200 bg-white p-5 hover:shadow-md transition-shadow">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                    <p.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{p.title}</h3>
                    <p className="mt-1 text-sm text-gray-500 leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Harga ──────────────────────────────────── */}
      <section id="harga" className="py-16 md:py-20 bg-gray-50 border-y border-gray-100">
        <div className="mx-auto max-w-lg px-5">
          <div className="text-center mb-10">
            <p className="text-sm font-medium text-emerald-600 uppercase tracking-wide">Harga</p>
            <h2 className="mt-2 text-2xl font-bold md:text-3xl">Investasi Sekali Bayar</h2>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <Card className="rounded-2xl border-2 border-emerald-500 shadow-xl shadow-emerald-100/40 overflow-hidden">
              <div className="bg-emerald-600 px-6 py-3 text-center">
                <span className="text-sm font-semibold text-white">Template Website + Google Sheets Backend</span>
              </div>
              <CardContent className="pt-8 pb-6 text-center">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-sm text-gray-400">Rp</span>
                  <span className="text-5xl font-extrabold tracking-tight">199K</span>
                </div>
                <p className="mt-2 text-sm text-gray-400">Bayar sekali, pakai selamanya</p>

                <div className="mt-6 space-y-2.5 text-left max-w-xs mx-auto">
                  {[
                    'Source code website (Next.js + Tailwind)',
                    'Google Apps Script backend',
                    'Panduan deploy PDF + video',
                    'Support WhatsApp 6 bulan',
                    'Update source code 6 bulan',
                    'Bisa dipakai untuk 1 domain',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2 text-sm text-gray-600">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                      {item}
                    </div>
                  ))}
                </div>

                <div className="mt-8 space-y-3">
                  <a href="#kontak">
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-full py-6 text-base font-semibold shadow-lg shadow-emerald-200 gap-2">
                      Pesan Sekarang <ArrowRight className="h-4 w-4" />
                    </Button>
                  </a>
                  <p className="text-xs text-gray-400">Pembayaran via transfer bank / e-wallet</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* ─── Testimonial ────────────────────────────── */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <p className="text-sm font-medium text-emerald-600 uppercase tracking-wide">Testimoni</p>
          <h2 className="mt-2 text-2xl font-bold md:text-3xl">Kata Mereka</h2>

          <div className="mt-10 space-y-6">
            {[
              { name: 'Ahmad Rizki', role: 'Pemilik Toko Online', text: 'Saya nggak bisa coding sama sekali, tapi berhasil deploy website dalam 1 jam! Panduannya sangat jelas dan mudah diikuti.' },
              { name: 'Siti Nurhaliza', role: 'Freelancer', text: 'Klien saya sangat puas dengan website yang saya buat pakai template ini. Google Sheets backend-nya bikin pekerjaan jadi gampang.' },
            ].map((t) => (
              <div key={t.name} className="rounded-xl border border-gray-200 bg-white p-6 text-left">
                <div className="flex gap-0.5 mb-3">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed italic">&ldquo;{t.text}&rdquo;</p>
                <div className="mt-3 flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 text-xs font-bold">
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
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

      {/* ─── CTA / Pesan ────────────────────────────── */}
      <section id="kontak" className="py-16 md:py-24">
        <div className="mx-auto max-w-xl px-5 text-center">
          <h2 className="text-2xl font-bold md:text-3xl">Siap Punya Website Sendiri?</h2>
          <p className="mt-3 text-gray-500">Isi form di bawah untuk memesan. Kami akan kirim source code + panduannya.</p>

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
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Pesan (opsional)</label>
                  <Textarea name="deskripsi" placeholder="Tulis pertanyaan atau kebutuhan Anda..." rows={3} className="rounded-lg" />
                </div>
                <Button type="submit" disabled={submitting} className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-full py-5 gap-2">
                  {submitting ? 'Mengirim...' : <>Pesan Sekarang <Send className="h-4 w-4" /></>}
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
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-600 text-white text-xs font-bold">AD</div>
              <span className="text-sm font-semibold">AkademiDigital</span>
            </div>
            <p className="mt-1 text-xs text-gray-400">Template website + Google Sheets backend.</p>
          </div>
          <p className="text-xs text-gray-400">© {new Date().getFullYear()} AkademiDigital. All rights reserved.</p>
        </div>
      </footer>

      <Toaster richColors position="top-center" />
    </div>
  )
}
