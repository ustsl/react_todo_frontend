//Сервис работы с бэкендом

class todoApi {
    _apiBase = 'https://todobackend.ustsl.ru/api/v1/';
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

    postResource = async(url, title, content, isDone, token, method = 'POST') => {

        let headers = {
            'Content-type': 'application/json',
        }

        if (token) {
            token = `Token ${token}`;
            headers['Authorization'] = token
        }

        const res = await fetch(url, {
            method: method,
            body: JSON.stringify({
                title: title,
                content: content,
                is_done: isDone
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
            link = this._apiBase + '/archive/'
        }
        const res = await this.getResource(link, offset);
        return res;
    }

    //Отправка таска
    postTask = async(title, content) => {
        const token = await this.getToken(),
            isDone = false;
        const res = await this.postResource(this._apiBase, title, content, isDone, token);
        return res;
    }

    //Отправка таска
    putTask = async(pk, title, content, isDone) => {

        const token = await this.getToken(),
            url = `${this._apiBase}${pk}/`,
            method = 'PUT';
        const res = await this.postResource(url, title, content, isDone, token, method);
        console.log(res)
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