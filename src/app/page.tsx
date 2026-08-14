'use client'

import { useState, useEffect, useCallback, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import {
  Menu,
  ArrowRight,
  Check,
  Copy,
  CheckCheck,
  Users,
  ClipboardCheck,
  Calculator,
  List,
  CalendarClock,
  HelpCircle,
  Code2,
  Globe,
  Send,
  MessageCircle,
  ChevronRight,
  Sparkles,
  Star,
  Zap,
  Shield,
  Rocket,
  LayoutGrid,
  Database,
  Server,
  Smartphone,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
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
import { Badge } from '@/components/ui/badge'
import { Toaster, toast } from 'sonner'

// ─── Animation Variants ─────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' },
  }),
}

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
}

// ─── Data ────────────────────────────────────────────────────
const navLinks = [
  { label: 'Layanan', href: '#layanan' },
  { label: 'Demo', href: '#demo' },
  { label: 'Tutorial', href: '#tutorial' },
  { label: 'Harga', href: '#harga' },
  { label: 'Deploy', href: '#deploy' },
  { label: 'Kontak', href: '#kontak' },
]

const services = [
  {
    icon: Users,
    title: 'Sistem Pendaftaran Online',
    desc: 'Form pendaftaran yang terhubung langsung ke Google Sheets. Cocok untuk pendaftaran event, workshop, atau organisasi.',
    price: 'Rp 250.000',
  },
  {
    icon: ClipboardCheck,
    title: 'Dashboard Absensi',
    desc: 'Sistem absensi digital dengan laporan otomatis. Data tersimpan rapi di spreadsheet dan bisa diakses kapan saja.',
    price: 'Rp 350.000',
  },
  {
    icon: Calculator,
    title: 'Kalkulator Keuangan',
    desc: 'Kalkulator interaktif untuk simulasi tabungan, kredit, atau keuangan pribadi dengan grafik dan ringkasan.',
    price: 'Rp 300.000',
  },
  {
    icon: List,
    title: 'Direktori / Listing',
    desc: 'Halaman direktori dengan pencarian dan filter. Data dikelola lewat Google Sheets, tampil profesional.',
    price: 'Rp 400.000',
  },
  {
    icon: CalendarClock,
    title: 'Sistem Booking / Jadwal',
    desc: 'Sistem reservasi atau penjadwalan online. Pengguna bisa cek ketersediaan dan booking langsung.',
    price: 'Rp 450.000',
  },
  {
    icon: HelpCircle,
    title: 'Kuis / Trivia Online',
    desc: 'Kuis interaktif dengan scoring otomatis. Hasil langsung tersimpan dan bisa ditampilkan sebagai leaderboard.',
    price: 'Rp 350.000',
  },
]

const pricingPlans = [
  {
    name: 'Basic',
    price: 'Rp 250.000',
    desc: 'Cocok untuk kebutuhan dasar',
    features: [
      'Form pendaftaran',
      'Data tersimpan ke Google Sheets',
      'Halaman cek status',
      'Desain responsif',
      '1x revisi',
    ],
    popular: false,
  },
  {
    name: 'Standard',
    price: 'Rp 450.000',
    desc: 'Paling populer untuk bisnis kecil',
    features: [
      'CRUD lengkap',
      'Email notifikasi otomatis',
      'Responsive design',
      'Dashboard admin sederhana',
      '3x revisi',
      'Dokumentasi penggunaan',
    ],
    popular: true,
  },
  {
    name: 'Premium',
    price: 'Rp 750.000',
    desc: 'Solusi lengkap untuk skala besar',
    features: [
      'Full system dengan login',
      'Custom branding',
      'Support 1 bulan',
      'Integrasi multi-sheet',
      'API lanjutan',
      'Unlimited revisi',
      'Optimasi performa',
    ],
    popular: false,
  },
]

