import { Component } from 'react';
import oauthApi from '../../services/oauthApi';

class Oauth extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            is_staff: false,
            login: '',
            password: '',
            token: '',
        }
    }
    
    oauthObj = new oauthApi();

    componentDidMount() {
        this.getToken();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.token !== prevState.token) {
            this.getToken()
        }
    }

    onValueChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        })
        this.getToken()
    }

    cleanForm = () => {
        this.setState({
            login: '',
            password: '',
        })
    }    

    errorForm = () => {
        this.setState({
            login: 'Неправильная пара логин пароль',
            password: '',
        })
    }    
   
    onSubmit = (e) => {
        e.preventDefault();    
        this.oauthObj.credentialEntry(this.state.login, this.state.password)
        .then(this.getToken)
        .catch(this.errorForm)
    }

    getToken = () => {
        let token, login, email, is_staff;
        if (localStorage.getItem('auth_token')) {
            token = localStorage.getItem('auth_token')
            login = localStorage.getItem('login')
            email = localStorage.getItem('email')
            is_staff = localStorage.getItem('is_staff')
            this.setState({
                token: token,
                login: login,
                email: email,
                is_staff: is_staff
            })
        } 
    }

    onExit = () => {
        localStorage.clear();
        this.setState({
            token: '',
            login: '',
            password: '',
        })
    }


    renderAuth() {
        
        const {email, token, is_staff} = this.state;

        let userStatus = 'Пользователь'
        if (is_staff) {
            userStatus = 'Администратор'
        }

        if (token) {
             return (
                 <>
                <p className="small">Вы авторизованы, как {userStatus}</p><h2 className="mb-4">{email} </h2>
                
                <button type="submit" class="btn btn-primary" onClick={this.onExit}>Выйти</button>
                 </>                
            )
        }
        return
    
    }

    renderForm() {
        const {login, password} = this.state;
        return (
            <form onSubmit = {this.onSubmit}>
                <div className="mb-3">                                            
                    <input type="text" 
                    className="form-control" 
                    placeholder="Введите логин"
                    name="login"
                    value={login}
                    onChange={this.onValueChange}/>
                </div>
                <div className="mb-3">
                    <input type="password" 
                    className="form-control" 
                    placeholder="Введите пароль"
                    name="password"
                    value={password}
                    onChange={this.onValueChange}/>
                </div>
                <button type="submit" class="btn btn-primary">Авторизоваться</button>
            </form>          
    )
    }

    render() {


        const {token} = this.state;

        const auth = token ? this.renderAuth() : null
        const form = !token ? this.renderForm() : null;

        return (
            <>
             {auth}
             {form}
            </>  
        );
    }
}

export default Oauth;