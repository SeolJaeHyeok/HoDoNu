import React, { useState } from 'react';

import AdminUserSearch from '@components/admin/users/AdminUserSearch';
import AdminUserTable from '@components/admin/users/AdminUserTable';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import adminApi from '@apis/admin';

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

  const { data: usersData } = useQuery(
    ['admin', 'users', searchQueryKey, searchQuery],
    () => {
      if (searchQueryKey === 'name') {
        return adminApi.getAllUsers({ name: searchQuery });
      }

      if (searchQueryKey === 'jobCategory') {
        if (CATEGORY_TABLE[searchQuery]) {
          return adminApi.getAllUsers({ jobCategory: CATEGORY_TABLE[searchQuery] });
        }
        return adminApi.getAllUsers();
      }

      if (searchQueryKey === 'startDate') {
        return adminApi.getAllUsers({ startDate: searchQuery });
      }

      if (searchQueryKey === '') {
        return adminApi.getAllUsers();
      }
    },
    {
      staleTime: 30000,
      cacheTime: 30000,
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
    onError: (e: unknown) => {
      alert(e);
    },
  });

  // 활동 권한 변경 API
  const { mutateAsync: editUserActiveAuthMutate } = useMutation(adminApi.editUserActiveAuth, {
    onSuccess: data => {
      alert(data.data.result);
      queryClient.invalidateQueries(['admin', 'users', searchQueryKey, searchQuery]);
    },
    onError: (e: unknown) => {
      alert(e);
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
      <AdminUserTable
        handleEditUserActiveAuth={handleEditUserActiveAuth}
        handleEditUserRecruitAuth={handleEditUserRecruitAuth}
        handleDeleteUser={handleDeleteUser}
        users={usersData?.data.result.response}
        searchQuery={searchQuery}
        searchQueryKey={searchQueryKey}
      />
    </div>
  );
}
