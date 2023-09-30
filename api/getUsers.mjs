import url from "node:url";
import {readFileStream, returnNotFound, returnServerError, returnSuccessResult} from "./utils/index.mjs";
import { STORAGE_PATH } from "./constants/index.mjs";

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
        returnSuccessResult(res, JSON.stringify(user));
      } else {
        returnNotFound(res, `User with specified id=${idParam} not found`)
      }
    } else {
      returnSuccessResult(res, JSON.stringify(storage));
    }
  } catch(e) {
    returnServerError(res);
  }
}
