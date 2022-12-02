import React, { useEffect, useMemo, useState } from 'react';

import AdminUserSearch from '@components/admin/users/AdminUserSearch';
import AdminUserTable from '@components/admin/users/AdminUserTable';
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import adminUserApi, { UserAuthType } from '@apis/admin/users';
import styled from '@emotion/styled';
import useInterSectionObeserver from '@hooks/useInterSectionObeserver';
import LoadingSpinner from '@components/LoadingSpinner';
import { Box } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '@atoms/userAtom';
import { useRouter } from 'next/router';

const CATEGORY_TABLE: {
  [index: string]: 'Doctor' | 'Nurse';
} = {
  의사: 'Doctor',
  간호사: 'Nurse',
};

export default function AdminUser() {
  const queryClient = useQueryClient();
  const [searchQueryKey, setSearchQueryKey] = useState('name');
  const [searchQuery, setSearchQuery] = useState('');
  const userInfo = useRecoilValue(userInfoState);
  const router = useRouter();

  const {
    data: userData,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
  } = useInfiniteQuery(
    ['admin', 'users', 'pagination', searchQueryKey, searchQuery],
    ({ pageParam = 1 }) => {
      if (searchQueryKey === 'name') {
        return adminUserApi.getAllUsers({
          name: searchQuery,
          page: pageParam,
          perPage: String(10),
        });
      }
      if (searchQueryKey === 'jobCategory') {
        if (CATEGORY_TABLE[searchQuery]) {
          return adminUserApi.getAllUsers({
            jobCategory: CATEGORY_TABLE[searchQuery],
            page: pageParam,
            perPage: String(10),
          });
        }
        return adminUserApi.getAllUsers({ page: pageParam, perPage: String(10) });
      }
      if (searchQueryKey === 'startDate') {
        return adminUserApi.getAllUsers({
          startDate: searchQuery,
          page: pageParam,
          perPage: String(10),
        });
      }
      if (searchQueryKey === '') {
        return adminUserApi.getAllUsers({ page: pageParam, perPage: String(10) });
      }
    },
    {
      staleTime: 30000,
      cacheTime: 30000,
      getNextPageParam: (lastPage, allPages) => {
        return allPages.length + 1;
      },
      getPreviousPageParam: (firstPage, allPages) => {
        return allPages.length - 1;
      },
    }
  );

  // 회원 삭제 API
  const { mutateAsync: deleteUserMutate } = useMutation(adminUserApi.deleteUser, {
    onSuccess: () => {
      alert('성공적으로 삭제되었습니다.');
      queryClient.invalidateQueries(['admin', 'users', 'pagination', searchQueryKey, searchQuery]);
    },
    onError: (e: unknown) => {
      alert(e);
    },
  });

  // 채용 권한 변경 API
  const { mutateAsync: editUserRecruitAuthMutate } = useMutation(adminUserApi.editUserRecruitAuth, {
    onSuccess: data => {
      alert(data.data.result);
      queryClient.invalidateQueries(['admin', 'users', 'pagination', searchQueryKey, searchQuery]);
    },
    onError: (e: any) => {
      alert(e.response.data.message);
    },
  });

  // 활동 권한 변경 API
  const { mutateAsync: editUserActiveAuthMutate } = useMutation(adminUserApi.editUserActiveAuth, {
    onSuccess: data => {
      alert(data.data.result);
      queryClient.invalidateQueries(['admin', 'users', 'pagination', searchQueryKey, searchQuery]);
    },
    onError: (e: any) => {
      alert(e.response.data.message);
    },
  });

  // 관리자 - 회원 삭제 함수
  const handleDeleteUser = async (userId: string) => {
    await deleteUserMutate(userId);
  };

  // 관리자 - 채용 권한 변경 함수
  const handleEditUserRecruitAuth = async (userId: string, recruiterStatus: UserAuthType) => {
    const bodyData = { recruiterStatus };
    await editUserRecruitAuthMutate({ userId, bodyData });
  };

  // 관리자 - 회원 활동 권한 함수
  const handleEditUserActiveAuth = async (userId: string, authStatus: UserAuthType) => {
    const bodyData = { authStatus };
    await editUserActiveAuthMutate({ userId, bodyData });
  };

  // Intersection Observer Hook
  const ref = useInterSectionObeserver(
    async (entry: IntersectionObserverEntry, observer: IntersectionObserver) => {
      observer.unobserve(entry.target);

      // 다음 페이지가 있고, 이전 데이터 요청이 끝났고, 마지막 요청의 응답으로 온 데이터의 길이가 0이 아닐 경우, 다음 페이지 호출
      if (hasNextPage && !isFetching && userData?.pages.at(-1)?.data.result.response.length !== 0) {
        fetchNextPage();
      }
    }
  );

  // Data Processing
  const usersData = useMemo(
    () => (userData ? userData.pages.flatMap(({ data }: any) => data.result.response) : []),

    [userData]
  );

  useEffect(() => {
    if (userInfo && userInfo.role !== 'Admin') {
      alert('관리자가 아니면 접근할 수 없는 페이지입니다.');
      router.push('/home');
    }
  }, [userInfo, router]);

  return (
    <Container>
      <AdminUserSearch
        searchQueryKey={searchQueryKey}
        setSearchQuery={setSearchQuery}
        setSearchQueryKey={setSearchQueryKey}
      />
      {!isLoading ? (
        <>
          <AdminUserTable
            handleEditUserActiveAuth={handleEditUserActiveAuth}
            handleEditUserRecruitAuth={handleEditUserRecruitAuth}
            handleDeleteUser={handleDeleteUser}
            users={usersData}
            searchQuery={searchQuery}
          />
          <Target ref={ref}></Target>
        </>
      ) : (
        <Box sx={{ position: 'absolute', top: '50%', left: '50%' }}>
          <LoadingSpinner />
        </Box>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 50px auto;
`;

const Target = styled.div`
  height: 1px;
`;
