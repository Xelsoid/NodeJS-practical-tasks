import {
  findUserIndex,
  returnNotFound,
  returnServerError,
  returnSuccessResult,
  writeFileStream
} from "./utils/index.mjs";
import { STORAGE_PATH } from "./constants/index.mjs";
import {getBody, readFileStream} from "./utils/index.mjs";


export const deleteUser = async (req, res) => {
  try {
    const bodyParsed = await getBody(req);
    const file = await readFileStream(STORAGE_PATH);
    let storage = JSON.parse(file);

    if(storage.length) {
      const userIndex = findUserIndex(storage, bodyParsed.name);

      if(userIndex !== -1) {
        storage.splice(userIndex, 1);
        await writeFileStream(STORAGE_PATH, JSON.stringify(storage));
        returnSuccessResult(res, 'User deleted');
      } else {
        returnNotFound(res,'User not found');
      }
    }

  } catch(e) {
    returnServerError(res);
  }
}
