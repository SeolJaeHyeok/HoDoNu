import styled from '@emotion/styled';
import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import { Button, css } from '@mui/material';

interface FileUploaderProps {
  multiple?: boolean;
  fileList: FileProps[];
  setFileList: Dispatch<SetStateAction<FileProps[]>>;
  name: string;
}

export interface FileProps {
  id: number;
  file: File | null;
}

export default function FileUploader({ multiple, fileList, setFileList, name }: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false); // 드래그 중 상태
  const dragRef = useRef<HTMLLabelElement | null>(null); // 드래그 dom
  const fileId = useRef<number>(0);

  const onUploadFile = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    e.preventDefault();
    let selectFiles: FileList;
    if (e.type === 'drop') {
      // 드래그 앤 드롭 했을때
      selectFiles = e.dataTransfer.files;
    } else {
      // "파일 첨부" 버튼을 눌러서 이미지를 선택했을 때
      selectFiles = e.target.files;
    }
    console.log(selectFiles);
    if (selectFiles.length) {
      if (multiple) {
        Object.keys(selectFiles).forEach(() => {
          setFileList([...fileList, { id: fileId.current++, file: selectFiles.item(0) }]);
        });
      } else {
        setFileList([{ id: 0, file: selectFiles.item(0) }]);
      }
    }
  };

  // 드래그 시작
  const hadleDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // 드래그 커서 사라짐
  const hadleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  // 드래그 중
  const hadleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files) {
      setIsDragging(true);
    }
  };

  // 드롭
  const hadleDragDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    onUploadFile(e); // 드롭 시 업로드
  };

  // 삭제 버튼 클릭 시 삭제
  const deletefileHandler = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    e.preventDefault();
    e.stopPropagation();
    setFileList(fileList.filter(file => file.id !== id));
  };
  return (
    <Container>
      <DragLabel
        htmlFor={name}
        isDrag={isDragging}
        ref={dragRef}
        onDragEnter={hadleDragEnter}
        onDragLeave={hadleDragLeave}
        onDragOver={hadleDragOver}
        onDrop={hadleDragDrop}
      >
        <FileInput onChange={onUploadFile} type="file" id={name} multiple={multiple} />
        <FileListContainer>
          <FileInputTitle>클릭 또는 끌어오기</FileInputTitle>
          {Boolean(fileList.length) &&
            fileList.map(file => (
              <FileItemContainer key={file.id}>
                <p>
                  {file.file?.name}
                  <Button
                    onClick={e => {
                      deletefileHandler(e, file.id);
                    }}
                  >
                    <ClearIcon />
                  </Button>
                </p>
              </FileItemContainer>
            ))}
        </FileListContainer>
      </DragLabel>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgb(200, 200, 200);
  padding: 20px 0px;
  margin-top: 5px;
`;

const DragLabel = styled.label<{ isDrag: boolean }>`
  width: 80%;
  height: 80%;
  border-radius: 10px;
  border: 3px dashed '#20BBFF';
  &:hover {
    background: '#EFF0EB';
    cursor: pointer;
    transition: 0.3s linear;
  }
  ${props => {
    return props.isDrag
      ? css`
          background: '#BFC1CE';
        `
      : css``;
  }}
`;

const FileInput = styled.input`
  display: none;
`;

const FileInputTitle = styled.h2`
  color: rgb(200, 200, 200);
  padding: 10px 0px;
  text-align: center;
`;

const FileListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  color: '#EFF0EB';
  & p {
    width: 100%;
  }
`;

const FileItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
