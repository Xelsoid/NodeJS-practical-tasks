import http from 'http';
import url from 'node:url';
import { getUsers } from './getUsers.mjs'
import { URLS } from './constants/index.mjs'
import { createUser } from "./createUsers.mjs";
import { deleteUser } from "./deleteUsers.mjs";
import { updateUser } from "./updateUsers.mjs";

const server = http.createServer(async (req, res) => {
  const parsedURL = url.parse(req.url)
  const pathURL = parsedURL.pathname;

  if(pathURL === URLS.RETRIEVE_USER_BY_ID && req.method === "GET") {
    await getUsers(req, res);
  }

  if(pathURL === URLS.CREATE_USER && req.method === "POST") {
    await createUser(req, res);
  }

  if(pathURL === URLS.DELETE_USER && req.method === "DELETE") {
    await deleteUser(req, res);
  }

  if(pathURL === URLS.UPDATE_USER && req.method === "PUT") {
    await updateUser(req, res);
  }
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
