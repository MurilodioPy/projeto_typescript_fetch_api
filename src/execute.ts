import { Quote } from "./quotes";
const API_QUOTES_HOST: string = "https://dummyjson.com/quotes";

const getByAutor = async (author: string, handle: Function): Promise<void> => {
  for (let n = 1; n < 100; n++) {
    try {
      let res = await fetch(`${API_QUOTES_HOST}/${n}`);
      let obj = await res.json();
      if (author == obj.author) handle(obj);
      //console.log(obj);
    } catch (error) {
      console.log(error);
    }
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

function print(data: Quote): void {
  console.log(data);
}

const handlePorAutor = (author: Quote) => {
  //console.log(author);
  const numero = document.getElementById("numero");
  const citacao = document.getElementById("citacao");
  const autor = document.getElementById("nomeautor");

  if (author != undefined) {
    citacao.innerHTML += `${author.quote}`;
    numero.innerHTML += `${author.id}`;
    autor.innerHTML += `"${author.author}"`;
  } else {
    citacao.innerHTML = "Nenhuma citação encontrada com o ID fornecido.";
    numero.innerHTML = ``;
    autor.innerHTML = ``;
  }
};

const handlePorId = (id: Quote) => {
  //console.log(id);
  const numero = document.getElementById("numero");
  const citacao = document.getElementById("citacao");
  const autor = document.getElementById("nomeautor");

  if (id.id != undefined) {
    citacao.innerHTML = `"${id.quote}"`;
    numero.innerHTML = `${id.id}`;
    autor.innerHTML = `- ${id.author}`;
  } else {
    citacao.innerHTML = "Nenhuma citação encontrada com o ID fornecido.";
    numero.innerHTML = ``;
    autor.innerHTML = ``;
  }
};

getById(87, handlePorId);//Martin Luther King Jr.

const buscaPorId = (): void => {
  const idquote = document.getElementById("idquote") as HTMLInputElement;

  const id = parseInt(idquote.value);
  getById(id, handlePorId);
};

const buscaPorAutor = (): void => {
  const nomeautor = document.getElementById("autor") as HTMLInputElement;

  const nome = nomeautor.value;
  //console.log(nome);
  getByAutor(nome, handlePorAutor);
};
