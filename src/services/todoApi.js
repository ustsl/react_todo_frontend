//Сервис работы с бэкендом

class todoApi {
    _apiBase = 'https://todobackend.ustsl.ru/api/v1';
    _apiKey = '';
    _limit = 3;

    //Вынесено в отдельный метод
    getResource = async(url, offset = 0) => {
        const headers = {
            'Content-type': 'application/json',
        }

        const res = await fetch(`${url}?limit=${this._limit}&offset=${offset}`, {
            method: 'GET',
            headers: headers
        });

        if (!res.ok) {
            throw new Error(`Нет доступа к ${url}, статус: ${res.status}`);
        }

        return await res.json();
    }

    postResource = async(url, title, content, token) => {

        let headers = {
            'Content-type': 'application/json',
        }

        if (token) {
            token = `Token ${token}`;
            headers['Authorization'] = token
        }

        const res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                title: title,
                content: content
            }),
            headers: headers
        });

        if (!res.ok) {
            throw new Error(`Нет доступа к ${url}, статус: ${res.status}`);
        }

        return await res.json();
    }

    //Получаем лист тасков
    getTaskList = async(offset, archive) => {
        let link = this._apiBase;
        if (archive) {
            link = this._apiBase + '/archive'
        }
        const res = await this.getResource(link, offset);
        return res;
    }

    //Получаем лист тасков
    postTask = async(title, content) => {
        const token = await this.getToken()
        const res = await this.postResource(this._apiBase, title, content, token);
        return res;
    }

    getToken = async() => {

        if (localStorage.getItem('auth_token')) {
            return localStorage.getItem('auth_token')
        }
        return
    }

}

export default todoApi;