import styled from '@emotion/styled';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import LoadingSpinner from './LoadingSpinner';

export default function TempFormEditor({ onChange }: any) {
  const QuillWrapper = dynamic(() => import('react-quill'), {
    ssr: false,
    loading: () => <LoadingSpinner />,
  });

  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
  ];

  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image', 'video'],
      ['clean'],
    ],
    clipboard: {
      matchVisual: false,
    },
    handlers: {
      // image: imageHandler
    },
  };

  return (
    <FormEditorContainer>
      <QuillWrapper
        modules={modules}
        formats={formats}
        theme="snow"
        style={{ height: '200px' }}
        onChange={onChange}
      />
    </FormEditorContainer>
  );
}

const FormEditorContainer = styled.div`
  height: 250px;
`;
