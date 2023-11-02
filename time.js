import {WithTime} from "./withTime.mjs";

const withTime = new WithTime();

withTime.on('begin', () => console.log('About to execute'));
withTime.on('end', () => console.log('Done with execute'));

console.log(withTime.rawListeners("end"));

const getData = async (url, options) => {
  try {
    const response = await fetch(url, options);
    return await response.json();
  } catch(e) {
    console.error(e.message);
  }
}

withTime.execute(getData, 'https://jsonplaceholder.typicode.com/posts/1', {method: "GET"})
