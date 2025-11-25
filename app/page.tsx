import Link from 'next/link';
import Navbar from '@/app/components/Navbar';

export default function Home() {
  return (
    <>
      <Navbar />
      
      <div className="counsel-page">
        <div className="counsel-container" style={{maxWidth: '800px', textAlign: 'center'}}>
          <h1 style={{fontSize: '32px', fontWeight: '700', marginBottom: '20px'}}>
            DORO 학습 관리 시스템
          </h1>
          
          <p style={{fontSize: '16px', color: '#666', marginBottom: '40px'}}>
            수강신청, 상담, 학습 관리를 한 곳에서
          </p>
          
          <div style={{
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '20px',
            marginTop: '40px'
          }}>
            <Link href="/course" style={{textDecoration: 'none'}}>
              <div style={{
                padding: '30px 20px',
                background: '#fff',
                border: '2px solid #4A90B8',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}>
                <div style={{fontSize: '40px', marginBottom: '15px'}}>📚</div>
                <h3 style={{fontSize: '18px', fontWeight: '600', color: '#333', marginBottom: '10px'}}>
                  수강신청
                </h3>
                <p style={{fontSize: '13px', color: '#666'}}>
                  강의 조회 및 수강신청
                </p>
              </div>
            </Link>
            
            <Link href="/consult/list" style={{textDecoration: 'none'}}>
              <div style={{
                padding: '30px 20px',
                background: '#fff',
                border: '2px solid #4A90B8',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}>
                <div style={{fontSize: '40px', marginBottom: '15px'}}>💬</div>
                <h3 style={{fontSize: '18px', fontWeight: '600', color: '#333', marginBottom: '10px'}}>
                  상담
                </h3>
                <p style={{fontSize: '13px', color: '#666'}}>
                  상담 신청 및 내역 조회
                </p>
              </div>
            </Link>
            
            <Link href="/dashboard" style={{textDecoration: 'none'}}>
              <div style={{
                padding: '30px 20px',
                background: '#fff',
                border: '2px solid #4A90B8',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}>
                <div style={{fontSize: '40px', marginBottom: '15px'}}>📊</div>
                <h3 style={{fontSize: '18px', fontWeight: '600', color: '#333', marginBottom: '10px'}}>
                  대시보드
                </h3>
                <p style={{fontSize: '13px', color: '#666'}}>
                  학습 현황 및 통계
                </p>
              </div>
            </Link>
            
            <Link href="/mypage" style={{textDecoration: 'none'}}>
              <div style={{
                padding: '30px 20px',
                background: '#fff',
                border: '2px solid #4A90B8',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}>
                <div style={{fontSize: '40px', marginBottom: '15px'}}>👤</div>
                <h3 style={{fontSize: '18px', fontWeight: '600', color: '#333', marginBottom: '10px'}}>
                  마이페이지
                </h3>
                <p style={{fontSize: '13px', color: '#666'}}>
                  내 정보 관리
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}