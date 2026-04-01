import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import { readFile } from 'fs/promises';
import { join } from 'path';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Không có quyền truy cập' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const decoded: any = verifyToken(token);
    
    if (!decoded) {
      return NextResponse.json({ error: 'Token không hợp lệ' }, { status: 401 });
    }

    const fileId = parseInt(params.id);
    const file = db.prepare(`
      SELECT id, filename, filepath, size FROM data_files 
      WHERE id = ? AND user_id = ?
    `).get(fileId, decoded.id) as any;

    if (!file) {
      return NextResponse.json({ error: 'File không tồn tại' }, { status: 404 });
    }

    const filePath = file.filepath;
    const data = await readFile(filePath);

    return new Response(data, {
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${file.filename}"`,
        'Content-Length': String(file.size),
      },
    });
  } catch (error) {
    console.error('Download file error:', error);
    return NextResponse.json({ error: 'Lỗi hệ thống' }, { status: 500 });
  }
}
