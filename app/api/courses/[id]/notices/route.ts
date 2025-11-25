import { NextResponse } from 'next/server';

interface RouteContext {
  params: Promise<{ id: string }>;
}

// 강의별 공지 목록 조회
export async function GET(
  request: Request,
  context: RouteContext
) {
  const params = await context.params;
  const { id } = params;
  
  const mockNotices = [
    { id: 1, 제목: '첫 번째 공지', 내용: '공지 내용입니다.', 작성일: '2025-11-19' },
  ];
  
  return NextResponse.json(mockNotices);
}

// 강의별 공지 등록
export async function POST(
  request: Request,
  context: RouteContext
) {
  try {
    const params = await context.params;
    const { id } = params;
    const body = await request.json();
    
    // TODO: 데이터베이스에 저장
    console.log('공지 등록:', id, body);
    
    return NextResponse.json({ 
      success: true,
      message: '공지가 등록되었습니다.' 
    });
  } catch (error) {
    return NextResponse.json(
      { error: '공지 등록 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}