import { Dispatch, SetStateAction } from 'react';

export interface FileUploaderProps {
  multiple?: boolean;
  fileList: FileProps[];
  setFileList: Dispatch<SetStateAction<FileProps[]>>;
  name: string;
}

export interface FileProps {
  id: number;
  file: File | null;
}
