/// <reference lib="webworker" />

import { plainToClass } from "class-transformer";
import { Item } from "../model/item";

addEventListener('message', ({ data }) => {
  setInterval(() => {
    const response = resultArray(data.size);
    postMessage(response.slice(data.size - 10, data.size));
  }, data.timer);
});



const resultArray = (size: number) => {
  let result: Item[] = [];
  for (let index = 0; index < size; index++) {
    let element: Item = {
      id: Math.floor((Math.random() * 10000) + 1).toString(),
      int: Math.floor((Math.random() * 10000) + 1),
      float: (Math.random() * 100000),
      color: "#" + Math.floor(Math.random() * 16777215).toString(16),
      child: {
        id: Math.floor((Math.random() * 10000) + 1).toString(),
        color: "#" + Math.floor(Math.random() * 16777215).toString(16),
      }
    } 
    let classElement = plainToClass(Item, element);
    result.push(classElement); 
  }
  console.log(result)
  return result;
}
