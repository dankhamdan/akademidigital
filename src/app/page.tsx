'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Check,
  Globe,
  Zap,
  Shield,
  Code2,
  Server,
  Send,
  Menu,
  Layers,
  ExternalLink,
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
  { label: 'Fitur', href: '#fitur' },
  { label: 'Teknologi', href: '#teknologi' },
  { label: 'Harga', href: '#harga' },
  { label: 'FAQ', href: '#faq' },
]

const featureTabs = [
  {
    id: 'frontend',
    label: 'Frontend',
    icon: Layers,
    title: 'Antarmuka Modern',
    desc: 'Website dibangun dengan Next.js + Tailwind CSS — framework terpopuler untuk web modern. Desain responsif, cepat, dan SEO friendly.',
    points: ['Next.js 16 App Router', 'Tailwind CSS 4', 'shadcn/ui Components', 'Framer Motion Animasi'],
  },
  {
    id: 'backend',
    label: 'Backend',
    icon: Server,
    title: 'Tanpa Server Rumit',
    desc: 'Data tersimpan otomatis di Google Sheets. Nggak perlu belajar database, nggak perlu bayar server tambahan.',
    points: ['Google Sheets sebagai database', 'Google Apps Script API', 'Auto-sync real-time', 'Dashboard spreadsheet bawaan'],
  },
  {
    id: 'deploy',
    label: 'Deploy',
    icon: Globe,
    title: 'Hosting Enterprise Gratis',
    desc: 'Deploy di Vercel — platform yang sama dipakai oleh perusahaan besar. CDN global, SSL gratis, auto-scaling.',
    points: ['Vercel Edge Network', 'SSL & CDN gratis', 'Auto-deploy dari Git', '99.9% uptime guarantee'],
  },
]

const stats = [
  { value: '24 Jam', label: 'Website Jadi' },
  { value: '0 Rp', label: 'Biaya Server' },
  { value: '99.9%', label: 'Uptime' },
  { value: '100+', label: 'Website Dibuat' },
]

const hargaList = [
  {
    name: 'Starter',
    price: '299K',
    period: '/project',
    desc: 'Mulai bisnis online dengan landing page profesional.',
    features: [
      '1 halaman landing page',
      'Desain responsif modern',
      'Hosting Vercel (1 tahun)',
      'Domain .vercel.app',
      'Revisi 2x',
    ],
    cta: 'Mulai Starter',
    popular: false,
  },
  {
    name: 'Business',
    price: '599K',
    period: '/project',
    desc: 'Website lengkap dengan Google Sheets backend.',
    features: [
      '3 halaman website',
      'Desain premium + animasi',
      'Hosting Vercel (1 tahun)',
      'Google Sheets backend',
      'Form kontak & WhatsApp',
      'Revisi 5x',
      'Support 1 bulan',
    ],
    cta: 'Pilih Business',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: '999K',
    period: '/project',
    desc: 'Solusi lengkap untuk bisnis yang berkembang pesat.',
    features: [
      '5+ halaman website',
      'Custom design system',
      'Google Sheets backend',
      'Admin dashboard',
      'Domain custom gratis',
      'Revisi unlimited',
      'Support 3 bulan',
      'SEO & Analytics',
    ],
    cta: 'Go Enterprise',
    popular: false,
  },
]

const faqList = [
  { q: 'Apa bedanya dengan website biasa?', a: 'Website kami menggunakan Google Sheets sebagai backend, artinya data pengunjung, form kontak, dan pesanan langsung tersimpan di spreadsheet yang Anda kelola sendiri. Tanpa CMS rumit, tanpa biaya server.' },
  { q: 'Saya tidak paham teknologi, apakah bisa?', a: 'Tentu! Anda tidak perlu paham coding sama sekali. Kami tangani semua teknis — dari desain, development, deploy, sampai maintenance. Anda fokus ke konten dan bisnis saja.' },
  { q: 'Hosting benar-benar gratis?', a: 'Ya! Vercel menyediakan hosting gratis untuk website Next.js. Domain .vercel.app gratis selamanya. Kalau mau domain custom (misal bisnisanda.com), biaya domain mulai dari 100K/tahun.' },
  { q: 'Bagaimana cara kerja Google Sheets backend?', a: 'Kami setup Google Apps Script yang terhubung ke spreadsheet Anda. Setiap ada pengunjung isi form di website, datanya langsung muncul di Google Sheets. Anda bisa akses, filter, dan export data kapan saja.' },
  { q: 'Berapa lama proses pengerjaan?', a: 'Starter: 1-2 hari kerja. Business: 3-5 hari kerja. Enterprise: 5-7 hari kerja. Setelah desain di-approve, pengerjaan dimulai segera.' },
]

