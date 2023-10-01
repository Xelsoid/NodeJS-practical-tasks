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
    const parsedURL = url.parse(req.url);
    const urlSearchParams = new URLSearchParams(parsedURL.query);
    const idParam = urlSearchParams.get('id');
    const file = await readFileStream(STORAGE_PATH);
    let storage = JSON.parse(file);

    if(idParam) {
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
    } else {
      const usersResponseData = formatUserData(storage)
      returnSuccessResult(res, JSON.stringify({
        data: usersResponseData,
        hobbiesURL: `${URLS.GET_HOBBIES}?name='userName'`
      }));
    }
  } catch(e) {
    returnServerError(res);
  }
}
