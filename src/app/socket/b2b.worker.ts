/// <reference lib="webworker" />

import { Item } from "../model/item";

addEventListener('message', ({ data }) => {
  setInterval(() => {
    const response = resultArray(data.size);
    // const response = { 'a': Math.random() * data.a * data.g };
    postMessage(response.slice(data.size - 10, data.size));
  }, data.timer);
});

const resultArray = (size: number) => {
  let result = [];
  for (let index = 0; index < size; index++) {
    let element: Item = {
      id: Math.floor((Math.random() * 10000) + 1).toString(),
      int: Math.floor((Math.random() * 10000) + 1),
      float: Math.random(),
      color: "#" + Math.floor(Math.random() * 16777215).toString(16),
      child: {
        id: Math.random().toString(),
        color: "#" + Math.floor(Math.random() * 16777215).toString(16),
      }
    }
    result.push(element);
  }
  return result;
}
