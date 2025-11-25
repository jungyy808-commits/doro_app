import { NextResponse } from 'next/server';

// TODO: 실제 데이터베이스 연결 필요
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // 필수 필드 검증
    const requiredFields = ['상담강사', '상담형태', '상담일자', '신청유형', '상담신청내용'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `${field}는 필수 항목입니다.` },
          { status: 400 }
        );
      }
    }

    // TODO: 데이터베이스에 저장
    const newConsult = {
      id: Date.now(), // 임시 ID
      ...body,
      상태: '대기',
      생성일시: new Date().toISOString(),
    };

    console.log('새로운 상담 신청:', newConsult);

    return NextResponse.json({
      success: true,
      data: newConsult
    }, { status: 201 });

  } catch (error) {
    console.error('상담 신청 에러:', error);
    return NextResponse.json(
      { error: '상담 신청 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}