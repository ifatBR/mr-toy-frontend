export const reviewService={
    getEmptyReview,
    save
}

function getEmptyReview(){
    return {
        username:null,
        txt:'',
        rating:0,
        createdAt:null
    }
}

function save(review) {
    return httpService.post('review/', review)
}