"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const API_QUOTES_HOST = "https://dummyjson.com/quotes";
const getByAutor = (author, handle) => __awaiter(void 0, void 0, void 0, function* () {
    for (let n = 1; n < 100; n++) {
        try {
            let res = yield fetch(`${API_QUOTES_HOST}/${n}`);
            let obj = yield res.json();
            if (author == obj.author)
                handle(obj);
            //console.log(obj);
        }
        catch (error) {
            console.log(error);
        }
    }
});
const getById = (id, handle) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let res = yield fetch(`${API_QUOTES_HOST}/${id}`);
        let obj = yield res.json();
        handle(obj);
    }
    catch (error) {
        console.log(error);
    }
});
function print(data) {
    console.log(data);
}
const handlePorAutor = (author) => {
    //console.log(author);
    const numero = document.getElementById("numero");
    const citacao = document.getElementById("citacao");
    const autor = document.getElementById("nomeautor");
    if (author != undefined) {
        citacao.innerHTML += `${author.quote}`;
        numero.innerHTML += `${author.id}`;
        autor.innerHTML += `"${author.author}"`;
    }
    else {
        citacao.innerHTML = "Nenhuma citação encontrada com o ID fornecido.";
        numero.innerHTML = ``;
        autor.innerHTML = ``;
    }
};
const handlePorId = (id) => {
    //console.log(id);
    const numero = document.getElementById("numero");
    const citacao = document.getElementById("citacao");
    const autor = document.getElementById("nomeautor");
    if (id.id != undefined) {
        citacao.innerHTML = `"${id.quote}"`;
        numero.innerHTML = `${id.id}`;
        autor.innerHTML = `- ${id.author}`;
    }
    else {
        citacao.innerHTML = "Nenhuma citação encontrada com o ID fornecido.";
        numero.innerHTML = ``;
        autor.innerHTML = ``;
    }
};
getById(87, handlePorId); //Martin Luther King Jr.
const buscaPorId = () => {
    const idquote = document.getElementById("idquote");
    const id = parseInt(idquote.value);
    getById(id, handlePorId);
};
const buscaPorAutor = () => {
    const nomeautor = document.getElementById("autor");
    const nome = nomeautor.value;
    //console.log(nome);
    getByAutor(nome, handlePorAutor);
};
