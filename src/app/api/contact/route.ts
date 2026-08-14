import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nama, email, deskripsi } = body;

    if (!nama || !email || !deskripsi) {
      return NextResponse.json(
        { error: 'Semua field wajib diisi' },
        { status: 400 }
      );
    }

    // In production, this would send an email or save to database
    return NextResponse.json(
      { message: 'Pesan Anda berhasil dikirim! Kami akan segera menghubungi Anda.' },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    );
  }
}