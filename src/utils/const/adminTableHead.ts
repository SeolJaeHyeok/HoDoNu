import { HeadCell } from '@interfaces/admin/recruit';

export const HEADCELLS: readonly HeadCell[] = [
  {
    id: 'jobId',
    numeric: false,
    disablePadding: true,
    label: '게시글 ID',
  },
  {
    id: 'email',
    numeric: true,
    disablePadding: false,
    label: '작성자',
  },
  {
    id: 'createdAt',
    numeric: true,
    disablePadding: false,
    label: '작성일',
  },
  {
    id: 'title',
    numeric: true,
    disablePadding: false,
    label: '게시글 제목',
  },
  {
    id: 'hits',
    numeric: true,
    disablePadding: false,
    label: '조회수',
  },
  {
    id: 'company',
    numeric: true,
    disablePadding: false,
    label: '회사명',
  },
  {
    id: 'isActive',
    numeric: true,
    disablePadding: false,
    label: '게시글 상태',
  },
];
