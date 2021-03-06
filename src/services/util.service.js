
function makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

// function debounce(func, wait, immediate) {
//     var timeout;
//     return function() {
//         var context = this,
//             args = arguments;
//         clearTimeout(timeout);
//         timeout = setTimeout(function() {
//             timeout = null;
//             if (!immediate) func.apply(context, args);
//         }, wait);
//         if (immediate && !timeout) func.apply(context, args);
//     };
// }

function formatFilter(filterBy){
    if(!filterBy) return '';
    const filterKeys = Object.keys(filterBy);
    return filterKeys.map(key => `${key}=${filterBy[key]}`).join('&')
}

export const utilService = {
    makeId,
    getRandomInt,
    debounce,
    formatFilter
};

function debounce(callback, wait, immediate = false) {
    let timeout = null 
    
    return function() {
      const callNow = immediate && !timeout
      const next = () => callback.apply(this, arguments)
      
      clearTimeout(timeout)
      timeout = setTimeout(next, wait)
  
      if (callNow) {
        next()
      }
    }
  }
