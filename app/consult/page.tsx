'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ConsultPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/consult/list');
  }, [router]);

  return null;
}
