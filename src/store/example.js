export default {
    state: {
        example_msg: 'Example from Vuex',
    },
    mutations: {},
    actions: {},
    getters: {
        getMessage(state) {
            return state.example_msg;
        },
    },
};
