// todolist api 작업
//CRUD 작업

import { NextApiRequest, NextApiResponse } from "next";
import { TodoItem } from "../../../interfaces";
import axios from "axios";

export const mockTodo = [
  { id: "1", description: "todo1", isSuccess: true },
  { id: "2", description: "todo2", isSuccess: false },
];

const hostname = process.env.NEXT_PUBLIC_DEVELOPMENT_HOST_NAME;

const backendPortNumber =
  process.env.NEXT_PUBLIC_DEVELOPMENT_SERVER_PORT_NUMBER || 3000;

const serverURL = `http://${hostname}${backendPortNumber}/api`;

async function get(endpoint: string, params = "") {
  console.log(`%cGET 요청 ${serverURL + endpoint + "/" + params}`);

  return axios.get(serverURL + endpoint + "/" + params);
}

export { get };
