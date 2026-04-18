import { useState } from 'react';

type PageType = 'login' | 'register' | 'home';

export function useNavigate() {
  const [currentPage, setCurrentPage] = useState<PageType>('login');

  return {
    currentPage,
    navigateTo: (page: PageType) => setCurrentPage(page),
  };
}
