import { NextResponse } from 'next/server';

export async function GET() {
  return new NextResponse('Gone', { status: 410 });
}
