// 상담 관련 타입 정의

export interface Consult {
  id: number;
  상담유형: string;
  상담형식: string;
  상담강사: string;
  상태: '승인' | '대기' | '거절' | '완료';
  상담일시: string;
  실패: string;
  비고: string;
  생성일시?: string;
  수정일시?: string;
}

export interface ConsultRequest {
  상담강사: string;
  상담형태: '대면상담' | '비대면상담';
  상담일자: string;
  오전시간: string;
  오후시간: string;
  신청유형: string;
  상담신청내용: string;
  첨부파일?: File;
}

export interface ConsultFilter {
  상담유형?: string;
  상담형태?: string;
  상담강사?: string;
  상태?: string;
}