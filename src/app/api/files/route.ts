import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export async function GET(req: NextRequest) {
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

    const files = db.prepare(`
      SELECT id, filename, filepath, size, uploaded_at 
      FROM data_files 
      WHERE user_id = ? 
      ORDER BY uploaded_at DESC
    `).all(decoded.id) as any[];

    return NextResponse.json(files);
  } catch (error) {
    console.error('Get files error:', error);
    return NextResponse.json({ error: 'Lỗi hệ thống' }, { status: 500 });
  }
}
