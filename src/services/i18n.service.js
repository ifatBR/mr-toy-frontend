import Vue from 'vue';

import VueI18n from 'vue-i18n';
Vue.use(VueI18n);
const messages = {
    en: {
        message: {
            dashboard: 'Dashboard',
            branches: 'Branches',
            toys: 'Toys',
            next: 'Next',
            prev: 'Prev',
            edit: 'Edit',
            details: 'Details',
            price: 'Price',
            'add-toy': 'Add toy',
            'in-stock': 'In stock',
            name: 'Name',
            'toy-name': 'Toy name',
            'sort-by': 'Sort by',
            type: 'Type',
            priceSymb:'$',
            'created-at':"Created at",
            back:'Back',
            save:'Save',
            logout:'Logout',
            login:'login',

        },
    },
    he: {
        message: {
            dashboard: 'לוח בקרה',
            branches: 'סניפים',
            toys: 'צעצועים',
            next: 'הבא',
            prev: 'הקודם',
            edit: 'עריכה',
            details: 'פרטים',
            price: 'מחיר',
            'add-toy': 'הוסף',
            'in-stock': 'במלאי',
            name: 'שם',
            'toy-name':'שם המוצר',
            'sort-by': 'מיין לפי',
            type: 'סוג',
            priceSymb:'₪',
            'created-at':"נוצר ב",
            back:'חזרה',
            save:'שמור',
            logout:'יציאה',
            login:'הרשמה',

        },
    },
};

const i18n = new VueI18n({
    locale: 'en',
    messages,
});


function getI18n(){
    return i18n;
}

function setLang(lang) {
    i18n.locale = lang;
}

export const i18nService = {
    getI18n,
    setLang
}