const tutorials = [
  {
    title: 'Membaca Data dari Google Sheets',
    code: `function bacaData() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet();
  const data = sheet.getDataRange().getValues();
  
  // Konversi baris pertama menjadi header
  const headers = data[0];
  const rows = data.slice(1).map(row => {
    const obj = {};
    headers.forEach((h, i) => obj[h] = row[i]);
    return obj;
  });
  
  return ContentService
    .createTextOutput(JSON.stringify(rows))
    .setMimeType(ContentService.MimeType.JSON);
}

// Endpoint GET
function doGet() {
  return bacaData();
}`,
  },
  {
    title: 'Menulis Data ke Google Sheets',
    code: `function tulisData(data) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName('Data');
  
  // Ambil header dari baris pertama
  const headers = sheet.getRange(1, 1, 1, 
    sheet.getLastColumn()).getValues()[0];
  
  // Tambahkan baris baru
  const newRow = headers.map(h => data[h] || '');
  sheet.appendRow(newRow);
  
  return { status: 'success', message: 'Data tersimpan!' };
}

// Endpoint POST
function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const result = tulisData(data);
  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}`,
  },
  {
    title: 'Deploy sebagai Web App',
    code: `// Langkah-langkah deploy:
//
// 1. Buka Google Sheets > Extensions > Apps Script
// 2. Tulis kode doGet() dan doPost() Anda
// 3. Klik "Deploy" > "New deployment"
// 4. Pilih tipe "Web app"
// 5. Atur:
//    - Description: "API Pendaftaran"
//    - Execute as: "Me"
//    - Who has access: "Anyone"
// 6. Klik "Deploy"
// 7. Salin URL web app yang diberikan
//
// Contoh penggunaan di frontend:
const WEB_APP_URL = 'https://script.google.com/...';

async function kirimData(data) {
  const response = await fetch(WEB_APP_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify(data),
  });
  return await response.json();
}`,
  },
]

// ─── Types ───────────────────────────────────────────────────
interface Registration {
  id: string
  nama: string
  email: string
  noHp: string
  kategori: string
  createdAt: string
}

// ─── Architecture Diagram ────────────────────────────────────
function ArchitectureDiagram() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 mt-12">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="flex flex-col items-center gap-3"
      >
        <div className="w-32 h-24 sm:w-44 sm:h-32 rounded-2xl bg-emerald-50 border-2 border-emerald-400 flex flex-col items-center justify-center gap-2 shadow-md">
          <Smartphone className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-600" />
          <span className="text-sm sm:text-base font-bold text-emerald-700">Next.js</span>
          <span className="text-[10px] sm:text-xs text-emerald-500">Frontend + Vercel</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="flex items-center"
      >
        <ChevronRight className="w-7 h-7 text-muted-foreground rotate-90 sm:rotate-0 hidden sm:block" />
        <ArrowRight className="w-7 h-7 text-muted-foreground block sm:hidden" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="flex flex-col items-center gap-3"
      >
        <div className="w-32 h-24 sm:w-44 sm:h-32 rounded-2xl bg-orange-50 border-2 border-orange-300 flex flex-col items-center justify-center gap-2 shadow-md">
          <Code2 className="w-8 h-8 sm:w-10 sm:h-10 text-orange-600" />
          <span className="text-sm sm:text-base font-bold text-orange-700">Apps Script</span>
          <span className="text-[10px] sm:text-xs text-orange-500">API / Backend</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="flex items-center"
      >
        <ChevronRight className="w-7 h-7 text-muted-foreground rotate-90 sm:rotate-0 hidden sm:block" />
        <ArrowRight className="w-7 h-7 text-muted-foreground block sm:hidden" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="flex flex-col items-center gap-3"
      >
        <div className="w-32 h-24 sm:w-44 sm:h-32 rounded-2xl bg-green-50 border-2 border-green-400 flex flex-col items-center justify-center gap-2 shadow-md">
          <Database className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" />
          <span className="text-sm sm:text-base font-bold text-green-700">Google Sheets</span>
          <span className="text-[10px] sm:text-xs text-green-500">Database</span>
        </div>
      </motion.div>
    </div>
  )
}

// ─── Stats Section ──────────────────────────────────────────
const stats = [
  { label: 'Proyek Selesai', value: '50+' },
  { label: 'Klien Puas', value: '40+' },
  { label: 'Uptime 99.9%', value: '99.9%' },
  { label: 'Support 24/7', value: '24/7' },
]

// ─── Copy Button for Code ────────────────────────────────────
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleCopy}
      className="h-10 w-10 absolute top-3 right-3 text-white/70 hover:text-white hover:bg-white/10"
    >
      {copied ? <CheckCheck className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
    </Button>
  )
}

