'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname.startsWith(path);
  };

  return (
    <header className="navbar">
      <div className="nav-left">
        <div className="brand">
          <Link href="/">
            <img src="/logo.png" alt="DORO" />
          </Link>
        </div>
      </div>

      <nav className="nav-center">
        <Link 
          href="/course" 
          className={`nav-btn ${isActive('/course') ? 'is-active' : ''}`}
        >
          수강신청
        </Link>
        <Link 
          href="/dashboard" 
          className={`nav-btn ${isActive('/dashboard') ? 'is-active' : ''}`}
        >
          대시보드
        </Link>
        <Link 
          href="/consult" 
          className={`nav-btn ${isActive('/consult') ? 'is-active' : ''}`}
        >
          상담페이지
        </Link>
        <Link 
          href="/mypage" 
          className={`nav-btn ${isActive('/mypage') ? 'is-active' : ''}`}
        >
          마이페이지
        </Link>
      </nav>

      <div className="nav-right">
        <button className="link-btn">로그아웃</button>
      </div>
    </header>
  );
}