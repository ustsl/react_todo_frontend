//Сервис работы с бэкендом

class todoApi {
    _apiBase = 'https://todobackend.ustsl.ru/api/v1/';
    _apiKey = '';
    _limit = 3;

    //Вынесено в отдельный метод
    getResource = async(url, offset = 0, setArchive = 'False', setSorted = '-time_create') => {
        const headers = {
            'Content-type': 'application/json',
        }

        const res = await fetch(`${url}?limit=${this._limit}&offset=${offset}&is_done=${setArchive}&sorting=${setSorted}`, {
            method: 'GET',
            headers: headers
        });

        if (!res.ok) {
            throw new Error(`Нет доступа к ${url}, статус: ${res.status}`);
        }

        return await res.json();
    }

    postResource = async(url, title = null, content = null, isDone = null, token, method = 'POST') => {

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
    getTaskList = async(offset, archive, olderTasks) => {
        console.log(olderTasks)
        let setArchive = 'False'
        let setSorted = '-time_create'
        if (archive) {
            setArchive = 'True'
        }
        if (olderTasks) {
            setSorted = 'time_create'
        }
        const res = await this.getResource(this._apiBase, offset, setArchive, setSorted);
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
        return res;
    }

    //Удаление таска
    delTask = async(pk) => {
        const
            token = await this.getToken(),
            url = `${this._apiBase}${pk}/delete`,
            method = 'PUT';

        const res = await this.postResource(url, null, null, null, token, method);
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