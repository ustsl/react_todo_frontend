import useGlobalSetState from '../../hooks/abstractState.hook'

function switchValue (firstObj, secondObj) {
    firstObj.onChange('nav-link active');
    secondObj.onChange('nav-link');
}

const Nav = (props) => {

    const activeStyle = useGlobalSetState('nav-link active');
    const archiveStyle = useGlobalSetState('nav-link');
  
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
                            aria-current="page" href="/" onClick={activeTasks}>Актуальные задачи</a>
                        </li>
                        <li className="nav-item">
                            <a className={archiveStyle.value} href="/" onClick={archiveTasks}>Выполненные задачи</a>
                        </li>                        
                    </ul>
                </div>
            </div>
        </nav>
    );       
}

export default Nav;