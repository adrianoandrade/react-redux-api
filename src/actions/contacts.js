import { LIST_CONTACTS, CREATE_CONTACT, SET_CONTACT, UPDATE_CONTACT, DELETE_CONTACT, SET_LOADING } from './types';

import ContactsService from '../services/contacts';

export async function setContact(obj) {

    return dispatch => {
        dispatch({ type: SET_CONTACT, payload: obj })
    }

}

export async function listContacts() {
    return async (dispatch) => {
        dispatch({ type: SET_LOADING, payload: true });
        let result = await ContactsService.list();
        const { error, data } = result;
        dispatch({ type: SET_LOADING, payload: false });
        return dispatch({ type: LIST_CONTACTS, payload: { error, data } })
    }
}

export async function getContact(idContact) {
    return async (dispatch) => {
        dispatch({ type: SET_LOADING, payload: true });
        let result = await ContactsService.get(idContact);
        const { error, data } = result;
        data.error = error;
        dispatch({ type: SET_LOADING, payload: false });
        return dispatch({ type: SET_CONTACT, payload: { error, data } })
    }
}

export async function createContact(objContact) {
    return async (dispatch) => {
        dispatch({ type: SET_LOADING, payload: false });
        let result = await ContactsService.create(objContact);
        const contact = result.data;
        dispatch(await listContacts());
        return dispatch({ type: CREATE_CONTACT, payload: contact })
    }
}

export async function updateContact(objContact) {

    let result = await ContactsService.update(objContact);
    const contact = result.data;

    return async (dispatch) => {
        dispatch(await listContacts());
        return dispatch({ type: UPDATE_CONTACT, payload: contact })
    }

}

export async function deleteContact(objContact) {
    return async (dispatch) => {
        dispatch({ type: SET_LOADING, payload: false });
        let result = await ContactsService.delete(objContact);
        result = result.data;
        dispatch(await listContacts());
        return dispatch({ type: DELETE_CONTACT, payload: result })
    }
}