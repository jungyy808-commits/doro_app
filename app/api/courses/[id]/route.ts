import { NextResponse } from 'next/server';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(
  request: Request,
  context: RouteContext
) {
  const params = await context.params;
  const { id } = params;
  
  // TODO: 데이터베이스에서 조회
  const course = {
    id: parseInt(id),
    과목명: '국문 A',
    교수명: '김교수',
    강의시간: '월3,4',
    강의실: '101호',
    학점: 3,
    수강인원: 20,
    최대인원: 30
  };
  
  return NextResponse.json(course);
}