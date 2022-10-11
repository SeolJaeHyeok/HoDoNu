import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { TodoItem, UserInfo } from "../interfaces/";
import AddTodo from "../components/Todo/AddTodo";
import { Container, Pagination } from "@mui/material";
import TodoList from "../components/Todo/TodoList";

const IndexPage = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const checkDev = process.env.NEXT_PUBLIC_DEV;
  let initialData;
  if (checkDev) {
    initialData = data.lists;
    const userInfo: UserInfo = data.userInfo;
  } else {
    initialData = data;
  }

  const [todolist, setTodolist] = useState<TodoItem[]>(
    checkDev ? initialData : data
  );
  const [curList, setCurList] = useState<TodoItem[] | null>(null);
  const [curPageNumber, setCurPageNumber] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);

  useEffect(() => {
    const getPagination = async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_URL}/list/pagenate`,
        {
          params: {
            perPage: 5,
            page: curPageNumber,
          },
        }
      );

      const data = await res.data.result;
      setCurList(data.lists);
      setTotalPage(data.totalPage);
    };

    getPagination();
  }, [curPageNumber, todolist]);

  // pagination 함수
  const handlePagination = (e: React.ChangeEvent<unknown>, page: number) => {
    setCurPageNumber(page);
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
          <AddTodo todolist={todolist} setTodolist={setTodolist} />
          {curList && <TodoList todolist={curList} setTodolist={setTodolist} />}
        </div>
        <Pagination count={totalPage} onChange={handlePagination} />
      </Container>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/list/pagenate`, {
    params: {
      perPage: 5,
      page: 1,
    },
  });

  // const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/list/pagenate`);
  const data: TodoItem[] = await res.data.result;

  return {
    props: {
      data,
    },
  };
};

export default IndexPage;
