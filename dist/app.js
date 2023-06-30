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
exports.getByAutor = exports.getById = exports.getAll = void 0;
const API_QUOTES_HOST = "https://dummyjson.com/quotes";
const getAll = (handle) => {
    try {
        fetch(`${API_QUOTES_HOST}`)
            .then((res) => res.json()) //area function
            .then((json) => handle(json));
    }
    catch (error) {
        console.log(error);
    }
};
exports.getAll = getAll;
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
exports.getById = getById;
const getByAutor = (author, handle) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let res = yield fetch(`${API_QUOTES_HOST}/${author}`);
        let obj = yield res.json();
        handle(obj);
        //console.log(obj);
    }
    catch (error) {
        console.log(error);
    }
});
exports.getByAutor = getByAutor;
const handlePorId = (id) => {
    console.log(id);
};
const handlePorAutor = (author) => {
    console.log(author);
};
function print(data) {
    console.log(data);
}
getAll(print);
