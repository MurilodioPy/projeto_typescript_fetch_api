import { Quote } from "./quotes";
const API_QUOTES_HOST: string = "https://dummyjson.com/quotes";

const main = document.getElementById("principal");
let stopfor : boolean = false;

const getByTexto = async (texto: string, handle: Function): Promise<void> => {
  for (let n = 1; n < 100; n++) {
    progressoBusca(n);
    try {
      let res = await fetch(`${API_QUOTES_HOST}/${n}`);
      let obj = await res.json();
      if (obj.quote.toLowerCase().includes(texto.toLowerCase())) {
        handle(obj);
      }
    } catch (error) {
      console.log(error);
    }
    if(stopfor){
      break;
    }
  }
};

function progressoBusca(atual: number) {
  const barra = document.querySelector('.progresso') as HTMLElement;
  console.log()
  barra.style.width = atual + '%';
}

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

const criaBlocoResultado = (id: number, texto: string, nomeautor: string) => {
  const quoteResult = document.createElement("div");
  quoteResult.classList.add("blocoresultado");
  const citacao = document.createElement("p");
  citacao.classList.add("citacao");
  const numero = document.createElement("p");
  numero.classList.add("numero");
  const autor = document.createElement("p");
  autor.classList.add("nomeautor");

  citacao.innerHTML = `${texto}`;
  numero.innerHTML = `${id}`;
  autor.innerHTML = `"${nomeautor}"`;

  quoteResult.appendChild(numero);
  quoteResult.appendChild(citacao);
  quoteResult.appendChild(autor);
  main.appendChild(quoteResult);
};

const criaBlocoErro = () => {
  const quoteResult = document.createElement("div");
  quoteResult.classList.add("blocoresultado");
  const citacao = document.createElement("p");
  citacao.classList.add("citacao");
  citacao.innerHTML = "Nenhuma citação encontrada com o ID fornecido.";
};

const handlePorTexto = (texto: Quote) => {
  //console.log(author);
  if (texto != undefined) {
    criaBlocoResultado(texto.id, texto.quote, texto.author);
  } else {
    limpaTexto();
    criaBlocoErro();
  }
};

const handlePorId = (id: Quote) => {
  //console.log(id);
  if (id.id != undefined) {
    criaBlocoResultado(id.id, id.quote, id.author);
  } else {
    limpaTexto();
    criaBlocoErro();
  }
};

getById(87, handlePorId);//Martin Luther King Jr.

const buscaPorId = (): void => {
  const idquote = document.getElementById("idquote") as HTMLInputElement;

  const id = parseInt(idquote.value);
  getById(id, handlePorId);
};

const limpaTexto = (): void => {
  citacao.innerHTML = "";
  numero.innerHTML = ``;
  autor.innerHTML = ``;
};

const limparResultado = () => {
  progressoBusca(0);
  stopfor = true;
  const divs = document.getElementsByClassName("blocoresultado");

  // Converte a coleção de elementos em um array para facilitar a iteração
  const divsArray = Array.from(divs);

  // Itera sobre os elementos e remove cada um
  divsArray.forEach((div) => {
    div.parentNode?.removeChild(div);
  });
};

const buscaPorTexto = (): void => {
  stopfor = false;
  const textoprocurado = document.getElementById(
    "buscatexto"
  ) as HTMLInputElement;

  const texto = textoprocurado.value;
  if (texto != "") getByTexto(texto, handlePorTexto);
};
