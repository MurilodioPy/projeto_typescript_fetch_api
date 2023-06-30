//import fetch from 'node-fetch'
import { Quote } from "./quotes";

const API_QUOTES_HOST: string = "https://dummyjson.com/quotes";

const getAll = (handle: Function): void => {
  try {
    fetch(`${API_QUOTES_HOST}`)
      .then((res) => res.json()) //area function
      .then((json) => handle(json));
  } catch (error) {
    console.log(error);
  }
};

const getById = async (id: number, handle: Function): Promise<void> => {
  try {
    let res = await fetch(`${API_QUOTES_HOST}/${id}`);
    let obj = await res.json();
    handle(obj);
  } catch (error) {
    console.log(error);
  }
};

const getByAutor = async (author: string, handle: Function): Promise<void> => {
  try {
    let res = await fetch(`${API_QUOTES_HOST}/${author}`);
    let obj = await res.json();
    handle(obj);
    //console.log(obj);
  } catch (error) {
    console.log(error);
  }
};

const handlePorId = (id: number) => {
  console.log(id);
};

const handlePorAutor = (author: string) => {
  console.log(author);
};

function print(data: Quote): void {
  console.log(data);
}

getAll(print);

export { getAll, getById, getByAutor }; //buscar calback hell imagens
