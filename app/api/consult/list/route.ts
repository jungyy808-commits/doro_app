import { NextResponse } from 'next/server';

// TODO: 실제 데이터베이스 연결 필요
// 임시 데이터
const mockConsults = [
  {
    id: 1,
    상담유형: '진로',
    상담형식: '대면상담',
    상담강사: '김OO',
    상태: '승인',
    상담일시: '2025-10-20(월) 09:00-10:00',
    실패: '상담완료',
    비고: ''
  },
  {
    id: 2,
    상담유형: '학습',
    상담형식: '비대면상담',
    상담강사: '박OO',
    상태: '대기',
    상담일시: '2025-08-06(화) 09:00-10:00',
    실패: '상담예정',
    비고: ''
  }
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const 상담유형 = searchParams.get('상담유형');
    const 상담형식 = searchParams.get('상담형식');
    const 상담강사 = searchParams.get('상담강사');
    const 상태 = searchParams.get('상태');

    let filteredConsults = [...mockConsults];

    if (상담유형) {
      filteredConsults = filteredConsults.filter(c => c.상담유형 === 상담유형);
    }
    if (상담형식) {
      filteredConsults = filteredConsults.filter(c => c.상담형식 === 상담형식);
    }
    if (상담강사) {
      filteredConsults = filteredConsults.filter(c => c.상담강사 === 상담강사);
    }
    if (상태) {
      filteredConsults = filteredConsults.filter(c => c.상태 === 상태);
    }

    return NextResponse.json(filteredConsults);

  } catch (error) {
    console.error('상담 내역 조회 에러:', error);
    return NextResponse.json(
      { error: '상담 내역 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}