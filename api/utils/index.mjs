import querystring from "querystring";
import fs from "fs";

export const returnServerError = (res) => {
  res.statusCode = 500;
  res.end('Server error');
}

export const returnSuccessResult = (res, data) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(data);
}

export const returnNotFound = (res, data) => {
  res.statusCode = 404;
  res.end(data);
}

export const formatUserData = (users = []) => users.map(({id, name, email}) => ({ id, name, email }))

export const getBody = (req) =>  {
  return new Promise((resolve, reject) => {
    let body = '';
    req
      .on('data', (chunk) => { body += chunk.toString()})
      .on('end', () => {
        resolve(querystring.parse(body))
      })
      .on('error', () => {
        reject('parsing body error')
      });
  });
}

export const readFileStream = async (filePath) => {
  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(filePath, 'utf8');
    let file = '';
    readStream.on('data', (chunk) => {
      file += chunk;
    })

    readStream.on('end', () => {
      resolve(file)
    })

    readStream.on('error', () => {
      reject('Can not read the file')
    })
  });
}

export const writeFileStream = async (filePath, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, data, (err) => {
      if (err) {
        reject('Write file error');
      }
      resolve();
    })
  });
}

export const findUserIndex = (usersList, userName) => {
  return usersList.findIndex(user => user.name === userName);
}
