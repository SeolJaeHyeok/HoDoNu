import boardApi from '@apis/board';
import styled from '@emotion/styled';
import dynamic from 'next/dynamic';
import { useRef } from 'react';
import 'react-quill/dist/quill.snow.css';
import LoadingSpinner from './LoadingSpinner';

const ReactQuill = dynamic(
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

export default function ArticleFormEditor({ onChange }: any, { ...props }) {
  const QuillRef = useRef<any>(null);

  const imageHandler = async () => {
    const editor = await QuillRef.current?.getEditor();

    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    // 아래 코드는 후에 크로스 브라우징 문제가 있을 수 있다고 해서 추가해놨습니다.
    // document.body.appendChild(input);
    input.setAttribute('accept', 'image/*');
    input.click();
    const formData = new FormData();

    input.addEventListener('change', async () => {
      const file = input.files;
      if (file !== null) {
        formData.append('images', file[0]);
      }

      try {
        // useMutation을 사용하면 컴포넌트가 사라지는 이슈가 있어 useMutation을 사용하지 않았습니다.
        // 추후 더 공부해보고 수정 예정입니다.
        const res = await boardApi.createArticleImg(formData);
        const IMG_URL = res.data.result;

        const range = editor.getSelection().index + 1;
        editor.insertEmbed(range, 'image', IMG_URL);
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

  const formats = ['header', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'image'];

  return (
    <FormEditorContainer>
      <ReactQuill
        modules={modules}
        formats={formats}
        theme="snow"
        style={{ height: '200px' }}
        onChange={onChange}
        forwardedRef={QuillRef}
        {...props}
      />
    </FormEditorContainer>
  );
}

const FormEditorContainer = styled.div`
  height: 250px;
`;