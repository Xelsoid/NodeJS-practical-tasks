import url from "node:url";
import {
  formatUserData,
  readFileStream,
  returnNotFound,
  returnServerError,
  returnSuccessResult
} from "./utils/index.mjs";
import {STORAGE_PATH, URLS} from "./constants/index.mjs";

export const getUsers = async (req, res) => {
  try{
    const file = await readFileStream(STORAGE_PATH);
    let storage = JSON.parse(file);

    const usersResponseData = formatUserData(storage)
    returnSuccessResult(res, JSON.stringify({
      data: usersResponseData,
      hobbiesURL: `${URLS.GET_HOBBIES}?name='userName'`
    }));
  } catch(e) {
    returnServerError(res);
  }
}

export const getUserById = async (req, res, idParam) => {
  try{
    const file = await readFileStream(STORAGE_PATH);
    let storage = JSON.parse(file);
    const user = storage.find((user) => user.id.toString() === idParam);

    if(user) {
      const userResponseData = formatUserData([user])
      returnSuccessResult(res, JSON.stringify({
        data: userResponseData,
        hobbiesURL: `${URLS.GET_HOBBIES}?name='userName'`
      }));
    } else {
      returnNotFound(res, `User with specified id=${idParam} not found`)
    }
  } catch(e) {
    returnServerError(res);
  }
}
