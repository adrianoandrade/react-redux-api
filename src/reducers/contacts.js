import { LIST_CONTACTS, SET_CONTACT, SET_LOADING } from '../actions/types';

const initialState = {
    loading: false,
    contacts: {
        data: []
    },
    contact: {
        data: {}
    }
};

function reducer(state = initialState, action) {

    switch (action.type) {
        case SET_LOADING:
            return Object.assign({}, state, { loading: action.payload });
        case SET_CONTACT:
            return Object.assign({}, state, { contact: action.payload });
        case LIST_CONTACTS:
            return Object.assign({}, state, { contacts: action.payload });
        default:
            return state
    }

}

export default reducer