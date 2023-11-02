import url from "node:url";
import {
  readFileStream,
  returnNotFound,
  returnServerError,
  returnSuccessResult
} from "./utils/index.mjs";
import { STORAGE_PATH } from "./constants/index.mjs";

export const getHobbies = async (req, res) => {
  try{
    const parsedURL = url.parse(req.url);
    const urlSearchParams = new URLSearchParams(parsedURL.query);
    const nameParam = urlSearchParams.get('name');
    const file = await readFileStream(STORAGE_PATH);
    let storage = JSON.parse(file);
    const user = storage.find((user) => user.name.toString() === nameParam);

    if(nameParam && user) {
      res.setHeader('Cache-Control', 'public, max-age=300');
      returnSuccessResult(res, JSON.stringify({data: user.hobbies}));
    } else {
      returnNotFound(res, `User not found`)
    }
  } catch(e) {
    returnServerError(res);
  }
}
