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

export type GetAllData = { data: TableData[] };
