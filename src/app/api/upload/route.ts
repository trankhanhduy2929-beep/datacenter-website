import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export async function POST(req: NextRequest) {
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

    const formData = await req.formData();
    const file = formData.get('file') as File;
    const filename = formData.get('filename') as string;

    if (!file || !filename) {
      return NextResponse.json({ error: 'Thiếu file hoặc tên file' }, { status: 400 });
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create uploads directory if not exists
    const uploadDir = join(process.cwd(), 'uploads');
    await mkdir(uploadDir, { recursive: true });

    // Save file
    const filepath = join(uploadDir, `${Date.now()}-${filename}`);
    await writeFile(filepath, buffer);

    // Get file size
    const size = buffer.length;

    // Save to database
    const result = db.prepare('INSERT INTO data_files (user_id, filename, filepath, size) VALUES (?, ?, ?, ?)')
      .run(decoded.id, filename, filepath, size);

    return NextResponse.json({ 
      id: result.lastInsertRowid,
      filename,
      size,
      message: 'Upload thành công'
    }, { status: 201 });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Lỗi hệ thống' }, { status: 500 });
  }
}
