import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  adminSideBarMenus,
  boardSideBarMenus,
  userSideBarMenus,
} from 'src/utils/const/sidebarMenus';

const useSidebarValidation = () => {
  const [targetMenus, setTargetMenus] = useState<string[]>([]);
  const [isActive, setIsActive] = useState<boolean>(false);
  const router = useRouter();

  // URL을 통해 현재 페이지에 맞는 사이드바 검증
  useEffect(() => {
    if (
      router.pathname === '/board/free' ||
      router.pathname === '/board/doctor' ||
      router.pathname === '/board/nurse' ||
      router.pathname === '/board/free/[id]' ||
      router.pathname === '/board/doctor/[id]' ||
      router.pathname === '/board/nurse/[id]'
    ) {
      setIsActive(true);
      setTargetMenus(boardSideBarMenus);
    } else if (router.pathname === '/mypage' || router.pathname === '/mypage/articles') {
      setIsActive(true);
      setTargetMenus(userSideBarMenus);
    } else if (
      router.pathname === '/admin/users' ||
      router.pathname === '/admin/recruit' ||
      router.pathname === '/admin/board'
    ) {
      setIsActive(true);
      setTargetMenus(adminSideBarMenus);
    } else {
      setIsActive(false);
    }
  }, [router.pathname]);

  return { targetMenus, isActive };
};

export default useSidebarValidation;
