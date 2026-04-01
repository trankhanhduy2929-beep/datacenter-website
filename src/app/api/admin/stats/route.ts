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
    const decoded = verifyToken(token);
    
    if (!decoded || decoded.role !== 'admin') {
      return NextResponse.json({ error: 'Không có quyền truy cập' }, { status: 403 });
    }

    // Get stats
    const usersCount = db.prepare('SELECT COUNT(*) as count FROM users').get() as any;
    const filesCount = db.prepare('SELECT COUNT(*) as count FROM data_files').get() as any;
    
    // Calculate storage (sum of file sizes)
    const storage = db.prepare('SELECT COALESCE(SUM(size), 0) as total FROM data_files').get() as any;

    return NextResponse.json({
      users: usersCount.count,
      files: filesCount.count,
      storage: Math.round(storage.total / 1024 / 1024) // Convert to MB
    });
  } catch (error) {
    console.error('Admin stats error:', error);
    return NextResponse.json({ error: 'Lỗi hệ thống' }, { status: 500 });
  }
}
