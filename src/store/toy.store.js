import { reviewService } from '../services/review.service.js';
import { toyService } from '../services/toy.service.js';
export const toyStore = {
    state: {
        toys: [],
        allToys:[],
        isLoading: false,
        filterBy: { name: "", inStock: "all", types: [], sortBy: "name", pageDiff:0 },
    },
    getters: {
        toysToShow(state) {
            return state.toys
        },
        allToys(state){
            return state.allToys
        },
        isLoading(state){
            return state.isLoading;
        },
        types(state){
            const types = state.allToys.map(toy=> toy.type)
            return [...new Set(types)];
        },
        filterBy(state){
            return state.filterBy
          }
    },
    mutations: {
        setToys(state, payload) {
            state.toys = payload.toys;
            state.allToys = payload.allToys
        },
        addToy(state, { toy }) {
            // state.toys.push(toy);
        },
        updateToy(state, { toy }) {
            const idx = state.toys.findIndex((t) => t._id === toy._id);
            state.toys.splice(idx, 1, toy);
        },
        removeToy(state, { toyId }) {
            const idx = state.toys.findIndex((t) => t._id === toyId);
            state.toys.splice(idx, 1);
        },
        setIsLoading(state, {isLoading}) {
            state.isLoading = isLoading;
        },
    },
    actions: {
        loadToys({ commit }) {
            commit({ type: 'setIsLoading', isLoading: true });
            toyService
                .query()
                .then(({toys, allToys}) => {
                    commit({ type: 'setToys', toys, allToys });
                })
                .catch((err) => {
                    console.log('Store: Cannot load toys', err);
                    throw new Error('Cannot load toys');
                })
                .finally(() => commit({ type: 'setIsLoading', isLoading: false }));
        },

        saveToy(context, { toy }) {
            // const type = toy._id ? 'updateToy' : 'addToy';
            return toyService
                .save(toy)
                .then((savedToy) => {
                    // context.commit({ type, toy: savedToy });
                    if(toy._id) context.commit({ type:'updateToy', toy: savedToy })

                })
                .catch((err) => {
                    console.log('Store: Cannot save toy', err);
                    throw new Error('Cannot save toy');
                });
        },
        removeToy(context, payload) {
            return toyService
                .remove(payload.toyId)
                .then(() => {
                    context.commit(payload);
                })
                .then(() => context.dispatch('loadToys'))
                .catch((err) => {
                    console.log('Store: Cannot remove toy', err);
                    throw new Error('Cannot remove toy');
                });
        },
        setFilter(context, {filterBy}){
            context.filterBy = filterBy;
            toyService.setFilter(filterBy)
            context.dispatch({type:'loadToys'})
                .then(() => context.filterBy.pageDiff = 0)
        },
        saveReview(context, {review,toy}){
            console.log(review);
            console.log(toy);
            reviewService.save()
        }
    },
};
