import {BASE_API_PATH} from "../config/constants";

class BaseService {
    basePath = '';

    constructor() {
        this.basePath = BASE_API_PATH
    }

    _buildUrl(path) {
        return `${this.basePath}${path}`;
    }

    async apiGet(path) {
        const data = await fetch(this._buildUrl(path), {
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            }
        });
        return await data.json();
    }

    async apiPost(path, data) {
        const response = await fetch(this._buildUrl(path), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            },
            body: JSON.stringify(data)
        });
        return response.json();
    }

    async apiPut(path, data) {
        const response = await fetch(this._buildUrl(path), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            },
            body: JSON.stringify(data)
        });
        return response.json();
    }

    async apiPatch(path, data) {
        const response = await fetch(this._buildUrl(path), {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            },
            body: JSON.stringify(data)
        });
        return response.json();
    }

    async apiDelete(path, data) {
        const response = await fetch(this._buildUrl(path), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            },
            body: JSON.stringify(data)
        });
        return response.json();
    }
}

export default BaseService;
