import {httpService} from './http.service.js'

export const loginService = {
    login
}
function login(username, password){
    console.log('username:', username)
    return httpService.post('auth/login/', {username,password})
}