// ─── Main Page ───────────────────────────────────────────────
export default function Home() {
  // Demo form state
  const [regNama, setRegNama] = useState('')
  const [regEmail, setRegEmail] = useState('')
  const [regNoHp, setRegNoHp] = useState('')
  const [regKategori, setRegKategori] = useState('')
  const [regLoading, setRegLoading] = useState(false)
  const [registrations, setRegistrations] = useState<Registration[]>([])

  // Contact form state
  const [contactNama, setContactNama] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactDesc, setContactDesc] = useState('')
  const [contactLoading, setContactLoading] = useState(false)

  const fetchRegistrations = useCallback(async () => {
    try {
      const res = await fetch('/api/register')
      const json = await res.json()
      setRegistrations(json.data || [])
    } catch {
      // silent fail
    }
  }, [])

  useEffect(() => {
    fetchRegistrations()
  }, [fetchRegistrations])

  const handleRegSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!regNama || !regEmail || !regNoHp || !regKategori) {
      toast.error('Semua field wajib diisi')
      return
    }
    setRegLoading(true)
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nama: regNama,
          email: regEmail,
          noHp: regNoHp,
          kategori: regKategori,
        }),
      })
      const json = await res.json()
      if (res.ok) {
        toast.success('Pendaftaran berhasil!')
        setRegNama('')
        setRegEmail('')
        setRegNoHp('')
        setRegKategori('')
        fetchRegistrations()
      } else {
        toast.error(json.error || 'Terjadi kesalahan')
      }
    } catch {
      toast.error('Gagal menghubungi server')
    } finally {
      setRegLoading(false)
    }
  }

  const handleContactSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!contactNama || !contactEmail || !contactDesc) {
      toast.error('Semua field wajib diisi')
      return
    }
    setContactLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nama: contactNama,
          email: contactEmail,
          deskripsi: contactDesc,
        }),
      })
      const json = await res.json()
      if (res.ok) {
        toast.success(json.message)
        setContactNama('')
        setContactEmail('')
        setContactDesc('')
      } else {
        toast.error(json.error || 'Terjadi kesalahan')
      }
    } catch {
      toast.error('Gagal menghubungi server')
    } finally {
      setContactLoading(false)
    }
  }

  const scrollTo = (href: string) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Toaster richColors position="top-center" />

      {/* ── Navigation Bar ────────────────────────────── */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="mx-auto max-w-[90rem] flex h-20 items-center justify-between px-6 sm:px-10">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-2xl sm:text-3xl font-black tracking-tight text-primary hover:opacity-80 transition-opacity"
          >
            <span className="bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
              Akademi
            </span>
            <span className="text-primary">Digital</span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-lg font-semibold text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </button>
            ))}
            <Button
              size="lg"
              className="text-lg px-7 py-6 font-bold"
              onClick={() => scrollTo('#kontak')}
            >
              Pesan Sekarang
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </nav>

          {/* Mobile nav */}
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="w-12 h-12">
                <Menu className="h-7 w-7" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetTitle className="text-2xl font-black text-primary mb-6">
                AkademiDigital
              </SheetTitle>
              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => {
                      scrollTo(link.href)
                      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
                    }}
                    className="text-lg font-semibold text-muted-foreground hover:text-foreground transition-colors text-left py-3 border-b border-border/50"
                  >
                    {link.label}
                  </button>
                ))}
                <Button
                  size="lg"
                  className="mt-4 text-lg py-6 font-bold"
                  onClick={() => scrollTo('#kontak')}
                >
                  Pesan Sekarang
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main className="flex-1">
        {/* ── Hero Section ──────────────────────────────── */}
        <section className="relative overflow-hidden py-24 sm:py-36 px-6 sm:px-10">
          {/* Background decoration */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[700px] bg-gradient-to-b from-emerald-100/50 via-emerald-50/20 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-green-100/30 to-transparent rounded-full blur-3xl" />
            <div className="absolute top-20 left-0 w-[300px] h-[300px] bg-gradient-to-br from-emerald-50/40 to-transparent rounded-full blur-3xl" />
          </div>

          <div className="mx-auto max-w-6xl text-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="flex flex-col items-center"
            >
              <motion.div variants={fadeUp} custom={0}>
                <Badge variant="secondary" className="mb-8 px-6 py-2.5 text-base font-bold tracking-wide">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Solusi Web Hemat Biaya — Next.js + Vercel
                </Badge>
              </motion.div>
              <motion.h1
                variants={fadeUp}
                custom={1}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black tracking-tighter text-foreground leading-[1.05]"
              >
                Bangun Aplikasi Web{' '}
                <span className="bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
                  Tanpa Server Mahal
                </span>
              </motion.h1>
              <motion.p
                variants={fadeUp}
                custom={2}
                className="mt-8 sm:mt-10 text-xl sm:text-2xl md:text-[1.6rem] text-muted-foreground max-w-4xl leading-relaxed font-medium"
              >
                Gunakan <strong className="text-foreground">Google Sheets</strong> sebagai database,{' '}
                <strong className="text-foreground">Google Apps Script</strong> sebagai API, dan deploy frontend dengan{' '}
                <strong className="text-foreground">Next.js + Vercel</strong>. Hemat biaya, cepat jadi, mudah dikelola.
              </motion.p>
              <motion.div
                variants={fadeUp}
                custom={3}
                className="mt-12 flex flex-col sm:flex-row gap-5 sm:gap-6"
              >
                <Button
                  size="lg"
                  className="w-full sm:w-auto text-xl px-10 py-8 font-bold shadow-lg shadow-emerald-600/20 hover:shadow-xl hover:shadow-emerald-600/30"
                  onClick={() => scrollTo('#demo')}
                >
                  <Zap className="mr-2 h-6 w-6" />
                  Lihat Demo
                  <ArrowRight className="ml-2 h-6 w-6" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto text-xl px-10 py-8 font-bold"
                  onClick={() => scrollTo('#kontak')}
                >
                  Pesan Sekarang
                </Button>
              </motion.div>

              {/* Architecture diagram */}
              <motion.div variants={fadeUp} custom={4} className="w-full">
                <ArchitectureDiagram />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── Stats Section ─────────────────────────────── */}
        <section className="py-16 sm:py-20 px-6 sm:px-10 bg-muted/50 border-y">
          <div className="mx-auto max-w-6xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={stagger}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  variants={fadeUp}
                  custom={i}
                  className="text-center"
                >
                  <div className="text-4xl sm:text-5xl font-black text-emerald-600">{stat.value}</div>
                  <div className="mt-2 text-lg sm:text-xl font-semibold text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Cara Kerja Section ───────────────────────── */}
        <section id="layanan" className="py-24 sm:py-32 px-6 sm:px-10">
          <div className="mx-auto max-w-6xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={stagger}
              className="text-center mb-16 sm:mb-20"
            >
              <motion.h2
                variants={fadeUp}
                custom={0}
                className="text-4xl sm:text-5xl font-black tracking-tight"
              >
                Cara Kerja
              </motion.h2>
              <motion.p
                variants={fadeUp}
                custom={1}
                className="mt-4 text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto font-medium"
              >
                Tiga langkah sederhana untuk membangun aplikasi web Anda
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={stagger}
              className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12"
            >
              {[
                {
                  step: 1,
                  icon: Database,
                  title: 'Buat Google Sheet',
                  desc: 'Data disimpan di spreadsheet. Buat kolom sesuai kebutuhan Anda, lalu biarkan Apps Script mengurus sisanya.',
                },
                {
                  step: 2,
                  icon: Code2,
                  title: 'Setup Apps Script',
                  desc: 'API penghubung otomatis yang menghubungkan frontend dengan Google Sheets. Tinggal deploy, langsung jalan.',
                },
                {
                  step: 3,
                  icon: Rocket,
                  title: 'Deploy ke Vercel',
                  desc: 'Frontend Next.js siap pakai, deploy gratis ke Vercel. Responsif, cepat, dan profesional.',
                },
              ].map((item) => (
                <motion.div
                  key={item.step}
                  variants={fadeUp}
                  custom={item.step}
                  className="relative flex flex-col items-center text-center"
                >
                  {/* Step number and connecting line (desktop) */}
                  <div className="hidden md:block absolute top-12 left-1/2 -translate-x-1/2">
                    {item.step < 3 && (
                      <div className="w-[calc(100%+2.5rem)] h-px bg-primary/20 absolute top-1/2 left-1/2 -translate-y-1/2" />
                    )}
                  </div>
                  <div className="relative z-10 w-24 h-24 rounded-3xl bg-primary/10 flex items-center justify-center mb-6 border border-primary/20 shadow-sm">
                    <item.icon className="w-12 h-12 text-primary" />
                  </div>
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-emerald-600 text-white text-lg font-black mb-4 shadow-md">
                    {item.step}
                  </span>
                  <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed max-w-sm">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Layanan (Services) Section ────────────────── */}
        <section className="py-24 sm:py-32 px-6 sm:px-10 bg-muted/40">
          <div className="mx-auto max-w-[80rem]">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={stagger}
              className="text-center mb-16 sm:mb-20"
            >
              <motion.h2
                variants={fadeUp}
                custom={0}
                className="text-4xl sm:text-5xl font-black tracking-tight"
              >
                Layanan Kami
              </motion.h2>
              <motion.p
                variants={fadeUp}
                custom={1}
                className="mt-4 text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto font-medium"
              >
                Berbagai solusi aplikasi web berbasis Google Sheets + Next.js
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={stagger}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {services.map((svc, i) => (
                <motion.div key={svc.title} variants={fadeUp} custom={i}>
                  <Card className="h-full hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group p-2">
                    <CardHeader>
                      <div className="w-18 h-18 rounded-2xl bg-emerald-50 flex items-center justify-center mb-4 group-hover:bg-emerald-100 transition-colors p-4">
                        <svc.icon className="w-10 h-10 text-emerald-600" />
                      </div>
                      <CardTitle className="text-2xl font-bold">{svc.title}</CardTitle>
                      <CardDescription className="text-lg leading-relaxed">
                        {svc.desc}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="flex items-center justify-between mt-auto pt-4">
                      <span className="text-lg font-bold text-emerald-600">Mulai {svc.price}</span>
                      <Button variant="ghost" size="lg" className="text-emerald-600 font-semibold" onClick={() => scrollTo('#kontak')}>
                        Pesan <ArrowRight className="ml-1 h-5 w-5" />
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Demo Section ─────────────────────────────── */}
        <section id="demo" className="py-24 sm:py-32 px-6 sm:px-10">
          <div className="mx-auto max-w-6xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={stagger}
              className="text-center mb-16"
            >
              <motion.h2
                variants={fadeUp}
                custom={0}
                className="text-4xl sm:text-5xl font-black tracking-tight"
              >
                Coba Demo Langsung
              </motion.h2>
              <motion.p
                variants={fadeUp}
                custom={1}
                className="mt-4 text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto font-medium"
              >
                Isi form di bawah dan lihat bagaimana data langsung tersimpan dan ditampilkan — seperti konsep Google Sheets + Frontend
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={stagger}
              className="grid grid-cols-1 lg:grid-cols-2 gap-10"
            >
              {/* Registration Form */}
              <motion.div variants={fadeUp} custom={0}>
                <Card className="p-2">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold">Form Pendaftaran</CardTitle>
                    <CardDescription className="text-lg">Data akan tersimpan ke mock database</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleRegSubmit} className="space-y-5">
                      <div className="space-y-2.5">
                        <Label htmlFor="reg-nama" className="text-lg font-semibold">Nama</Label>
                        <Input
                          id="reg-nama"
                          placeholder="Masukkan nama lengkap"
                          value={regNama}
                          onChange={(e) => setRegNama(e.target.value)}
                          className="h-14 text-lg"
                        />
                      </div>
                      <div className="space-y-2.5">
                        <Label htmlFor="reg-email" className="text-lg font-semibold">Email</Label>
                        <Input
                          id="reg-email"
                          type="email"
                          placeholder="contoh@email.com"
                          value={regEmail}
                          onChange={(e) => setRegEmail(e.target.value)}
                          className="h-14 text-lg"
                        />
                      </div>
                      <div className="space-y-2.5">
                        <Label htmlFor="reg-hp" className="text-lg font-semibold">No HP</Label>
                        <Input
                          id="reg-hp"
                          type="tel"
                          placeholder="08xxxxxxxxxx"
                          value={regNoHp}
                          onChange={(e) => setRegNoHp(e.target.value)}
                          className="h-14 text-lg"
                        />
                      </div>
                      <div className="space-y-2.5">
                        <Label htmlFor="reg-kategori" className="text-lg font-semibold">Kategori</Label>
                        <Select value={regKategori} onValueChange={setRegKategori}>
                          <SelectTrigger id="reg-kategori" className="w-full h-14 text-lg">
                            <SelectValue placeholder="Pilih kategori" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Pelajar">Pelajar</SelectItem>
                            <SelectItem value="Guru">Guru</SelectItem>
                            <SelectItem value="Lainnya">Lainnya</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button type="submit" className="w-full text-lg py-7 font-bold" disabled={regLoading}>
                        {regLoading ? 'Mengirim...' : 'Daftar Sekarang'}
                        {!regLoading && <Send className="ml-2 h-6 w-6" />}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Data Table */}
              <motion.div variants={fadeUp} custom={1}>
                <Card className="p-2">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold">Data Pendaftar</CardTitle>
                    <CardDescription className="text-lg">{registrations.length} data terdaftar</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {registrations.length === 0 ? (
                      <div className="text-center py-16 text-muted-foreground">
                        <LayoutGrid className="w-16 h-16 mx-auto mb-4 text-muted-foreground/40" />
                        <p className="text-xl font-semibold">Belum ada data</p>
                        <p className="text-lg mt-1">Isi form di samping untuk mencoba!</p>
                      </div>
                    ) : (
                      <div className="max-h-[28rem] overflow-y-auto rounded-lg border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-[50px] text-base font-bold">#</TableHead>
                              <TableHead className="text-base font-bold">Nama</TableHead>
                              <TableHead className="hidden sm:table-cell text-base font-bold">Email</TableHead>
                              <TableHead className="hidden md:table-cell text-base font-bold">No HP</TableHead>
                              <TableHead className="text-base font-bold">Kategori</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {registrations.map((r, i) => (
                              <TableRow key={r.id}>
                                <TableCell className="font-mono text-sm text-muted-foreground">{i + 1}</TableCell>
                                <TableCell className="font-semibold text-base">{r.nama}</TableCell>
                                <TableCell className="hidden sm:table-cell text-muted-foreground text-base">{r.email}</TableCell>
                                <TableCell className="hidden md:table-cell text-muted-foreground text-base">{r.noHp}</TableCell>
                                <TableCell>
                                  <Badge variant="secondary" className="text-sm font-semibold px-3 py-1">{r.kategori}</Badge>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── Harga (Pricing) Section ───────────────────── */}
        <section id="harga" className="py-24 sm:py-32 px-6 sm:px-10 bg-muted/40">
          <div className="mx-auto max-w-6xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={stagger}
              className="text-center mb-16 sm:mb-20"
            >
              <motion.h2
                variants={fadeUp}
                custom={0}
                className="text-4xl sm:text-5xl font-black tracking-tight"
              >
                Paket Harga
              </motion.h2>
              <motion.p
                variants={fadeUp}
                custom={1}
                className="mt-4 text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto font-medium"
              >
                Pilih paket yang sesuai dengan kebutuhan Anda
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={stagger}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 items-start"
            >
              {pricingPlans.map((plan, i) => (
                <motion.div key={plan.name} variants={fadeUp} custom={i}>
                  <Card
                    className={`relative h-full flex flex-col p-2 ${
                      plan.popular
                        ? 'border-emerald-500 border-2 shadow-xl scale-[1.03]'
                        : 'hover:shadow-lg'
                    } transition-all duration-300`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                        <Badge className="bg-emerald-600 text-white px-4 py-1.5 text-sm font-bold shadow-md">
                          <Star className="w-4 h-4 mr-1.5" /> Paling Populer
                        </Badge>
                      </div>
                    )}
                    <CardHeader className="text-center pt-10 sm:pt-12">
                      <CardTitle className="text-3xl font-black">{plan.name}</CardTitle>
                      <CardDescription className="text-lg mt-1">{plan.desc}</CardDescription>
                      <div className="mt-6">
                        <span className="text-5xl font-black text-emerald-600">{plan.price}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <ul className="space-y-5 mt-2">
                        {plan.features.map((f) => (
                          <li key={f} className="flex items-start gap-3 text-lg">
                            <Check className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter className="mt-auto pt-6">
                      <Button
                        className={`w-full text-lg py-7 font-bold ${plan.popular ? 'bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-600/25' : ''}`}
                        variant={plan.popular ? 'default' : 'outline'}
                        onClick={() => scrollTo('#kontak')}
                      >
                        Pesan Sekarang
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Features / Benefits Section ───────────────── */}
        <section className="py-24 sm:py-32 px-6 sm:px-10">
          <div className="mx-auto max-w-6xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={stagger}
              className="text-center mb-16 sm:mb-20"
            >
              <motion.h2
                variants={fadeUp}
                custom={0}
                className="text-4xl sm:text-5xl font-black tracking-tight"
              >
                Kenapa Pilih Kami?
              </motion.h2>
              <motion.p
                variants={fadeUp}
                custom={1}
                className="mt-4 text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto font-medium"
              >
                Keunggulan yang tidak akan Anda dapatkan di tempat lain
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={stagger}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {[
                {
                  icon: Zap,
                  title: 'Cepat Jadi',
                  desc: 'Deploy dalam hitungan menit. Tidak perlu setup server yang rumit.',
                },
                {
                  icon: Shield,
                  title: 'Aman & Stabil',
                  desc: 'Google Sheets dan Vercel menjamin keamanan dan uptime data Anda.',
                },
                {
                  icon: Server,
                  title: 'Tanpa Server',
                  desc: 'Tidak perlu beli hosting VPS. Semua berjalan di cloud gratis.',
                },
                {
                  icon: Smartphone,
                  title: 'Responsif',
                  desc: 'Tampil sempurna di semua perangkat — desktop, tablet, dan mobile.',
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  custom={i}
                  className="text-center"
                >
                  <div className="w-20 h-20 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto mb-5 shadow-sm">
                    <item.icon className="w-10 h-10 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Tutorial Section ──────────────────────────── */}
        <section id="tutorial" className="py-24 sm:py-32 px-6 sm:px-10 bg-muted/40">
          <div className="mx-auto max-w-5xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={stagger}
              className="text-center mb-16"
            >
              <motion.h2
                variants={fadeUp}
                custom={0}
                className="text-4xl sm:text-5xl font-black tracking-tight"
              >
                Belajar Google Apps Script
              </motion.h2>
              <motion.p
                variants={fadeUp}
                custom={1}
                className="mt-4 text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto font-medium"
              >
                Pelajari dasar-dasar Google Apps Script untuk membangun aplikasi Anda sendiri
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={fadeUp}
              custom={0}
            >
              <Accordion type="single" collapsible className="w-full">
                {tutorials.map((tut, i) => (
                  <AccordionItem key={i} value={`tutorial-${i}`}>
                    <AccordionTrigger className="text-xl font-bold hover:no-underline py-6">
                      {tut.title}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="relative">
                        <CopyButton text={tut.code} />
                        <SyntaxHighlighter
                          language="javascript"
                          style={oneDark}
                          customStyle={{
                            borderRadius: '0.75rem',
                            fontSize: '1rem',
                            lineHeight: '1.8',
                            padding: '1.5rem',
                            margin: 0,
                          }}
                          wrapLongLines
                        >
                          {tut.code}
                        </SyntaxHighlighter>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </div>
        </section>

        {/* ── Panduan Deploy ke Vercel ─────────────────── */}
        <section id="deploy" className="py-24 sm:py-32 px-6 sm:px-10">
          <div className="mx-auto max-w-5xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={stagger}
              className="text-center mb-16 sm:mb-20"
            >
              <motion.h2
                variants={fadeUp}
                custom={0}
                className="text-4xl sm:text-5xl font-black tracking-tight"
              >
                Panduan Deploy ke Vercel
              </motion.h2>
              <motion.p
                variants={fadeUp}
                custom={1}
                className="mt-4 text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto font-medium"
              >
                Ikuti langkah-langkah berikut untuk deploy project Next.js Anda ke Vercel — gratis!
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={stagger}
              className="space-y-8"
            >
              {[
                {
                  step: 1,
                  title: 'Buat Akun GitHub',
                  desc: 'Buka github.com dan buat akun gratis. GitHub akan digunakan untuk menyimpan kode project Anda.',
                  detail: 'Jika sudah punya akun GitHub, lewati langkah ini.',
                },
                {
                  step: 2,
                  title: 'Push Kode ke GitHub',
                  desc: 'Upload semua kode project Next.js ke repository GitHub baru. Bisa lewat terminal atau GitHub Desktop.',
                  detail: 'Command: git init → git add . → git commit -m "initial" → git push',
                },
                {
                  step: 3,
                  title: 'Buat Akun Vercel',
                  desc: 'Buka vercel.com dan daftar gratis menggunakan akun GitHub yang sudah dibuat.',
                  detail: 'Login otomatis pakai GitHub, jadi tinggal klik "Continue with GitHub".',
                },
                {
                  step: 4,
                  title: 'Import Project di Vercel',
                  desc: 'Di dashboard Vercel, klik "Add New" → "Project" → pilih repository GitHub Anda → klik "Deploy".',
                  detail: 'Vercel otomatis mendeteksi Next.js. Tidak perlu setting apapun. Tunggu ± 1-2 menit.',
                },
                {
                  step: 5,
                  title: 'Selesai! Website Live',
                  desc: 'Vercel akan memberikan URL gratis seperti akademidigital.vercel.app. Custom domain juga bisa ditambahkan gratis.',
                  detail: 'Setiap kali Anda push ke GitHub, Vercel otomatis redeploy. Sangat mudah!',
                },
              ].map((item, i) => (
                <motion.div
                  key={item.step}
                  variants={fadeUp}
                  custom={i}
                >
                  <Card className="p-1">
                    <CardContent className="p-6 sm:p-8">
                      <div className="flex items-start gap-5 sm:gap-6">
                        <div className="shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-600/25">
                          <span className="text-2xl sm:text-3xl font-black text-white">{item.step}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl sm:text-2xl font-bold mb-2">{item.title}</h3>
                          <p className="text-lg text-muted-foreground leading-relaxed mb-3">{item.desc}</p>
                          <div className="flex items-start gap-2 px-4 py-3 rounded-lg bg-muted/60 border">
                            <CheckCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                            <p className="text-base text-muted-foreground">{item.detail}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* Quick command reference */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={fadeUp}
              custom={5}
              className="mt-12"
            >
              <Card className="border-emerald-200 bg-emerald-50/30 p-1">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Code2 className="w-7 h-7 text-emerald-600" />
                    <h3 className="text-xl font-bold">Quick Command Reference</h3>
                  </div>
                  <div className="relative">
                    <CopyButton text={`# 1. Inisialisasi git
git init
git add .
git commit -m "initial commit"

# 2. Buat repo di github.com, lalu:
git remote add origin https://github.com/USERNAME/NAMA-REPO.git
git branch -M main
git push -u origin main

# 3. Buka vercel.com → Import project → Deploy!
# Selesai! Website live di https://nama-repo.vercel.app`} />
                    <SyntaxHighlighter
                      language="bash"
                      style={oneDark}
                      customStyle={{
                        borderRadius: '0.75rem',
                        fontSize: '0.95rem',
                        lineHeight: '1.8',
                        padding: '1.5rem',
                        margin: 0,
                      }}
                      wrapLongLines
                    >
{`# 1. Inisialisasi git
git init
git add .
git commit -m "initial commit"

# 2. Buat repo di github.com, lalu:
git remote add origin https://github.com/USERNAME/NAMA-REPO.git
git branch -M main
git push -u origin main

# 3. Buka vercel.com → Import project → Deploy!
# Selesai! Website live di https://nama-repo.vercel.app`}
                    </SyntaxHighlighter>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* ── Contact Section ───────────────────────────── */}
        <section id="kontak" className="py-24 sm:py-32 px-6 sm:px-10">
          <div className="mx-auto max-w-3xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={stagger}
              className="text-center mb-16"
            >
              <motion.h2
                variants={fadeUp}
                custom={0}
                className="text-4xl sm:text-5xl font-black tracking-tight"
              >
                Siap Memulai Proyek?
              </motion.h2>
              <motion.p
                variants={fadeUp}
                custom={1}
                className="mt-4 text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto font-medium"
              >
                Hubungi kami dan jelaskan kebutuhan Anda. Kami akan merespons dalam 24 jam.
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={fadeUp}
              custom={0}
            >
              <Card className="p-2">
                <CardContent className="pt-10">
                  <form onSubmit={handleContactSubmit} className="space-y-6">
                    <div className="space-y-2.5">
                      <Label htmlFor="contact-nama" className="text-lg font-semibold">Nama</Label>
                      <Input
                        id="contact-nama"
                        placeholder="Nama Anda"
                        value={contactNama}
                        onChange={(e) => setContactNama(e.target.value)}
                        className="h-14 text-lg"
                      />
                    </div>
                    <div className="space-y-2.5">
                      <Label htmlFor="contact-email" className="text-lg font-semibold">Email</Label>
                      <Input
                        id="contact-email"
                        type="email"
                        placeholder="email@anda.com"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        className="h-14 text-lg"
                      />
                    </div>
                    <div className="space-y-2.5">
                      <Label htmlFor="contact-desc" className="text-lg font-semibold">Deskripsi Kebutuhan</Label>
                      <Textarea
                        id="contact-desc"
                        placeholder="Jelaskan aplikasi yang Anda inginkan..."
                        rows={5}
                        value={contactDesc}
                        onChange={(e) => setContactDesc(e.target.value)}
                        className="text-lg"
                      />
                    </div>
                    <Button type="submit" className="w-full text-lg py-7 font-bold" disabled={contactLoading}>
                      {contactLoading ? 'Mengirim...' : 'Kirim Pesan'}
                      {!contactLoading && <Send className="ml-2 h-6 w-6" />}
                    </Button>
                  </form>

                  {/* WhatsApp Contact */}
                  <div className="mt-12 pt-10 border-t">
                    <p className="text-xl text-muted-foreground mb-5 text-center font-medium">
                      Atau hubungi langsung via WhatsApp
                    </p>
                    <div className="flex justify-center">
                      <a
                        href="https://wa.me/6281234567890"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-10 py-5 rounded-xl bg-green-600 text-white font-bold text-xl hover:bg-green-700 transition-colors shadow-lg shadow-green-600/25"
                      >
                        <MessageCircle className="w-7 h-7" />
                        +62 812-3456-7890
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* ── CTA Section ──────────────────────────────── */}
        <section className="py-24 sm:py-32 px-6 sm:px-10 bg-gradient-to-b from-muted/50 to-background">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="mx-auto max-w-4xl text-center"
          >
            <motion.h2 variants={fadeUp} custom={0} className="text-4xl sm:text-5xl md:text-6xl font-black text-foreground mb-6">
              Siap Bangun Aplikasi Anda?
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-xl sm:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto font-medium">
              Mulai dari Rp 250.000 saja. Deploy gratis ke Vercel, database gratis pakai Google Sheets. Tanpa biaya server bulanan!
            </motion.p>
            <motion.div variants={fadeUp} custom={2} className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <Button
                size="lg"
                className="w-full sm:w-auto text-xl px-12 py-8 font-bold shadow-lg shadow-emerald-600/20"
                onClick={() => scrollTo('#kontak')}
              >
                <Zap className="mr-2 h-6 w-6" />
                Mulai Sekarang
                <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto text-xl px-12 py-8 font-bold"
                onClick={() => scrollTo('#harga')}
              >
                Lihat Harga
              </Button>
            </motion.div>
          </motion.div>
        </section>
      </main>

      {/* ── Footer ──────────────────────────────────────── */}
      <footer className="border-t py-12 px-6 sm:px-10 bg-background">
        <div className="mx-auto max-w-[90rem] flex flex-col sm:flex-row items-center justify-between gap-6 text-lg text-muted-foreground">
          <p>&copy; {new Date().getFullYear()}{' '}
            <span className="font-bold text-foreground">AkademiDigital</span>. Semua hak dilindungi.
          </p>
          <div className="flex items-center gap-5">
            <a
              href="https://akademipelajar.my.id"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors font-medium"
            >
              AkademiPelajar.my.id
            </a>
            <span className="text-border">|</span>
            <a
              href="https://tabungan.akademipelajar.my.id"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors font-medium"
            >
              Tabungan.AkademiPelajar.my.id
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
