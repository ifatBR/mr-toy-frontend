export const reviewService = {
    getEmptyReview,

};

function getEmptyReview() {
    return {
        username: null,
        userId:null,
        txt: '',
        rating: 1,
        createdAt: null,
    };
}

// const userReviews = [
//     {
//         "txt": "ok",
//         "rating": 3,
//         "createdAt": 123456789,
//         "toyId": "604a213e410faf7b210b0ddf",
//     },
//     {
//         "txt": "lovley",
//         "rating": 5,
//         "createdAt": 123456789,
//         "toyId": "604a213e410faf7b210b0dd8",
//     },
//     {
//         "txt":"ugly",
//         "rating": 1,
//         "createdAt": 123456789,
//         "toyId": "604a213e410faf7b210b0dda",
//     },
// ];

// const toyReviews = [
//     {
//         "username": 'kuki',
//         "userId": '604b1df4d8ac0539a0f052dd',
//         "txt": "good",
//         "rating": 3,
//         "createdAt": 123456789
//     },
//     {
//         "username": 'muki',
//         "userId": "604b20fed8ac0539a0f052de",
//         "txt": "horrible",
//         "rating": 0,
//         "createdAt": 123456789
//     }
// ];
