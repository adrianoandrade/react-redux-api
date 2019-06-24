import axios from 'axios';

const host = 'http://localhost:8098';

export default class ContactsService {

    static async list() {
        try {
            const payload = await axios.get(`${host}/contacts`);
            const { data } = payload.data;
            return { error: false, data };
        } catch (error) {
            console.log('error', error);
            return { error: true, data: [] };
        }
    }

    static async get(idContact) {
        try {
            const payload = await axios.get(`${host}/contacts/${idContact}`);
            const { data } = payload.data;
            return { error: false, data };
        } catch (error) {
            console.log('error', error);
            return { error: true, data: {} };
        }
    }

    static async create(objContact) {
        try {
            const payload = await axios.post(`${host}/contacts`, objContact);
            const { data } = payload.data;
            return { error: false, data };
        } catch (error) {
            console.log('error', error);
            return { error: true };
        }
    }

    static async update(objContact) {
        try {
            const payload = await axios.put(`${host}/contacts`, objContact);
            const { data } = payload.data;
            return { error: false, data };
        } catch (error) {
            console.log('error', error);
            return { error: true };
        }
    }

    static async delete(objContact) {
        try {
            const payload = await axios.delete(`${host}/contacts`, { data: objContact });
            const { data } = payload.data;
            return { error: false, data };
        } catch (error) {
            console.log('error', error);
            return { error: true };
        }
    }

}
