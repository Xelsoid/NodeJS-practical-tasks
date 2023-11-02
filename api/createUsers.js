import {returnServerError, returnSuccessResult, writeFileStream} from "./utils/index.mjs";
import { STORAGE_PATH } from "./constants/index.mjs";
import {getBody, readFileStream} from "./utils/index.mjs";

export const createUser = async (req, res) => {
  try {
    const bodyParsed = await getBody(req);
    const file = await readFileStream(STORAGE_PATH);
    let storage = JSON.parse(file);
    const userData = {
      id: Number(bodyParsed.id),
      name: bodyParsed.name,
      email: bodyParsed.email,
      hobbies:  JSON.parse(bodyParsed.hobbies),
    }

    if(storage.length) {
      storage.push(userData)
    } else {
      storage = userData;
    }

    await writeFileStream(STORAGE_PATH, JSON.stringify(storage));
    returnSuccessResult(res, 'User saved', 201)
  } catch(e) {
    returnServerError(res);
  }
}
