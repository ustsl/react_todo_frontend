import { Component } from 'react';

import './app.css';
import '../../bootstrap.css';

import Task from '../task/task';
import Form from '../form/form';
import Oauth from '../oauth/oauth';

class App extends Component {

    state = {
        reload: false,
        archive: false,
    }

    onLoading = (res) => {
        this.setState ({
            reload: res,
        })
    }

    activeTasks = (e) => {
        e.preventDefault();   
        this.setState ({
            archive: false,
            reload: true,
        })
    }

    archiveTasks = (e) => {
        e.preventDefault();   
        this.setState ({
            archive: true,
            reload: true,
        })
    }

    render() {

        return (
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/">TODO</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="#" onClick={this.activeTasks}>Актуальные задачи</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#" onClick={this.archiveTasks}>Выполненные задачи</a>
                                </li>                        
                            </ul>
                        </div>
                    </div>
                </nav>

                <div className="container my-5">
                    <div className="row">
                        <div className="col-12 col-lg-7">
                           
                                <Task 
                                reload={this.state.reload}
                                archive={this.state.archive}
                                onLoading={this.onLoading}/>                                
    
                        </div>
                        <div className="col">
                            <div className="card mb-4">
                                <div className="card-header">
                                    Постановка задачи
                                </div>
                                <div className="card-body">
                                    <Form onLoading={this.onLoading}/>
                                </div>
                            </div>    
                            <div className="card">
                                
                                <div className="card-header">
                                    Авторизация
                                </div>
                                <div className="card-body">
                                    <Oauth/>
                                </div>
                                
                            </div>    
                        </div>             
                    </div>
                </div>
            </div>
        );
    }
}

export default App;