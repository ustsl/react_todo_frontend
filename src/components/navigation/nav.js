import useGlobalSetState from '../../hooks/abstractState.hook'
import { useEffect } from 'react';

function switchValue(firstObj, secondObj) {
    firstObj.onChange('nav-link active');
    secondObj.onChange('nav-link');
}

const Nav = (props) => {

    const activeStyle = useGlobalSetState('nav-link active'),
        archiveStyle = useGlobalSetState('nav-link'),
        newTasksStyle = useGlobalSetState('nav-link active'),
        oldTasksStyle = useGlobalSetState('nav-link'),
        searchQuery = useGlobalSetState('');


    const onSubmit = (e) => {
        e.preventDefault();
        props.onSearch(searchQuery.value)
    }

    const activeTasks = (e) => {
        e.preventDefault();
        switchValue(activeStyle, archiveStyle)
        props.onArchive(false);
    }

    const archiveTasks = (e) => {
        e.preventDefault();
        switchValue(archiveStyle, activeStyle)
        props.onArchive(true);
    }

    const newTasks = (e) => {
        e.preventDefault();
        switchValue(newTasksStyle, oldTasksStyle)
        props.onOlderTasks(false);
    }

    const oldTasks = (e) => {
        e.preventDefault();
        switchValue(oldTasksStyle, newTasksStyle)
        props.onOlderTasks(true);
    }

    return (

        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">TODO</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className={activeStyle.value}
                                aria-current="page" href="#" onClick={activeTasks}>Актуальные задачи</a>
                        </li>
                        <li className="nav-item">
                            <a className={archiveStyle.value} href="#" onClick={archiveTasks}>Выполненные задачи</a>
                        </li>

                        <li className="nav-item">
                            <a className={newTasksStyle.value} href="#" onClick={newTasks}>Сначала новые</a>
                        </li>

                        <li className="nav-item">
                            <a className={oldTasksStyle.value} href="#" onClick={oldTasks}>Сначала старые</a>
                        </li>
                    </ul>




                    <form class="form-inline my-2 my-lg-0" onSubmit={onSubmit}>
                        <div className="row">
                            <div className='col-8'>
                                <input class="form-control mr-sm-2" type="search" placeholder="Поиск по мэйлам" 
                                onChange={(e) => searchQuery.onChange(e.target.value)}/></div>
                            <div className='col-4'>
                                <button
                                    class="btn btn-outline-success my-sm-0"
                                    type="submit">Искать</button></div>
                        </div>

                    </form>


                </div>


            </div>


        </nav>
    );
}

export default Nav;