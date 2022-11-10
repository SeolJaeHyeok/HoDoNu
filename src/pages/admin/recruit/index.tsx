import adminRecruitApi from '@apis/admin/recruit';
import RecruitSearchBar from '@components/admin/recruit/RecruitSearchBar';
import RecruitTable from '@components/admin/recruit/RecruitTable';
import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

type Filter = 'title' | 'creator';

export default function AdminRecruit() {
  // eslint-disable-next-line no-unused-vars
  const [filter, setFilter] = useState<Filter>('title');
  // eslint-disable-next-line no-unused-vars
  const [query, setQuery] = useState<string>('');

  const { data } = useQuery(['admin', 'recruit'], () => adminRecruitApi.getAll(filter, query));
  const jobs = data?.data[0];

  return (
    <Box sx={{ m: 5 }}>
      <RecruitSearchBar />
      <RecruitTable jobs={jobs} />
    </Box>
  );
}
