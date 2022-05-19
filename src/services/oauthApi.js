class oauthApi {
    _apiBase = 'https://todobackend.ustsl.ru/auth/token/login';
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

    //Получаем и устанавливаем токен
    credentialEntry = async(login, password) => {
        localStorage.clear();
        const res = await this.getToken(this._apiBase, login, password);
        if (res['auth_token']) {
            localStorage.setItem('auth_token', res['auth_token']);
            localStorage.setItem('login', login);
        }

        return res;
    }
}


export default oauthApi;