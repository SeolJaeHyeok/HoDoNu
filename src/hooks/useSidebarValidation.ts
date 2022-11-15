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
      router.asPath.includes('/board/free') ||
      router.asPath.includes('/board/doctor') ||
      router.asPath.includes('/board/nurse')
    ) {
      setIsActive(true);
      setTargetMenus(boardSideBarMenus);
    } else if (router.asPath.includes('/mypage') || router.asPath.includes('/mypage/articles')) {
      setIsActive(true);
      setTargetMenus(userSideBarMenus);
    } else if (
      router.asPath.includes('/admin/users') ||
      router.asPath.includes('/admin/recruit') ||
      router.asPath.includes('/admin/board')
    ) {
      setIsActive(true);
      setTargetMenus(adminSideBarMenus);
    } else {
      setIsActive(false);
    }
  }, [router.asPath]);

  return { targetMenus, isActive };
};

export default useSidebarValidation;
