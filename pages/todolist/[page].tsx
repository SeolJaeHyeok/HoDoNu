//api 호출 없이 전체 list 가져와서 getServerSideProps로 pagination 하는 page
import { useState } from "react";
import axios from "axios";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { TodoItem } from "../../interfaces/";
import Todo from "../../components/Todo/Todo";
import AddTodo from "../../components/Todo/AddTodo";
import { Box, Pagination, Container } from "@mui/material";
import { theme } from "../../styles/theme";

const Page = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const page = router.query.page;
  const perPage = 5;
  const checkDev = process.env.NEXT_PUBLIC_DEV;
  const [todolist, setTodolist] = useState<TodoItem[]>(
    checkDev ? data.lists : data
  );
  const totalPage = Math.ceil(todolist.length / perPage);

  const offset = (Number(page) - 1) * perPage;

  const handlePagination = (e: React.ChangeEvent<unknown>, page: number) => {
    router.push(`/todolist/${page}`);
  };

  return (
    <div>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          height: 550,
        }}
      >
        <div>
          <AddTodo setTodolist={setTodolist} todolist={todolist} />
          <Box
            sx={{
              backgroundColor: theme.palette.primary.main,
              width: 400,
              boxShadow: 2,
              margin: "1rem",
              padding: 2,
            }}
          >
            {todolist.slice(offset, offset + perPage).map((todo) => {
              return (
                <Todo key={todo._id} todo={todo} setTodolist={setTodolist} />
              );
            })}
          </Box>
        </div>
        <Pagination count={totalPage} onChange={handlePagination} />
      </Container>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/list`);
  const data: TodoItem[] = await res.data.result;
  return {
    props: {
      data,
    },
  };
};

export default Page;
