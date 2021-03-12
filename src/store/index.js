import Vue from 'vue';
import Vuex from 'vuex';
import { toyStore } from './toy.store.js';
import { i18nService } from '../services/i18n.service.js';
import { loginService } from '@/services/login.service.js';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        lang: 'en',
        // isAdmin: true,
        user: null,
    },
    getters: {
        lang(state) {
            return state.lang;
        },
        getLocale(state){ 
            if(state.lang ==='en') return {locale:'en-US' , currency:"USD", multiplier:1}
            return {locale:'he-IL', currency:"ILS", multiplier:3.5}
        },
        direction(state) {
            if (state.lang === 'he') return { direction: 'rtl', 'text-align': 'right' };
            return { direction: 'ltr', 'text-align': 'left' };
        },
        isAdmin(state) {
            return state.user?.isAdmin || false;
        },
        username(state){
            const admin = (state.user?.isAdmin)? 'admin ' : ''
            return admin +( state.user?.username || 'Guest');
        },
        user(state){
            return state.user;
        }
    },
    mutations: {
        setLang(state, { lang }) {
            i18nService.setLang(lang);
            state.lang = lang;
        },
        setUser(state, {user}){
            state.user = user;
        }
    },
    actions: {
        async signupUser(context, { fullname, username, password, isAdmin }) {
            try {
                const user = await loginService.signup(fullname, username, password, isAdmin);
                context.commit({type:'setUser', user})
                
            } catch (err) {
                throw err
            }
        },
        async loginUser(context, { username, password }) {
            try {
                const user = await loginService.login(username, password);
                context.commit({type:'setUser', user})

            } catch (err) {
                throw err 
            }
        },
        async logout(context){
            try{
                await loginService.logout();
                context.commit({type:'setUser', user:null})
            }catch (err) {
                throw err 
            }
        }
    },
    modules: {
        toyStore,
    },
});
