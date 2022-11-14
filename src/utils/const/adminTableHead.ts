import { HeadCell } from '@interfaces/admin/recruit';

export const HEADCELLS: readonly HeadCell[] = [
  {
    id: 'jobId',

    disablePadding: true,
    label: '게시글 ID',
  },
  {
    id: 'email',
    disablePadding: false,
    label: '작성자',
  },
  {
    id: 'createdAt',
    disablePadding: false,
    label: '작성일',
  },
  {
    id: 'title',
    disablePadding: false,
    label: '게시글 제목',
  },
  {
    id: 'hits',
    disablePadding: false,
    label: '조회수',
  },
  {
    id: 'company',
    disablePadding: false,
    label: '회사명',
  },
  {
    id: 'isActive',
    disablePadding: false,
    label: '게시글 상태',
  },
];
