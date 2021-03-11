<template>
    <section class="main-container flex column justify-center align-center">
        <form @submit.prevent="loginUser">
            <label>User name: <input type="text" v-model="username" required></label>
            <label>Password: <input type="password" v-model="password" required></label>
            <button>Login</button>
        </form>
    </section>
</template>


<script>
    import {loginService} from '@/services/login.service.js'
export default {
data(){
    return{
        username:null,
        password:null
    }
},
methods:{
    loginUser(){
        loginService.login(this.username, this.password)
    }
}
}
</script>

<style>

</style>