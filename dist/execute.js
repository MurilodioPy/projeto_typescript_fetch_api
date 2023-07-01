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
const main = document.getElementById("principal");
let stopfor = false;
let run = false;
const getByTexto = (texto, handle) => __awaiter(void 0, void 0, void 0, function* () {
    for (let n = 1; n < 100; n++) {
        progressoBusca(n);
        try {
            let res = yield fetch(`${API_QUOTES_HOST}/${n}`);
            let obj = yield res.json();
            if (obj.quote.toLowerCase().includes(texto.toLowerCase())) {
                handle(obj);
            }
        }
        catch (error) {
            console.log(error);
        }
        if (stopfor) {
            break;
        }
        run = true;
    }
    run = false;
});
function progressoBusca(atual) {
    const barra = document.querySelector(".progresso");
    console.log();
    barra.style.width = atual + "%";
}
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
const criaBlocoResultado = (id, texto, nomeautor) => {
    const quoteResult = document.createElement("div");
    quoteResult.classList.add("blocoresultado");
    const citacao = document.createElement("p");
    citacao.classList.add("citacao");
    const numero = document.createElement("p");
    numero.classList.add("numero");
    const autor = document.createElement("p");
    autor.classList.add("nomeautor");
    citacao.innerHTML = `"${texto}"`;
    numero.innerHTML = `${id}`;
    autor.innerHTML = `- ${nomeautor}`;
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
const handlePorTexto = (texto) => {
    //console.log(author);
    if (texto != undefined) {
        criaBlocoResultado(texto.id, texto.quote, texto.author);
    }
    else {
        limpaTexto();
        criaBlocoErro();
    }
};
const handlePorId = (id) => {
    //console.log(id);
    if (id.id != undefined) {
        criaBlocoResultado(id.id, id.quote, id.author);
    }
    else {
        limpaTexto();
        criaBlocoErro();
    }
};
getById(87, handlePorId); //faz uma busca por id da citação de Martin Luther King Jr.
const buscaPorId = () => {
    const idquote = document.getElementById("idquote");
    const id = parseInt(idquote.value);
    getById(id, handlePorId);
};
const limpaTexto = () => {
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
        var _a;
        (_a = div.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(div);
    });
};
const buscaPorTexto = () => {
    stopfor = false;
    if (!run) {
        const textoprocurado = document.getElementById("buscatexto");
        const texto = textoprocurado.value;
        if (texto != "")
            getByTexto(texto, handlePorTexto);
    }
};
