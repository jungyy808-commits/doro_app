import { NextResponse } from 'next/server';

interface RouteContext {
  params: Promise<{ id: string }>;
}

// 수강신청
export async function POST(
  request: Request,
  context: RouteContext
) {
  try {
    const params = await context.params;
    const { id } = params;
    
    // TODO: 데이터베이스에 저장
    console.log('수강신청:', id);
    
    return NextResponse.json({ 
      success: true,
      message: '수강신청이 완료되었습니다.' 
    });
  } catch (error) {
    return NextResponse.json(
      { error: '수강신청 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// 수강신청 취소
export async function DELETE(
  request: Request,
  context: RouteContext
) {
  try {
    const params = await context.params;
    const { id } = params;
    
    // TODO: 데이터베이스에서 삭제
    console.log('수강취소:', id);
    
    return NextResponse.json({ 
      success: true,
      message: '수강신청이 취소되었습니다.' 
    });
  } catch (error) {
    return NextResponse.json(
      { error: '수강취소 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}