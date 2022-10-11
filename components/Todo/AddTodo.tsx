import { useRef, Dispatch, SetStateAction } from "react";
import { Box, Input, IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { theme } from "../../styles/theme";
import { TodoItem } from "../../interfaces";
import axios from "axios";

type Props = {
  todolist: TodoItem[];
  setTodolist: Dispatch<SetStateAction<TodoItem[]>>;
};

const AddTodo = ({ setTodolist }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputRef.current && inputRef.current.value) {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_URL}/list`, {
        description: inputRef.current.value,
      });
      const data = await res.data.result;
      setTodolist((prev) => [...prev, data]);
      inputRef.current.value = "";
    } else {
      console.log("내용을 입력해주세요");
    }
  };

  return (
    <Box
      sx={{
        margin: "1rem",
        marginTop: "2rem",
        padding: 2,
        backgroundColor: theme.palette.primary.light,
        width: 400,
        boxShadow: 2,
      }}
    >
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Input
            placeholder="Add your todo... "
            inputRef={inputRef}
            sx={{ width: 300 }}
            inputProps={{ maxLength: 25 }}
          />
          <IconButton type="submit">
            <AddCircleOutlineIcon sx={{ color: "white" }} />
          </IconButton>
        </Box>
      </form>
    </Box>
  );
};

export default AddTodo;
