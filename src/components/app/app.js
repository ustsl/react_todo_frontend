import './app.css';

import useGlobalSetState from '../../hooks/abstractState.hook'

import Task from '../task/task';
import Form from '../addTask/addTask';
import Oauth from '../oauth/oauth';
import Nav from '../navigation/nav';


const App = () => {
    
    const archive = useGlobalSetState(false);
    const reload = useGlobalSetState(false);
    const isStaff = useGlobalSetState(false);


    const onLoading = (res) => {
        reload.onChange(res);
    }

    const onArchive = (res) => {
        reload.onChange(true);
        archive.onChange(res);
    }

    const changeStaff = (res) => {
        isStaff.onChange(res);
        reload.onChange(true)
    }


    return (
            <div className="container">
                <Nav onArchive={onArchive}/>
                <div className="container my-5">
                    <div className="row">
                        <div className="col-12 col-lg-7">                           
                                <Task 
                                reload={reload.value}
                                archive={archive.value}
                                onLoading={onLoading}
                                isStaff={isStaff.value}/>                               
                        </div>
                        <div className="col">
                            <div className="card mb-4">
                                <div className="card-header">
                                    Постановка задачи
                                </div>
                                <div className="card-body">
                                    <Form onLoading={onLoading}/>
                                </div>
                            </div>    
                            <div className="card">
                                <div className="card-header">
                                    Авторизация
                                </div>
                                <div className="card-body">
                                    <Oauth changeStaff={changeStaff}/>
                                </div> 
                            </div>    
                        </div>             
                    </div>
                </div>
            </div>
    );
   
}

export default App;