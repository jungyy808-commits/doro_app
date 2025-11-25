import { NextResponse } from 'next/server';

const mockWishlist = [
  { id: 2, 과목명: '국문 B', 교수명: '이교수', 강의시간: '화1,2', 강의실: '102호', 학점: 3 },
  { id: 6, 과목명: '영문 A', 교수명: '강교수', 강의시간: '월1,2', 강의실: '202호', 학점: 3 },
];

export async function GET() {
  return NextResponse.json(mockWishlist);
}