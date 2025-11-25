import { NextResponse } from 'next/server';

interface RouteContext {
  params: Promise<{ id: string }>;
}

// TODO: 실제 데이터베이스 연결 필요
export async function PUT(
  request: Request,
  context: RouteContext
) {
  try {
    const params = await context.params;
    const { id } = params;
    const body = await request.json();
    
    // 상태 검증
    const validStatuses = ['승인', '대기', '거절', '완료'];
    if (!body.상태 || !validStatuses.includes(body.상태)) {
      return NextResponse.json(
        { error: '유효하지 않은 상태입니다.' },
        { status: 400 }
      );
    }

    // TODO: 데이터베이스에서 업데이트
    const updatedConsult = {
      id: parseInt(id),
      상태: body.상태,
      수정일시: new Date().toISOString(),
    };

    console.log('상담 상태 변경:', updatedConsult);

    return NextResponse.json({
      success: true,
      data: updatedConsult
    });

  } catch (error) {
    console.error('상담 상태 변경 에러:', error);
    return NextResponse.json(
      { error: '상담 상태 변경 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}