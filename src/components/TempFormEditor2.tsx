import styled from '@emotion/styled';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import LoadingSpinner from './LoadingSpinner';

export default function TempFormEditor2({ onChange }: any) {
  const QuillWrapper = dynamic(
    async () => {
      const { default: RQ } = await import('react-quill');
      return function comp({ forwardedRef, ...props }: any) {
        return <RQ ref={forwardedRef} {...props} />;
      };
    },
    {
      ssr: false,
      loading: () => <LoadingSpinner />,
    }
  );

  const QuillRef = useRef<ReactQuill | any>(null);

  const imageHandler = async () => {
    console.log('imgHandler');
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    // document.body.appendChild(input);
    input.setAttribute('accept', 'image/*');
    input.click();
    const formData = new FormData();

    input.addEventListener('change', async () => {
      console.log('change');
      const file = input.files;
      if (file !== null) {
        formData.append('img', file[0]);
      }

      try {
        const result = await axios.post('', formData);
        console.log('success', result.data.url);
        const IMG_URL = result.data.url;

        const editor = QuillRef?.current?.getEditor();
        const range = editor.getSelection();
        editor.insertEmbed(range.index, 'img', IMG_URL);
      } catch (err) {
        console.log(err);
      }
    });
  };

  const modules = {
    toolbar: {
      container: [
        ['image'],
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      ],
      handlers: {
        image: imageHandler,
      },
    },
  };
  // clipboard: {
  //   matchVisual: false,
  // },

  const formats = ['header', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'image'];

  return (
    <FormEditorContainer>
      <QuillWrapper
        modules={modules}
        formats={formats}
        theme="snow"
        style={{ height: '200px' }}
        onChange={onChange}
        // ref={QuillRef}
      />
    </FormEditorContainer>
  );
}

const FormEditorContainer = styled.div`
  height: 250px;
`;
