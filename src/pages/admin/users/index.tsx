import React, { useState } from 'react';

import UserSearch from '@components/admin/users/AdminUserSearch';
import UserTable from '@components/admin/users/AdminUserTable';
import { useQuery } from '@tanstack/react-query';
import adminApi from '@apis/admin';

export default function AdminUser() {
  const [searchQueryKey, setSearchQueryKey] = useState('name');
  const [searchQuery, setSearchQuery] = useState('');
  const { data: usersData } = useQuery(['admin', 'users'], () => adminApi.getAllUsers());

  return (
    <div>
      <UserSearch
        searchQuery={searchQuery}
        searchQueryKey={searchQueryKey}
        setSearchQuery={setSearchQuery}
        setSearchQueryKey={setSearchQueryKey}
      />
      <UserTable users={usersData?.data.result.response} />
    </div>
  );
}
