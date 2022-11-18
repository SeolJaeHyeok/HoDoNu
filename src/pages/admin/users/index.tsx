import React, { useMemo, useState } from 'react';

import AdminUserSearch from '@components/admin/users/AdminUserSearch';
import AdminUserTable from '@components/admin/users/AdminUserTable';
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import adminApi from '@apis/admin';
import styled from '@emotion/styled';
import useInterSect from '@hooks/useInterSect';

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

  // const { data: usersData } = useQuery(
  //   ['admin', 'users', searchQueryKey, searchQuery],
  //   () => {
  //     if (searchQueryKey === 'name') {
  //       return adminApi.getAllUsers({ name: searchQuery });
  //     }

  //     if (searchQueryKey === 'jobCategory') {
  //       if (CATEGORY_TABLE[searchQuery]) {
  //         return adminApi.getAllUsers({ jobCategory: CATEGORY_TABLE[searchQuery] });
  //       }
  //       return adminApi.getAllUsers();
  //     }

  //     if (searchQueryKey === 'startDate') {
  //       return adminApi.getAllUsers({ startDate: searchQuery });
  //     }

  //     if (searchQueryKey === '') {
  //       return adminApi.getAllUsers();
  //     }
  //   },
  //   {
  //     staleTime: 30000,
  //     cacheTime: 30000,
  //   }
  // );

  const {
    data: tempData,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useInfiniteQuery(
    ['admin', 'users', 'pagination', searchQueryKey, searchQuery],
    ({ pageParam = 1 }) => {
      // console.log(pageParam);
      if (searchQueryKey === 'name') {
        return adminApi.getAllUsers({
          name: searchQuery,
          page: pageParam,
          perPage: String(10),
        });
      }
      if (searchQueryKey === 'jobCategory') {
        if (CATEGORY_TABLE[searchQuery]) {
          return adminApi.getAllUsers({
            jobCategory: CATEGORY_TABLE[searchQuery],
            page: pageParam,
            perPage: String(10),
          });
        }
        return adminApi.getAllUsers({ page: pageParam, perPage: String(10) });
      }
      if (searchQueryKey === 'startDate') {
        return adminApi.getAllUsers({
          startDate: searchQuery,
          page: pageParam,
          perPage: String(10),
        });
      }
      if (searchQueryKey === '') {
        return adminApi.getAllUsers({ page: pageParam, perPage: String(10) });
      }
    },
    {
      staleTime: 30000,
      cacheTime: 30000,
      getNextPageParam: (lastPage, allPages) => {
        // console.log(lastPage, allPages);
        return allPages.length + 1;
      },
      getPreviousPageParam: (firstPage, allPages) => {
        return allPages.length - 1;
      },
    }
  );

  // 회원 삭제 API
  const { mutateAsync: deleteUserMutate } = useMutation(adminApi.deleteUser, {
    onSuccess: () => {
      alert('성공적으로 삭제되었습니다.');
      queryClient.invalidateQueries(['admin', 'users', searchQueryKey, searchQuery]);
    },
    onError: (e: unknown) => {
      alert(e);
    },
  });

  // 채용 권한 변경 API
  const { mutateAsync: editUserRecruitAuthMutate } = useMutation(adminApi.editUserRecruitAuth, {
    onSuccess: data => {
      alert(data.data.result);
      queryClient.invalidateQueries(['admin', 'users', searchQueryKey, searchQuery]);
    },
    onError: (e: any) => {
      alert(e.response.data.message);
    },
  });

  // 활동 권한 변경 API
  const { mutateAsync: editUserActiveAuthMutate } = useMutation(adminApi.editUserActiveAuth, {
    onSuccess: data => {
      alert(data.data.result);
      queryClient.invalidateQueries(['admin', 'users', searchQueryKey, searchQuery]);
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
  const handleEditUserRecruitAuth = async (userId: string, recruiterStatus: string) => {
    const bodyData = { recruiterStatus };
    await editUserRecruitAuthMutate({ userId, bodyData });
  };

  // 관리자 - 회원 활동 권한 함수
  const handleEditUserActiveAuth = async (userId: string, authStatus: string) => {
    const bodyData = { authStatus };
    await editUserActiveAuthMutate({ userId, bodyData });
  };

  const ref = useInterSect(async (entry: any, observer: any) => {
    observer.unobserve(entry.target);
    if (hasNextPage && !isFetching && tempData?.pages.at(-1)?.data.result.response.length !== 0) {
      console.log(tempData);
      // console.log(entry);
      fetchNextPage();
    }
  });

  const pageDatas = useMemo(
    () => (tempData ? tempData.pages.flatMap(({ data }: any) => data.result.response) : []),

    [tempData]
  );

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        marginTop: '50px',
      }}
    >
      <AdminUserSearch
        searchQueryKey={searchQueryKey}
        setSearchQuery={setSearchQuery}
        setSearchQueryKey={setSearchQueryKey}
      />

      <>
        <AdminUserTable
          handleEditUserActiveAuth={handleEditUserActiveAuth}
          handleEditUserRecruitAuth={handleEditUserRecruitAuth}
          handleDeleteUser={handleDeleteUser}
          users={pageDatas}
          searchQuery={searchQuery}
          searchQueryKey={searchQueryKey}
        />
        <Target ref={ref}></Target>
      </>
    </div>
  );
}

const Target = styled.div`
  height: 1px;
`;
