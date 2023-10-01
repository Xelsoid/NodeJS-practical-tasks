import http from 'http';
import url from 'node:url';
import { getUsers } from './getUsers.mjs'
import { URLS } from './constants/index.mjs'
import { createUser } from "./createUsers.mjs";
import { deleteUser } from "./deleteUsers.mjs";
import { updateUser } from "./updateUsers.mjs";
import { deleteHobby } from "./deleteHobby.mjs";
import { updateHobby } from "./updateHobby.mjs";
import { returnServerError } from "./utils/index.mjs";
import { getHobbies } from "./getHobbies.mjs";

const server = http.createServer(async (req, res) => {
  const parsedURL = url.parse(req.url)
  const pathURL = parsedURL.pathname;

  if(pathURL === URLS.RETRIEVE_USER_BY_ID && req.method === "GET") {
    await getUsers(req, res);
    return;
  }

  if(pathURL === URLS.CREATE_USER && req.method === "POST") {
    await createUser(req, res);
    return;
  }

  if(pathURL === URLS.DELETE_USER && req.method === "DELETE") {
    await deleteUser(req, res);
    return;
  }

  if(pathURL === URLS.UPDATE_USER && req.method === "PUT") {
    await updateUser(req, res);
    return;
  }

  if(pathURL === URLS.DELETE_HOBBIES && req.method === "DELETE") {
    await deleteHobby(req, res);
    return;
  }

  if(pathURL === URLS.UPDATE_HOBBIES && req.method === "PUT") {
    await updateHobby(req, res);
    return;
  }

  if(pathURL === URLS.GET_HOBBIES && req.method === "GET") {
    await getHobbies(req, res);
    return;
  }

  if(Object.values(URLS).includes(pathURL)) {
    returnServerError(res, 'Please use corresponding endpoint method');
    return;
  }

  returnServerError(res);
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
