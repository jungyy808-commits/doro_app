'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';

export default function ConsultRequestPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    상담강사: '',
    상담형태: '대면상담',
    상담일자: '',
    오전시간: '9:00',
    오후시간: '10:00',
    신청유형: '진로·고민',
    상담신청내용: ''
  });
  const [attachedFile, setAttachedFile] = useState<File | null>(null);

  const handleSubmit = async () => {
    // 필수 필드 검증
    if (!formData.상담강사) {
      alert('상담강사를 선택해주세요.');
      return;
    }
    if (!formData.상담일자) {
      alert('상담일자를 선택해주세요.');
      return;
    }
    if (!formData.상담신청내용) {
      alert('상담신청내용을 입력해주세요.');
      return;
    }

    try {
      const response = await fetch('/api/consult/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('상담 신청이 완료되었습니다.');
        router.push('/consult/list');
      } else {
        alert('상담 신청에 실패했습니다.');
      }
    } catch (error) {
      console.error('Failed to submit consult:', error);
      alert('상담 신청 중 오류가 발생했습니다.');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAttachedFile(e.target.files[0]);
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
            <Link href="/consult/list" className="counsel-tab">
              나의 상담내역
            </Link>
            <Link href="/consult/request" className="counsel-tab active">
              상담신청
            </Link>
          </div>

          {/* 폼 */}
          <div className="counsel-form">
            {/* 상담강사 선택 */}
            <div className="counsel-form-row">
              <div className="counsel-form-label">
                <span className="required">*</span>상담강사 선택
              </div>
              <div className="counsel-form-body">
                <select
                  className="c-select"
                  value={formData.상담강사}
                  onChange={(e) => setFormData({...formData, 상담강사: e.target.value})}
                >
                  <option value="">선택해주세요</option>
                  <option value="양윤산">양윤산</option>
                  <option value="김OO">김OO</option>
                  <option value="박OO">박OO</option>
                </select>
                <div className="counsel-help">상담을 받고싶은 강사를 선택해 주십시오.</div>
              </div>
            </div>

            {/* 상담형태 */}
            <div className="counsel-form-row">
              <div className="counsel-form-label">
                <span className="required">*</span>상담형태
              </div>
              <div className="counsel-form-body">
                <div className="counsel-radio-group">
                  <label>
                    <input
                      type="radio"
                      name="상담형태"
                      value="대면상담"
                      checked={formData.상담형태 === '대면상담'}
                      onChange={(e) => setFormData({...formData, 상담형태: e.target.value})}
                    />
                    {' '}대면상담
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="상담형태"
                      value="비대면상담"
                      checked={formData.상담형태 === '비대면상담'}
                      onChange={(e) => setFormData({...formData, 상담형태: e.target.value})}
                    />
                    {' '}비대면상담
                  </label>
                </div>
              </div>
            </div>

            {/* 상담일자/시간 */}
            <div className="counsel-form-row">
              <div className="counsel-form-label">
                <span className="required">*</span>상담일자/시간
              </div>
              <div className="counsel-form-body">
                <div className="counsel-datetime">
                  <input
                    type="date"
                    className="c-input"
                    style={{width: 'auto'}}
                    value={formData.상담일자}
                    onChange={(e) => setFormData({...formData, 상담일자: e.target.value})}
                  />
                  <select
                    className="c-select"
                    style={{width: '110px'}}
                    value={formData.오전시간}
                    onChange={(e) => setFormData({...formData, 오전시간: e.target.value})}
                  >
                    <option value="9:00">오전 9:00</option>
                    <option value="10:00">오전 10:00</option>
                    <option value="11:00">오전 11:00</option>
                  </select>
                  <span>~</span>
                  <select
                    className="c-select"
                    style={{width: '110px'}}
                    value={formData.오후시간}
                    onChange={(e) => setFormData({...formData, 오후시간: e.target.value})}
                  >
                    <option value="10:00">오전 10:00</option>
                    <option value="11:00">오전 11:00</option>
                    <option value="12:00">오후 12:00</option>
                  </select>
                </div>
                <div className="counsel-help">상담을 받고 싶은 날짜와 시간을 입력해 주십시오.</div>
              </div>
            </div>

            {/* 신청유형 */}
            <div className="counsel-form-row">
              <div className="counsel-form-label">
                <span className="required">*</span>신청유형
              </div>
              <div className="counsel-form-body">
                <select
                  className="c-select"
                  value={formData.신청유형}
                  onChange={(e) => setFormData({...formData, 신청유형: e.target.value})}
                >
                  <option value="진로·고민">진로·고민</option>
                  <option value="학습상담">학습상담</option>
                  <option value="심리상담">심리상담</option>
                </select>
              </div>
            </div>

            {/* 상담신청내용 */}
            <div className="counsel-form-row">
              <div className="counsel-form-label">
                <span className="required">*</span>상담신청내용
              </div>
              <div className="counsel-form-body">
                <textarea
                  className="c-textarea"
                  placeholder="상담 내용을 입력해주세요"
                  value={formData.상담신청내용}
                  onChange={(e) => setFormData({...formData, 상담신청내용: e.target.value})}
                ></textarea>
              </div>
            </div>

            {/* 첨부파일 */}
            <div className="counsel-form-row">
              <div className="counsel-form-label">
                첨부파일
              </div>
              <div className="counsel-form-body">
                <label htmlFor="fileInput" className="file-upload-label">
                  파일 첨부
                </label>
                <input
                  type="file"
                  id="fileInput"
                  onChange={handleFileChange}
                />
                {attachedFile && (
                  <span className="file-name">{attachedFile.name}</span>
                )}
              </div>
            </div>
          </div>

          {/* 버튼 */}
          <div className="counsel-actions">
            <button
              onClick={() => router.push('/consult/list')}
              className="btn btn-gray"
            >
              취소하기
            </button>
            <button
              onClick={handleSubmit}
              className="btn"
            >
              신청하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}