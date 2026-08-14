import { NextRequest, NextResponse } from 'next/server';

interface Registration {
  id: string;
  nama: string;
  email: string;
  noHp: string;
  kategori: string;
  createdAt: string;
}

// In-memory mock database
const registrations: Registration[] = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nama, email, noHp, kategori } = body;

    if (!nama || !email || !noHp || !kategori) {
      return NextResponse.json(
        { error: 'Semua field wajib diisi' },
        { status: 400 }
      );
    }

    const registration: Registration = {
      id: crypto.randomUUID(),
      nama: nama.trim(),
      email: email.trim(),
      noHp: noHp.trim(),
      kategori,
      createdAt: new Date().toISOString(),
    };

    registrations.push(registration);

    return NextResponse.json(
      { message: 'Pendaftaran berhasil!', data: registration },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ data: registrations });
}