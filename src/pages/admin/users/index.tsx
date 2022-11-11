import React, { useState } from 'react';

import AdminUserSearch from '@components/admin/users/AdminUserSearch';
import AdminUserTable from '@components/admin/users/AdminUserTable';
import { useQuery } from '@tanstack/react-query';
import adminApi from '@apis/admin';

const CATEGORY_TABLE: {
  [index: string]: 'Doctor' | 'Nurse';
} = {
  의사: 'Doctor',
  간호사: 'Nurse',
};

export default function AdminUser() {
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
        } else {
          return adminApi.getAllUsers();
        }
      }

      if (searchQueryKey === 'startDate') {
        return adminApi.getAllUsers({ startDate: searchQuery });
      }

      if (searchQueryKey === '') {
        return adminApi.getAllUsers();
      }
    },
    {
      staleTime: Infinity,
      cacheTime: Infinity,
    }
  );

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        // height: '100vh',
      }}
    >
      <AdminUserSearch
        searchQueryKey={searchQueryKey}
        setSearchQuery={setSearchQuery}
        setSearchQueryKey={setSearchQueryKey}
      />
      <AdminUserTable users={usersData?.data.result.response} />
    </div>
  );
}
