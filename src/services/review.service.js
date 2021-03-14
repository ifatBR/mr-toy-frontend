import {httpService} from './http.service.js'
import {utilService} from './util.service.js'
export const reviewService = {
    getEmptyReview,
    save,
    query
};

function getEmptyReview() {
    return {
        id: null,
        userId:null,
        toyId:null,
        txt: '',
        rating: 1,
        createdAt: null,
    };
}

async function save(review){
    review.id = utilService.makeId();
    return httpService.post(`review/`, review)
}

async function query(filterBy){
    try{
    const filterStr = utilService.formatFilter(filterBy)
    const reviews =  await httpService.get('review/?'+filterStr)
    return reviews
    }catch(err){
        throw err
    }
}

