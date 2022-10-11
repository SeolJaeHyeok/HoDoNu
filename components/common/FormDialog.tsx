import { useRef, useState, Dispatch, SetStateAction } from 'react';

import {
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input,
} from '@mui/material';

import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import axios from 'axios';
import { TodoItem } from '../../interfaces';

type Props = {
  id: string;
  setTodolist: Dispatch<SetStateAction<TodoItem[]>>;
};

export default function FormDialog({ id, setTodolist }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    if (inputRef.current && inputRef.current.value) {
      console.log('production은 비밀번호가 필요합니다.');
      try {
        await axios.delete(`${process.env.NEXT_PUBLIC_URL}/list/${id}`, {
          data: {
            password: inputRef.current.value,
          },
        });
        const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/list`);
        const data = res.data.result.lists;
        setTodolist(data);
        setOpen(false);
      } catch {
        alert('잘못된 비밀번호입니다.');
        console.log('잘못된 비밀번호입니다.');
      }

      // if (deleteTodo.data.status === 200) {
      //   const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/list`);
      //   const data = res.data.result.lists;
      //   setTodolist(data);
      //   setOpen(false);
      // } else {
      //   console.log('잘못된 비밀번호입니다.');
      // }
    } else {
      console.log('비밀번호를 입력하세요');
    }
  };

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <HighlightOffIcon sx={{ color: 'white' }} />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Password</DialogTitle>
        <DialogContent sx={{ margin: 1 }}>
          <form onSubmit={handleSubmit}>
            <Input
              autoFocus
              type='password'
              placeholder='비밀번호를 입력하세요.'
              inputRef={inputRef}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
