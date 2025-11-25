import { NextResponse } from 'next/server';

interface RouteContext {
  params: Promise<{ id: string }>;
}

// 희망과목 등록
export async function POST(
  request: Request,
  context: RouteContext
) {
  try {
    const params = await context.params;
    const { id } = params;
    
    // TODO: 데이터베이스에 저장
    console.log('희망과목 추가:', id);
    
    return NextResponse.json({ 
      success: true,
      message: '희망과목에 추가되었습니다.' 
    });
  } catch (error) {
    return NextResponse.json(
      { error: '희망과목 추가 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// 희망과목 삭제
export async function DELETE(
  request: Request,
  context: RouteContext
) {
  try {
    const params = await context.params;
    const { id } = params;
    
    // TODO: 데이터베이스에서 삭제
    console.log('희망과목 삭제:', id);
    
    return NextResponse.json({ 
      success: true,
      message: '희망과목에서 삭제되었습니다.' 
    });
  } catch (error) {
    return NextResponse.json(
      { error: '희망과목 삭제 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}