export interface TableData {
  company: string;
  content: string;
  createdAt: string;
  hits: number;
  jobId: number;
  title: string;
  email: string;
  isActive: boolean;
}

export interface HeadCell {
  disablePadding: boolean;
  id: keyof TableData;
  label: string;
  numeric: boolean;
}
