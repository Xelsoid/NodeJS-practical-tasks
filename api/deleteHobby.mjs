import {
  findUserIndex,
  returnNotFound,
  returnServerError,
  returnSuccessResult,
  writeFileStream
} from "./utils/index.mjs";
import { STORAGE_PATH } from "./constants/index.mjs";
import {getBody, readFileStream} from "./utils/index.mjs";

export const deleteHobby = async (req, res) => {
  try {
    const bodyParsed = await getBody(req);
    const file = await readFileStream(STORAGE_PATH);
    let storage = JSON.parse(file);

    if(storage.length && bodyParsed.name) {
      const userIndex = findUserIndex(storage, bodyParsed.name);
      const restHobbies = storage[userIndex].hobbies.filter((hobby) => !bodyParsed.hobbies.includes(hobby));
      const modifiedUser = {...storage[userIndex], hobbies: restHobbies }
      storage.splice(userIndex, 1);
      storage = [...storage, modifiedUser];

      await writeFileStream(STORAGE_PATH, JSON.stringify(storage));
      returnSuccessResult(res, 'Hobby deleted');
    } else {
      returnNotFound(res, "User not found")
    }
  } catch(e) {
    returnServerError(res);
  }
}
