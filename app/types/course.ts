// 수강신청 관련 타입 정의

export interface Course {
  id: number;
  과목명: string;
  교수명: string;
  강의시간: string;
  강의실: string;
  학점: number;
  수강인원: number;
  최대인원: number;
}

export interface EnrolledCourse {
  id: number;
  과목명: string;
  교수명: string;
  강의시간: string;
  강의실: string;
  학점: number;
}

export interface WishlistCourse {
  id: number;
  과목명: string;
  교수명: string;
  강의시간: string;
  강의실: string;
  학점: number;
}

export interface RecommendedCourse {
  id: number;
  과목명: string;
  교수명: string;
  강의시간: string;
  강의실: string;
  학점: number;
  추천이유?: string;
}

export interface CourseNotice {
  id: number;
  제목: string;
  내용: string;
  작성일: string;
}