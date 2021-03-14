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
            login:'Login',
            'add-review':'Add review',
            reviews:'Reviews',
            older:'Older',
            newer:'Newer',
            username:'User name',
            fullname:'Full name',
            password:'Password',
            signup:'Signup',
            'admin':'Admin',
            user:'Profile'

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
            'add-review':'הוסף חוות דעת',
            reviews:'חוות דעת',
            older:'ישן יותר',
            newer:'חדש יותר',
            username:'שם משתמש',
            fullname:'שם מלא',
            password:'סיסמא',
            signup:'הרשם',
            'admin':'מנהל',
            user:'פרופיל'

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