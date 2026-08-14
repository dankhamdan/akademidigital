// ============================================================
// GOOGLE APPS SCRIPT — Backend Form Kontak
// Tempel di: Google Sheets → Extensions → Apps Script
// ============================================================

// 1. SALIN semua kode ini ke Apps Script Editor
// 2. Klik "Deploy" → "New deployment"
// 3. Pilih type: "Web app"
// 4. Execute as: "Me"
// 5. Who has access: "Anyone"
// 6. Klik "Deploy"
// 7. COPY URL web app-nya (format: https://script.google.com/macros/s/xxx/exec)
// 8. Paste URL tersebut ke file .env.local di project Next.js:
//    GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/xxx/exec
// ============================================================

const SHEET_NAME = 'Kontak';

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

    // Buat sheet baru kalau belum ada
    if (!sheet) {
      const newSheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet(SHEET_NAME);
      // Set header
      newSheet.getRange(1, 1, 1, 6).setValues([
        'Timestamp', 'Nama', 'Email', 'No. WhatsApp', 'Produk Diminati', 'Status'
      ]);
      // Format header (bold, background)
      newSheet.getRange(1, 1, 1, 6)
        .setFontWeight('bold')
        .setBackground('#10b981')
        .setFontColor('#ffffff');
      // Auto resize kolom
      for (let i = 1; i <= 6; i++) {
        newSheet.autoResizeColumn(i);
      }
      return newSheet;
    }

    // Parse data dari request
    const data = JSON.parse(e.postData.contents);

    // Tambahkan baris baru
    sheet.appendRow([
      new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' }),
      data.nama || '',
      data.email || '',
      data.wa || '',
      data.deskripsi || '',
      'Baru'
    ]);

    // Auto resize kolom
    for (let i = 1; i <= 6; i++) {
      sheet.autoResizeColumn(i);
    }

    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Data berhasil disimpan ke Google Sheets!'
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Handler untuk GET request (opsional — untuk test)
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      success: true,
      message: 'API aktif! Kirim POST request untuk menyimpan data.'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ============================================================
// PANDUAN DEPLOY:
// ============================================================
//
// LANGKAH 1: Buat Google Sheet baru
//   - Buka https://sheets.google.com
//   - Buat spreadsheet baru
//   - Beri nama "Data Kontak ProdukDigital"
//
// LANGKAH 2: Buka Apps Script
//   - Klik menu "Extensions" → "Apps Script"
//   - Hapus kode default yang ada
//   - Paste semua kode di atas
//   - Klik tombol 💾 (Save)
//
// LANGKAH 3: Deploy sebagai Web App
//   - Klik "Deploy" → "New deployment"
//   - Klik ikon ⚙️ di sebelah "Select type"
//   - Pilih "Web app"
//   - Isi:
//     • Description: "API Kontak"
//     • Execute as: "Me" (email kamu)
//     • Who has access: "Anyone"
//   - Klik "Deploy"
//   - Izinkan akses (klik Advanced → Go to project)
//   - **COPY URL** yang muncul (format: https://script.google.com/macros/s/xxx/exec)
//
// LANGKAH 4: Tes API
//   - Buka URL tadi di browser
//   - Harusnya muncul: {"success":true,"message":"API aktif!..."}
//
// LANGKAH 5: Kirim URL ke saya
//   - URL tersebut akan dipasang di website sebagai backend API
//
// ============================================================
