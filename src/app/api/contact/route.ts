import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nama, email, wa, deskripsi } = body;

    if (!nama || !email || !wa || !deskripsi) {
      return NextResponse.json(
        { error: 'Semua field wajib diisi' },
        { status: 400 }
      );
    }

    // Kirim data ke Google Apps Script
    const scriptUrl = process.env.GOOGLE_SCRIPT_URL;

    if (scriptUrl) {
      try {
        const response = await fetch(scriptUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nama, email, wa, deskripsi }),
        });
        const result = await response.json();
        console.log('Google Sheets response:', result);
      } catch (sheetError) {
        console.error('Google Sheets error:', sheetError);
        // Tetap sukses walaupun Google Sheets gagal
        // (jangan blok user karena error backend)
      }
    }

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
