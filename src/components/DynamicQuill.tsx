// import { getS3PresignedURL, uploadImage } from 'apis/image';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { useMemo, useRef } from 'react';

const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import('react-quill');
    return function comp(forwardedRef: any, { ...props }) {
      return <RQ ref={forwardedRef} {...props} />;
    };
  },
  { ssr: false }
);

const formats = ['header', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'image'];

function ReactQuillContainer({ onChange }: any) {
  const quillRef = useRef<any>(null);

  const imgHandler = () => {
    console.log('imgHandler');
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
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

        const editor = quillRef?.current?.getEditor();
        const range = editor.getSelection();
        editor.insertEmbed(range.index, 'img', IMG_URL);
      } catch (err) {
        console.log(err);
      }
    });
  };

  // useMemo를 사용한 이유는 modules가 렌더링마다 변하면 에디터에서 입력이 끊기는 버그가 발생
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ['image'],
          [{ header: [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        ],
        handlers: { image: imgHandler },
      },
    }),
    []
  );

  return (
    <ReactQuill
      forwardedRef={quillRef}
      placeholder="본문을 입력하세요..."
      modules={modules}
      formats={formats}
      onChange={onChange}
    />
  );
}

export default ReactQuillContainer;
