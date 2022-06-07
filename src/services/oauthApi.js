class oauthApi {
    _apiBaseToken = 'https://todobackend.ustsl.ru/auth/token/login';
    _apiBaseGetUser = 'https://todobackend.ustsl.ru/api/v1/get_user';
    _apiKey = '';

    getToken = async(url, login, password) => {
        const headers = {
            'Content-type': 'application/json',
        }

        const res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                username: login,
                password: password
            }),
            headers: headers
        });

        if (!res.ok) {
            throw new Error(`Нет доступа к ${url}, статус: ${res.status}`);
        }
        return await res.json();
    }


    //Вынесено в отдельный метод
    getUser = async(url, token) => {
        const headers = {
            'Content-type': 'application/json',
            'Authorization': `Token ${token}`
        }

        const res = await fetch(`${url}?`, {
            method: 'GET',
            headers: headers
        });

        if (!res.ok) {
            throw new Error(`Нет доступа к ${url}, статус: ${res.status}`);
        }

        return await res.json();
    }

    //Получаем и устанавливаем токен
    credentialEntry = async(login, password) => {
        localStorage.clear();
        const res = await this.getToken(this._apiBaseToken, login, password);
        if (res['auth_token']) {
            localStorage.setItem('auth_token', res['auth_token']);
            localStorage.setItem('login', login);
            const user = await this.getUser(this._apiBaseGetUser, res['auth_token'])
            localStorage.setItem('email', user['email']);
            localStorage.setItem('is_staff', user['is_staff']);
        }

        return res;
    }
}


export default oauthApi;