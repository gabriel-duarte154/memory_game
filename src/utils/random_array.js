import { v4 as uuidv4 } from 'uuid';

function randomArray(arr) {
  const copyArr = [...arr];
  const randomArr = [];

  while (copyArr.length > 0) {
    let index = Math.floor(Math.random() * copyArr.length);
    copyArr[index].id = uuidv4();
    randomArr.push(...copyArr.splice(index, 1));
  }

  return randomArr;
}

export default randomArray;
