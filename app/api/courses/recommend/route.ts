import { NextResponse } from 'next/server';

const mockRecommendations = [
  { id: 1, 과목명: '국문 A', 교수명: '김교수', 강의시간: '월3,4', 강의실: '101호', 학점: 3 },
  { id: 5, 과목명: '수학 A', 교수명: '정교수', 강의시간: '금3,4', 강의실: '201호', 학점: 3 },
];

export async function GET() {
  return NextResponse.json(mockRecommendations);
}