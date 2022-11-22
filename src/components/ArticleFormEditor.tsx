import { ComponentType, forwardRef, Ref, useMemo, useRef } from 'react';
import dynamic from 'next/dynamic';
import ReactQuill, { ReactQuillProps } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from '@emotion/styled';
import boardApi from '@apis/board';
import LoadingSpinner from './LoadingSpinner';

interface ArticleFormEditorProps {
  content?: string;
  onChange: any;
  height: string;
}

const ReactQuillDynamic: ComponentType<ReactQuillProps & { forwardedRef?: Ref<ReactQuill> }> =
  dynamic(
    async () => {
      const RQ: ComponentType<ReactQuillProps & { ref?: Ref<ReactQuill> }> = (
        await import('react-quill')
      ).default;

      return function comp(props) {
        const ReactQuillRef = forwardRef<ReactQuill, ReactQuillProps>(function ReactQuillRef(
          { ...otherProps },
          ref
        ) {
          return <RQ ref={ref} {...otherProps} />;
        });
        return <ReactQuillRef {...props} ref={props.forwardedRef} />;
      };
    },
    {
      ssr: false,
      loading: () => <LoadingSpinner />,
    }
  );

export default function ArticleFormEditor({ onChange, content, height }: ArticleFormEditorProps) {
  const QuillRef = useRef<any>(null);

  const imageHandler = async () => {
    const editor = await QuillRef.current?.getEditor();
    editor.format('content', 123456);

    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    // 아래 코드는 후에 크로스 브라우징 문제가 있을 수 있다고 해서 추가해놨습니다.
    // document.body.appendChild(input);
    input.setAttribute('accept', 'image/*');
    input.click();
    const formData = new FormData();

    input.addEventListener('change', async () => {
      const file = input.files;
      if (!file) return;
      if (file[0].size >= 1024 * 1024 * 5) {
        alert('파일 크기는 5mb를 넘어갈 수 없습니다:(');
        return;
      }
      if (file !== null) {
        formData.append('images', file[0]);
      }

      try {
        const res = await boardApi.createArticleImg(formData);
        const IMG_URL = res.data.result;
        const range = QuillRef.current.getEditor().getSelection();
        const quillEditor = QuillRef.current.getEditor();
        quillEditor.setSelection(range, 1);
        quillEditor.clipboard.dangerouslyPasteHTML(range, `<img src="${IMG_URL}"/>`);
      } catch (err) {
        alert(err);
      }
    });
  };

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          ['image'],
          [{ header: [1, 2, 3, false] }],
          ['list', 'code-block', 'blockquote'],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    };
  }, []);

  const formats = ['header', 'blockquote', 'list', 'code-block', 'image'];
  return (
    <FormEditorContainer>
      <ReactQuillDynamic
        modules={modules}
        formats={formats}
        theme="snow"
        style={{ height: height }}
        onChange={onChange}
        forwardedRef={QuillRef}
        value={content}
      />
    </FormEditorContainer>
  );
}

const FormEditorContainer = styled.div`
  height: 280px;
`;