// ─── Component ────────────────────────────────────────────────
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('frontend')
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
            <a href="#kontak" className="hidden md:block">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-5">
                Pesan Sekarang
              </Button>
            </a>
            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
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
                  <a href="#kontak" onClick={() => setMenuOpen(false)} className="mt-3">
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-full">Pesan Sekarang</Button>
                  </a>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* ─── Hero (Split) ───────────────────────────── */}
      <section className="relative overflow-hidden border-b border-gray-100">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-emerald-50/80 via-teal-50/40 to-transparent" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-5 py-16 md:py-24 md:grid-cols-2 md:items-center">
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.08 } } }}>
            <motion.div variants={fadeUp} custom={0}>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                <Zap className="h-3 w-3" /> Next.js + Google Sheets
              </div>
            </motion.div>
            <motion.h1 variants={fadeUp} custom={1} className="mt-5 text-3xl font-extrabold leading-[1.15] tracking-tight md:text-4xl lg:text-5xl">
              Bikin Website Profesional,
              <br />
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Tanpa Ribet Server
              </span>
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="mt-5 max-w-lg text-base leading-relaxed text-gray-500">
              Kami bangun website modern dengan <strong className="text-gray-700">Next.js</strong> yang data-nya langsung nyambung ke <strong className="text-gray-700">Google Sheets</strong> Anda. Deploy gratis di Vercel, tanpa server, tanpa database rumit.
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="mt-8 flex flex-wrap gap-3">
              <a href="#harga">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full gap-2 px-6">
                  Lihat Harga <ArrowRight className="h-4 w-4" />
                </Button>
              </a>
              <a href="#fitur">
                <Button size="lg" variant="outline" className="rounded-full px-6 border-gray-200">
                  Lihat Fitur
                </Button>
              </a>
            </motion.div>
          </motion.div>

          {/* Hero visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="hidden md:block"
          >
            <div className="relative rounded-2xl border border-gray-200 bg-gray-50 p-4 shadow-xl shadow-emerald-100/30">
              <div className="rounded-xl bg-white border border-gray-100 overflow-hidden">
                {/* Mock browser bar */}
                <div className="flex items-center gap-1.5 border-b border-gray-100 px-4 py-2.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                  <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
                  <div className="ml-3 flex-1 rounded-md bg-gray-100 px-3 py-1 text-xs text-gray-400">
                    akademidigital.vercel.app
                  </div>
                </div>
                {/* Mock content */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 text-xs font-bold">A</div>
                    <div>
                      <div className="h-2.5 w-24 rounded bg-gray-200" />
                      <div className="mt-1 h-2 w-16 rounded bg-gray-100" />
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="h-3 w-3/4 rounded bg-gray-200" />
                    <div className="h-3 w-1/2 rounded bg-gray-100" />
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <div className="h-16 rounded-lg bg-emerald-50 border border-emerald-100" />
                    <div className="h-16 rounded-lg bg-teal-50 border border-teal-100" />
                  </div>
                  <div className="mt-3 flex gap-2">
                    <div className="h-7 w-20 rounded-full bg-emerald-600" />
                    <div className="h-7 w-20 rounded-full border border-gray-200" />
                  </div>
                </div>
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-3 -right-3 rounded-xl border border-white bg-white px-3 py-2 shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-xs font-medium text-gray-700">Deployed on Vercel</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Stats Bar ───────────────────────────────── */}
      <section className="border-b border-gray-100 bg-gray-50/50">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 px-5 py-10 md:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={i}
              className="text-center"
            >
              <div className="text-2xl font-extrabold text-emerald-600 md:text-3xl">{s.value}</div>
              <div className="mt-0.5 text-sm text-gray-500">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── Fitur (Tabbed) ──────────────────────────── */}
      <section id="fitur" className="py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-5">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold md:text-3xl">Teknologi yang Kami Gunakan</h2>
            <p className="mt-2 text-gray-500">Stack modern yang terbukti handal dan scalable</p>
          </div>

          {/* Tabs */}
          <div className="mb-8 flex justify-center gap-2 flex-wrap">
            {featureTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
                  activeTab === tab.id
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            {featureTabs.filter((t) => t.id === activeTab).map((tab) => (
              <div className="grid gap-8 md:grid-cols-2 items-center">
                <div>
                  <h3 className="text-xl font-bold">{tab.title}</h3>
                  <p className="mt-2 text-gray-500 leading-relaxed">{tab.desc}</p>
                  <ul className="mt-4 space-y-2.5">
                    {tab.points.map((p) => (
                      <li key={p} className="flex items-center gap-2.5 text-sm">
                        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                          <Check className="h-3 w-3 text-emerald-600" />
                        </div>
                        <span className="text-gray-700">{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center justify-center">
                  <div className="relative w-full max-w-xs aspect-square rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-50 border border-emerald-200/50 flex items-center justify-center">
                    <tab.icon className="h-20 w-20 text-emerald-600/70" strokeWidth={1.2} />
                    <div className="absolute -top-2 -left-2 h-8 w-8 rounded-full bg-emerald-500/20" />
                    <div className="absolute -bottom-3 -right-3 h-12 w-12 rounded-full bg-teal-500/15" />
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Cara Kerja (Timeline) ───────────────────── */}
      <section id="teknologi" className="py-16 md:py-20 bg-gray-50 border-y border-gray-100">
        <div className="mx-auto max-w-3xl px-5">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold md:text-3xl">Bagaimana Prosesnya?</h2>
            <p className="mt-2 text-gray-500">Tiga langkah simpel dari konsultasi sampai website live</p>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-5 top-3 bottom-3 w-0.5 bg-emerald-200 md:left-1/2 md:-translate-x-px" />

            {[
              { num: '1', title: 'Konsultasi Gratis', desc: 'Ceritakan kebutuhan bisnis Anda. Kami bantu pilih paket terbaik dan diskusi desain yang diinginkan.', side: 'left' },
              { num: '2', title: 'Desain & Development', desc: 'Kami mulai bangun website Anda. Preview dikirim berkala untuk feedback dan approval.', side: 'right' },
              { num: '3', title: 'Website Live!', desc: 'Setelah disetujui, website langsung deploy ke Vercel. Anda terima link dan mulai pakai!', side: 'left' },
            ].map((item) => (
              <motion.div
                key={item.num}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={fadeUp}
                custom={parseInt(item.num)}
                className={`relative mb-10 last:mb-0 flex items-start gap-5 md:gap-0 ${
                  item.side === 'right' ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Dot */}
                <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white font-bold text-sm shadow-md md:absolute md:left-1/2 md:-translate-x-1/2">
                  {item.num}
                </div>
                {/* Content */}
                <div className="flex-1 md:w-[calc(50%-3rem)] md:px-8">
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="mt-1 text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Harga ──────────────────────────────────── */}
      <section id="harga" className="py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold md:text-3xl">Pilih Paket Anda</h2>
            <p className="mt-2 text-gray-500">Harga transparan, tanpa biaya tersembunyi</p>
          </div>

          <div className="grid gap-5 md:grid-cols-3 items-start">
            {hargaList.map((pkg) => (
              <motion.div
                key={pkg.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={hargaList.indexOf(pkg)}
              >
                <Card className={`relative flex flex-col rounded-2xl ${
                  pkg.popular
                    ? 'border-2 border-emerald-500 shadow-xl shadow-emerald-100/40'
                    : 'border border-gray-200'
                }`}>
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="rounded-full bg-emerald-600 px-4 py-1 text-xs font-semibold text-white shadow-sm">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <CardHeader className="pb-3 pt-6 text-center">
                    <CardTitle className="text-lg font-semibold">{pkg.name}</CardTitle>
                    <p className="text-sm text-gray-400">{pkg.desc}</p>
                    <div className="mt-4 flex items-baseline justify-center gap-1">
                      <span className="text-sm text-gray-400">Rp</span>
                      <span className="text-4xl font-extrabold tracking-tight">{pkg.price}</span>
                      <span className="text-sm text-gray-400">{pkg.period}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 px-6">
                    <ul className="space-y-2.5">
                      {pkg.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-sm text-gray-600">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="px-6 pb-6 pt-2">
                    <a href="#kontak" className="w-full">
                      <Button
                        className={`w-full rounded-full py-5 font-medium ${
                          pkg.popular
                            ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                        }`}
                        variant={pkg.popular ? 'default' : 'secondary'}
                      >
                        {pkg.cta}
                      </Button>
                    </a>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ────────────────────────────────────── */}
      <section id="faq" className="py-16 md:py-20 bg-gray-50 border-y border-gray-100">
        <div className="mx-auto max-w-2xl px-5">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold md:text-3xl">FAQ</h2>
          </div>
          <Accordion type="single" collapsible className="space-y-3">
            {faqList.map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="rounded-xl border border-gray-200 px-4 bg-white">
                <AccordionTrigger className="text-sm font-medium py-4 hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-gray-500 leading-relaxed pb-4">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ─── CTA ────────────────────────────────────── */}
      <section id="kontak" className="py-16 md:py-24">
        <div className="mx-auto max-w-xl px-5 text-center">
          <h2 className="text-2xl font-bold md:text-3xl">Siap Bikin Website Anda?</h2>
          <p className="mt-3 text-gray-500">Isi form di bawah, kami akan menghubungi Anda dalam 24 jam.</p>

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
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Pesan</label>
                  <Textarea name="deskripsi" placeholder="Ceritakan kebutuhan website Anda..." required rows={4} className="rounded-lg" />
                </div>
                <Button type="submit" disabled={submitting} className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-full py-5 gap-2">
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
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-600 text-white text-xs font-bold">AD</div>
              <span className="text-sm font-semibold">AkademiDigital</span>
            </div>
            <p className="mt-1 text-xs text-gray-400">Website modern dengan Google Sheets backend.</p>
          </div>
          <p className="text-xs text-gray-400">© {new Date().getFullYear()} AkademiDigital. All rights reserved.</p>
        </div>
      </footer>

      <Toaster richColors position="top-center" />
    </div>
  )
}
