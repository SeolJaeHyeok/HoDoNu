// import MultipleSelectCheckmarks from '@components/admin/users/MultipleSelectCheckmarks';
import UserHeader from '@components/admin/users/UserHeader';
import UserSearch from '@components/admin/users/UserSearch';
import UserTable from '@components/admin/users/UserTable';

import React, { useState } from 'react';

export default function AdminUser() {
  const [searchQueryKey, setSearchQueryKey] = useState('name');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div>
      <UserSearch
        searchQuery={searchQuery}
        searchQueryKey={searchQueryKey}
        setSearchQuery={setSearchQuery}
        setSearchQueryKey={setSearchQueryKey}
      />
      <UserHeader />
      {/* <MultipleSelectCheckmarks /> */}
      <UserTable />
    </div>
  );
}
