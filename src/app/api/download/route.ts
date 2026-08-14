import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const file = request.nextUrl.searchParams.get('file');

  const files: Record<string, { filename: string; path: string; type: string }> = {
    html: {
      filename: 'blogger-landing-page-v3.html',
      path: '/home/z/my-project/blogger-landing-page-v3.html',
      type: 'text/html',
    },
    script: {
      filename: 'google-apps-script-backend.js',
      path: '/home/z/my-project/google-apps-script-backend.js',
      type: 'text/javascript',
    },
  };

  const selected = files[file || 'html'];
  if (!selected) {
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }

  const fs = await import('fs');
  const content = fs.readFileSync(selected.path, 'utf-8');

  return new NextResponse(content, {
    headers: {
      'Content-Type': selected.type,
      'Content-Disposition': `attachment; filename="${selected.filename}"`,
    },
  });
}
