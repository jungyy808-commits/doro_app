'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';

interface Consult {
  id: number;
  상담유형: string;
  상담형식: string;
  상담강사: string;
  상태: string;
  상담일시: string;
  실패: string;
  비고: string;
}

export default function ConsultListPage() {
  const [consults, setConsults] = useState<Consult[]>([]);
  const [filters, setFilters] = useState({
    상담유형: '',
    상담형태: '',
    상담강사: '',
    상태: ''
  });

  useEffect(() => {
    fetchConsults();
  }, []);

  const fetchConsults = async () => {
    try {
      const response = await fetch('/api/consult/list');
      const data = await response.json();
      setConsults(data);
    } catch (error) {
      console.error('Failed to fetch consults:', error);
    }
  };

  const filteredConsults = consults.filter(consult => {
    if (filters.상담유형 && consult.상담유형 !== filters.상담유형) return false;
    if (filters.상담형태 && consult.상담형식 !== filters.상담형태) return false;
    if (filters.상담강사 && consult.상담강사 !== filters.상담강사) return false;
    if (filters.상태 && consult.상태 !== filters.상태) return false;
    return true;
  });

  const getStatusClass = (status: string) => {
    switch(status) {
      case '승인': return 'approved';
      case '대기': return 'pending';
      case '거절': return 'rejected';
      default: return '';
    }
  };

  return (
    <>
      <Navbar />
      
      <div className="counsel-page">
        <div className="counsel-container">
          <h1 className="counsel-title">상담페이지</h1>

          {/* 탭 네비게이션 */}
          <div className="counsel-tabs">
            <Link href="/consult/list" className="counsel-tab active">
              나의 상담내역
            </Link>
            <Link href="/consult/request" className="counsel-tab">
              상담신청
            </Link>
          </div>

          {/* 필터 */}
          <div className="counsel-filters">
            <select
              className="c-select"
              value={filters.상담유형}
              onChange={(e) => setFilters({...filters, 상담유형: e.target.value})}
            >
              <option value="">상담유형</option>
              <option value="진로">진로</option>
              <option value="학습">학습</option>
              <option value="심리">심리</option>
            </select>

            <select
              className="c-select"
              value={filters.상담형태}
              onChange={(e) => setFilters({...filters, 상담형태: e.target.value})}
            >
              <option value="">상담형태</option>
              <option value="대면상담">대면상담</option>
              <option value="비대면상담">비대면상담</option>
            </select>

            <select
              className="c-select"
              value={filters.상담강사}
              onChange={(e) => setFilters({...filters, 상담강사: e.target.value})}
            >
              <option value="">상담강사</option>
              <option value="김OO">김OO</option>
              <option value="박OO">박OO</option>
            </select>

            <select
              className="c-select"
              value={filters.상태}
              onChange={(e) => setFilters({...filters, 상태: e.target.value})}
            >
              <option value="">상태</option>
              <option value="승인">승인</option>
              <option value="대기">대기</option>
              <option value="거절">거절</option>
            </select>

            <Link href="/consult/request" className="btn align-right">
              + 상담신청
            </Link>
          </div>

          {/* 테이블 */}
          <div className="counsel-table-wrap">
            <table className="counsel-table">
              <thead>
                <tr>
                  <th>번호</th>
                  <th>상담유형</th>
                  <th>상담형식</th>
                  <th>상담강사</th>
                  <th>상태 내용</th>
                  <th>상담일시(상담예정일)</th>
                  <th>실패</th>
                  <th>비고</th>
                </tr>
              </thead>
              <tbody>
                {filteredConsults.length === 0 ? (
                  <tr>
                    <td colSpan={8} style={{padding: '40px', color: '#999'}}>
                      상담 내역이 없습니다.
                    </td>
                  </tr>
                ) : (
                  filteredConsults.map((consult, index) => (
                    <tr key={consult.id}>
                      <td>{index + 1}</td>
                      <td>{consult.상담유형}</td>
                      <td>{consult.상담형식}</td>
                      <td>{consult.상담강사}</td>
                      <td>
                        <span className={`status-badge ${getStatusClass(consult.상태)}`}>
                          {consult.상태}
                        </span>
                      </td>
                      <td>{consult.상담일시}</td>
                      <td>{consult.실패}</td>
                      <td>{consult.비고}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}