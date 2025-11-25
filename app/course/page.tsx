'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/app/components/Navbar';
import type { Course, EnrolledCourse, WishlistCourse, RecommendedCourse } from '@/app/types/course';

export default function CoursePage() {
  const [activeTab, setActiveTab] = useState<'강의추천' | '희망과목' | '수강신청' | '신청내역'>('수강신청');
  
  const [courses, setCourses] = useState<Course[]>([]);
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([]);
  const [wishlistCourses, setWishlistCourses] = useState<WishlistCourse[]>([]);
  const [recommendedCourses, setRecommendedCourses] = useState<RecommendedCourse[]>([]);
  
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    fetchCourses();
    fetchEnrolledCourses();
    fetchWishlist();
    fetchRecommendations();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch('/api/courses');
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error('Failed to fetch courses:', error);
    }
  };

  const fetchEnrolledCourses = async () => {
    try {
      const response = await fetch('/api/courses/enrolled');
      const data = await response.json();
      setEnrolledCourses(data);
    } catch (error) {
      console.error('Failed to fetch enrolled courses:', error);
    }
  };

  const fetchWishlist = async () => {
    try {
      const response = await fetch('/api/courses/wishlist');
      const data = await response.json();
      setWishlistCourses(data);
    } catch (error) {
      console.error('Failed to fetch wishlist:', error);
    }
  };

  const fetchRecommendations = async () => {
    try {
      const response = await fetch('/api/courses/recommend');
      const data = await response.json();
      setRecommendedCourses(data);
    } catch (error) {
      console.error('Failed to fetch recommendations:', error);
    }
  };

  const handleEnroll = async (courseId: number) => {
    try {
      const response = await fetch(`/api/courses/${courseId}/enroll`, {
        method: 'POST',
      });
      
      if (response.ok) {
        alert('수강신청이 완료되었습니다.');
        fetchCourses();
        fetchEnrolledCourses();
      } else {
        const data = await response.json();
        alert(data.error || '수강신청에 실패했습니다.');
      }
    } catch (error) {
      console.error('Failed to enroll:', error);
      alert('수강신청 중 오류가 발생했습니다.');
    }
  };

  const handleCancelEnrollment = async (courseId: number) => {
    if (!confirm('수강신청을 취소하시겠습니까?')) return;
    
    try {
      const response = await fetch(`/api/courses/${courseId}/enroll`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        alert('수강신청이 취소되었습니다.');
        fetchCourses();
        fetchEnrolledCourses();
      } else {
        alert('수강신청 취소에 실패했습니다.');
      }
    } catch (error) {
      console.error('Failed to cancel enrollment:', error);
      alert('수강신청 취소 중 오류가 발생했습니다.');
    }
  };

  const handleAddToWishlist = async (courseId: number) => {
    try {
      const response = await fetch(`/api/courses/${courseId}/wishlist`, {
        method: 'POST',
      });
      
      if (response.ok) {
        alert('희망과목에 추가되었습니다.');
        fetchWishlist();
      } else {
        alert('희망과목 추가에 실패했습니다.');
      }
    } catch (error) {
      console.error('Failed to add to wishlist:', error);
      alert('희망과목 추가 중 오류가 발생했습니다.');
    }
  };

  const handleRemoveFromWishlist = async (courseId: number) => {
    if (!confirm('희망과목에서 삭제하시겠습니까?')) return;
    
    try {
      const response = await fetch(`/api/courses/${courseId}/wishlist`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        alert('희망과목에서 삭제되었습니다.');
        fetchWishlist();
      } else {
        alert('희망과목 삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error('Failed to remove from wishlist:', error);
      alert('희망과목 삭제 중 오류가 발생했습니다.');
    }
  };

  const filteredCourses = courses.filter(course => 
    course.과목명.includes(searchKeyword) || course.교수명.includes(searchKeyword)
  );

  const totalCredits = enrolledCourses.reduce((sum, course) => sum + course.학점, 0);

  return (
    <>
      <Navbar />
      
      <div className="counsel-page">
        <div className="counsel-container" style={{maxWidth: '1200px'}}>
          <h1 className="counsel-title">수강신청</h1>

          <div className="counsel-tabs">
            <button 
              className={`counsel-tab ${activeTab === '강의추천' ? 'active' : ''}`}
              onClick={() => setActiveTab('강의추천')}
            >
              강의 추천
            </button>
            <button 
              className={`counsel-tab ${activeTab === '희망과목' ? 'active' : ''}`}
              onClick={() => setActiveTab('희망과목')}
            >
              희망과목
            </button>
            <button 
              className={`counsel-tab ${activeTab === '수강신청' ? 'active' : ''}`}
              onClick={() => setActiveTab('수강신청')}
            >
              수강신청
            </button>
            <button 
              className={`counsel-tab ${activeTab === '신청내역' ? 'active' : ''}`}
              onClick={() => setActiveTab('신청내역')}
            >
              신청내역 확인
            </button>
          </div>

          {activeTab === '강의추천' && (
            <div style={{marginTop: '20px'}}>
              <h3 style={{fontSize: '15px', fontWeight: '600', marginBottom: '10px'}}>• 추천 강의</h3>
              
              <div className="counsel-table-wrap">
                <table className="counsel-table">
                  <thead>
                    <tr>
                      <th style={{width: '60px'}}>번호</th>
                      <th>과목명</th>
                      <th style={{width: '100px'}}>교수명</th>
                      <th style={{width: '120px'}}>강의시간</th>
                      <th style={{width: '100px'}}>강의실</th>
                      <th style={{width: '60px'}}>학점</th>
                      <th style={{width: '100px'}}>신청</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recommendedCourses.length === 0 ? (
                      <tr>
                        <td colSpan={7} style={{padding: '40px', color: '#999'}}>
                          추천 강의가 없습니다.
                        </td>
                      </tr>
                    ) : (
                      recommendedCourses.map((course, index) => (
                        <tr key={course.id}>
                          <td>{index + 1}</td>
                          <td style={{textAlign: 'left', paddingLeft: '10px'}}>{course.과목명}</td>
                          <td>{course.교수명}</td>
                          <td>{course.강의시간}</td>
                          <td>{course.강의실}</td>
                          <td>{course.학점}</td>
                          <td>
                            <button 
                              className="btn"
                              style={{fontSize: '11px', padding: '4px 10px'}}
                              onClick={() => handleEnroll(course.id)}
                            >
                              신청
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === '희망과목' && (
            <div style={{marginTop: '20px'}}>
              <h3 style={{fontSize: '15px', fontWeight: '600', marginBottom: '10px'}}>• 희망과목 목록</h3>
              
              <div className="counsel-table-wrap">
                <table className="counsel-table">
                  <thead>
                    <tr>
                      <th style={{width: '60px'}}>번호</th>
                      <th>과목명</th>
                      <th style={{width: '100px'}}>교수명</th>
                      <th style={{width: '120px'}}>강의시간</th>
                      <th style={{width: '100px'}}>강의실</th>
                      <th style={{width: '60px'}}>학점</th>
                      <th style={{width: '80px'}}>신청</th>
                      <th style={{width: '80px'}}>삭제</th>
                    </tr>
                  </thead>
                  <tbody>
                    {wishlistCourses.length === 0 ? (
                      <tr>
                        <td colSpan={8} style={{padding: '40px', color: '#999'}}>
                          희망과목이 없습니다.
                        </td>
                      </tr>
                    ) : (
                      wishlistCourses.map((course, index) => (
                        <tr key={course.id}>
                          <td>{index + 1}</td>
                          <td style={{textAlign: 'left', paddingLeft: '10px'}}>{course.과목명}</td>
                          <td>{course.교수명}</td>
                          <td>{course.강의시간}</td>
                          <td>{course.강의실}</td>
                          <td>{course.학점}</td>
                          <td>
                            <button 
                              className="btn"
                              style={{fontSize: '11px', padding: '4px 10px'}}
                              onClick={() => handleEnroll(course.id)}
                            >
                              신청
                            </button>
                          </td>
                          <td>
                            <button 
                              className="btn btn-gray"
                              style={{fontSize: '11px', padding: '4px 10px'}}
                              onClick={() => handleRemoveFromWishlist(course.id)}
                            >
                              삭제
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === '수강신청' && (
            <div style={{marginTop: '20px'}}>
              <div style={{marginBottom: '15px', display: 'flex', gap: '10px'}}>
                <input
                  type="text"
                  className="c-input"
                  placeholder="과목명 또는 교수명 검색"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  style={{width: '300px'}}
                />
                <button className="btn">검색</button>
              </div>

              <div className="counsel-table-wrap">
                <table className="counsel-table">
                  <thead>
                    <tr>
                      <th style={{width: '60px'}}>번호</th>
                      <th>과목명</th>
                      <th style={{width: '100px'}}>교수명</th>
                      <th style={{width: '120px'}}>강의시간</th>
                      <th style={{width: '100px'}}>강의실</th>
                      <th style={{width: '60px'}}>학점</th>
                      <th style={{width: '100px'}}>수강인원</th>
                      <th style={{width: '80px'}}>신청</th>
                      <th style={{width: '80px'}}>희망</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCourses.length === 0 ? (
                      <tr>
                        <td colSpan={9} style={{padding: '40px', color: '#999'}}>
                          검색 결과가 없습니다.
                        </td>
                      </tr>
                    ) : (
                      filteredCourses.map((course, index) => (
                        <tr key={course.id}>
                          <td>{index + 1}</td>
                          <td style={{textAlign: 'left', paddingLeft: '10px'}}>{course.과목명}</td>
                          <td>{course.교수명}</td>
                          <td>{course.강의시간}</td>
                          <td>{course.강의실}</td>
                          <td>{course.학점}</td>
                          <td>{course.수강인원}/{course.최대인원}</td>
                          <td>
                            <button 
                              className="btn"
                              style={{fontSize: '11px', padding: '4px 10px'}}
                              onClick={() => handleEnroll(course.id)}
                              disabled={course.수강인원 >= course.최대인원}
                            >
                              {course.수강인원 >= course.최대인원 ? '마감' : '신청'}
                            </button>
                          </td>
                          <td>
                            <button 
                              className="btn btn-outline"
                              style={{fontSize: '11px', padding: '4px 10px'}}
                              onClick={() => handleAddToWishlist(course.id)}
                            >
                              희망
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === '신청내역' && (
            <div style={{marginTop: '20px'}}>
              <div style={{marginBottom: '15px', padding: '10px', background: '#f0f8ff', border: '1px solid #4A90B8', borderRadius: '4px'}}>
                <span style={{fontSize: '14px', fontWeight: '600'}}>총 신청학점: {totalCredits}학점</span>
              </div>

              <div className="counsel-table-wrap">
                <table className="counsel-table">
                  <thead>
                    <tr>
                      <th style={{width: '60px'}}>번호</th>
                      <th>과목명</th>
                      <th style={{width: '100px'}}>교수명</th>
                      <th style={{width: '120px'}}>강의시간</th>
                      <th style={{width: '100px'}}>강의실</th>
                      <th style={{width: '60px'}}>학점</th>
                      <th style={{width: '80px'}}>취소</th>
                    </tr>
                  </thead>
                  <tbody>
                    {enrolledCourses.length === 0 ? (
                      <tr>
                        <td colSpan={7} style={{padding: '40px', color: '#999'}}>
                          신청한 과목이 없습니다.
                        </td>
                      </tr>
                    ) : (
                      enrolledCourses.map((course, index) => (
                        <tr key={course.id}>
                          <td>{index + 1}</td>
                          <td style={{textAlign: 'left', paddingLeft: '10px'}}>{course.과목명}</td>
                          <td>{course.교수명}</td>
                          <td>{course.강의시간}</td>
                          <td>{course.강의실}</td>
                          <td>{course.학점}</td>
                          <td>
                            <button 
                              className="btn btn-gray"
                              style={{fontSize: '11px', padding: '4px 10px'}}
                              onClick={() => handleCancelEnrollment(course.id)}
                            >
                              취소
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}