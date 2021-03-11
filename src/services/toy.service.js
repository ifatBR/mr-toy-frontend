import { storageService } from './async-storage.service.js';
import { utilService } from './util.service.js';
import axios from 'axios';

let gFilterBy = { name: '', inStock: 'all', types: [], sortBy: 'name', pageDiff: 0 };
const KEY = 'toysDB';
const TOY_URL = process.env.NODE_ENV !== 'development' 
            ? '/api/toy/' 
            : '//localhost:3030/api/toy/';

export const toyService = {
    query,
    getById,
    remove,
    save,
    getEmptyToy,
    setFilter,
};

_createToys();

// TODO: support paging and filtering and sorting

function setFilter(filterBy) {
    gFilterBy = filterBy;
}

function query() {
    return axios
        .get(TOY_URL, { params: gFilterBy })
        .then(({ data }) => data)
        .catch((err) => err);
}

function getById(id) {
    return axios
        .get(TOY_URL + id)
        .then(({ data }) => data)
        .then((toy) => toy)
        .catch((err) => err);
}

function remove(id) {
    return axios
        .delete(TOY_URL + id)
        .then(() => Promise.resolve('deleted'))
        .catch((err) => err);
}

function save(toy) {
    if (toy._id)
        return axios
            .put(TOY_URL + toy._id, toy)
            .then(({data}) => {
                return data})
            .catch((err) => err);
    return axios
        .post(TOY_URL, toy)
        .then(({data}) => data)
        .catch((err) => err);
}

function getEmptyToy(name = '', price = 100, type, createdAt) {
    return {
        _id: '',
        name,
        price,
        type,
        createdAt,
        inStock: null,
    };
}

// Create Test Data:
function _createToys() {
    var toys = JSON.parse(localStorage.getItem(KEY));
    if (!toys || !toys.length) {
        toys = [
            _createToy('Teddy bear', 'stuffed'),
            _createToy('Lego', 'creative'),
            _createToy('Talking Doll', 'funny'),
            _createToy('Clown', 'funny'),
        ];
        localStorage.setItem(KEY, JSON.stringify(toys));
    }
    return toys;
}

function _createToy(name, type) {
    const toy = getEmptyToy(name, utilService.getRandomInt(80, 300), type, utilService.getRandomInt(1583212296004, 1615214496004));
    toy._id = utilService.makeId();
    toy.inStock = Math.random() > 0.5;
    return toy;
}

// function _createToys() {
//     return [
//         {
//             _id: 't101',
//             name: 'Talking Doll',
//             price: 100,
//             type: 'Funny',
//             createdAt: 33321111111,
//             inStock: false,
//         },
//         {
//             _id: 't102',
//             name: 'Teddy bear',
//             price: 50,
//             type: 'Cuddly',
//             createdAt: 23321116543,
//             inStock: true,
//         },
//         {
//             _id: 't103',
//             name: 'Lego',
//             price: 250,
//             type: 'Creative',
//             createdAt: 32321174611,
//             inStock: true,
//         },
//     ];
// }
