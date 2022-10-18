import styled from '@emotion/styled';
import CircleIcon from '@mui/icons-material/Circle';

interface ButtonProps {
  value: string;
  clicked?: boolean;
  onClick?: any;
}

enum FilterState {
  '최신순' = 'recent',
  '조회순' = 'views',
}

/**
 * @param {string} value - button안에 들어갈 값
 * @param {boolean} clicked - 클릭 여부
 * @param {(e) => void} handleClick - handleClick 함수 ( clicked 여부를 알 수 있는 state )
 */

export default function FilterButton({ value, clicked, onClick }: ButtonProps) {
  const style = {
    color: clicked ? '#00c471' : 'black',
    fontSize: '8px',
    mr: '6px',
  };

  const ButtonContainer = styled.div``;
  const Button = styled.button`
    font-weight: ${clicked ? '600' : '400'};
    height: 28px;
    margin: 0 auto;
    color: ${clicked ? '#1b1c1d' : '#abb0b5'};
    border: none;
    background-color: white;
    cursor: pointer;
    font-size: 16px;
  `;

  return (
    <>
      <Button onClick={onClick}>
        <CircleIcon sx={style} />
        {value}
      </Button>
    </>
  );
}
