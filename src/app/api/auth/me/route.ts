import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import db from '@/lib/db';

export async function GET(req: NextRequest) {
  const token = req.headers.get('authorization')?.replace('Bearer ', '');

  if (!token) {
    return NextResponse.json({ error: 'Không có token' }, { status: 401 });
  }

  const user = verifyToken(token);
  if (!user) {
    return NextResponse.json({ error: 'Token không hợp lệ' }, { status: 401 });
  }

  const userData = db.prepare('SELECT id, username, email, role, created_at FROM users WHERE id = ?').get(user.id);

  return NextResponse.json({ user: userData });
}
