import { useEffect, useState, } from 'react';
import oauthApi from '../../services/oauthApi';


const Oauth = (props) => {

    const [email, setEmail] = useState('')
    const [isStaff, setIsStaff] = useState(false)
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useState('')
    const [formError, setFormError] = useState(null)
    
    const oauthObj = new oauthApi();

    useEffect(() => {
        getToken()
    }, []);


    const cleanForm = () => {
        setLogin('')
        setPassword('')
        setToken('')
        setFormError(null)
    }    

    const errorForm = () => {
        localStorage.clear()
        setFormError('Неправильная пара логин пароль')
        setLogin('')
        setPassword('')
        setToken('')
    }    
   
    const onSubmit = (e) => {
        e.preventDefault();    
        oauthObj.credentialEntry(login, password)
        .then(getToken)
        .catch(errorForm)
    }

    const getToken = () => {
        setToken(localStorage.getItem('auth_token'))
        setLogin(localStorage.getItem('login'))
        setEmail(localStorage.getItem('email'))
        setIsStaff(localStorage.getItem('is_staff'))
        props.changeStaff(localStorage.getItem('is_staff'))
    }

    const onExit = () => {
        localStorage.clear()
        props.changeStaff(false)
        cleanForm()
    }


    const renderAuth = () => {

        let userStatus = 'Пользователь'
        if (isStaff) {
            userStatus = 'Администратор'
        }

        if (token) {
             return (
                <>
                <p className="small">Вы авторизованы. Статус - {userStatus}</p><h2 className="mb-4">{email} </h2>
                
                <button type="submit" class="btn btn-primary" onClick={onExit}>Выйти</button>
                 </>                
            )
        }
        return
    
    }



    const renderForm = () => {
        
        const renderFormError = formError ? <div className="text-danger mb-3">Неправильная пара логин-пароль</div> : null;
         
        return (
            <form onSubmit = {onSubmit}>
                <div className="mb-3">                                            
                    <input type="text" 
                    className="form-control" 
                    placeholder="Введите логин"
                    name="login"
                    value={login}
                    onChange={(e) => setLogin (e.target.value)}/>
                </div>

                <div className="mb-3">
                    <input type="password" 
                    className="form-control" 
                    placeholder="Введите пароль"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword (e.target.value)}/>
                </div>

                {renderFormError}

                <button type="submit" class="btn btn-primary">Авторизоваться</button>
            </form>          
    )
    }


        const auth = token ? renderAuth() : null
        const form = !token ? renderForm() : null;

        return (
            <>
             {auth}
             {form}
            </>  
        );

}

export default Oauth;