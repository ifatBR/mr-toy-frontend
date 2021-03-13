import { httpService } from './http.service.js';

export const loginService = {
    login,
    signup,
    logout,
    update
};

function login(username, password) {
    return httpService
        .post('auth/login/', { username, password })
        .then((user) => user)
        .catch((err) => {throw err});
}

function signup(fullname, username, password, isAdmin) {
    return httpService
        .post('auth/signup/', { fullname, username, password, isAdmin })
        .then((user) => user)
        .catch((err) => {throw err});
}

function logout(){
    return httpService
    .post('auth/logout/')
    .then(msg => console.log('msg:', msg))
    .catch((err) => {throw err});

}

function update(user) {
    return httpService.put(`user/${user._id}`, user);
}

