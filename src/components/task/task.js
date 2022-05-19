import { Component } from 'react';
import todoApi from '../../services/todoApi';
import Spinner from '../spinner/spinner';
import Error from '../error/error';
import './style.css';

class Task extends Component {

    state = {
        tasks: [],
        loading: true,
        reload: false,
        errorMessage: false,
        offset: 0,
        previous: true,
        next: true,
        archive: false,
    }

    todoApiObj = new todoApi();
    
    componentDidMount() {
        this.onTodoLoading();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.archive !== this.state.archive) {
            this.archiveUnarchive();
          }
        if (this.props.reload === true) {
          this.offsetReload();
        }
        if (this.state.reload === true) {
          this.onTodoLoading();
        }

    }

    onTodoLoading() {

        this.props.onLoading(false);
        this.onTodoReload();
        this.todoApiObj.getTaskList(this.state.offset, this.state.archive)
        .then(this.onTodoListLoaded)
        .then(this.props.onLoading(false))
        .catch(this.onError)
    }


    boolFunc = (elem) => {
        if(elem) {
            return
        } 
        return true
    }

    onTodoListLoaded = (res) => {

        this.setState({
            tasks: res.results,
            loading: false,
            next: this.boolFunc(res.next),
            previous: this.boolFunc(res.previous),
        })
    }

    onTodoReload = () => {
        this.setState({
            loading:true,
            reload: false,
        })
    }

    onPagination = (offset) => {
        this.setState({
            offset: this.state.offset + offset,
            reload: true
        })
    }

    offsetReload = () => {
        this.setState({
            offset: 0,
            reload: true,
        })
    }

    archiveUnarchive = () => {
        this.setState({
            archive: this.props.archive
        })
    }

    onError = () => {
        this.setState({
            errorMessage: true,
            loading: false
        })
    }

    renderItems(arr) {
        const items =  arr.map((item) => {  

            let content = item.content,
                title = item.title,
                email = item.get_mail; 


            function sliceFunc (obj, param) {
                let data_obj = obj
                if (obj.length > param) {
                    data_obj = data_obj.slice(0, param) + '...'}
                return data_obj
            }

            title = sliceFunc(title, 15)
            content = sliceFunc(content, 250)
            email = sliceFunc(email, 20)
            
        
            return (
                <div className="col-lg-4 col-12 pb-2" key={item.pk}>                        
                    <div className="card card200">
                        <div className="card-header">
                            {email}
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">{title}</h5>
                            <p className="card-text">{content}</p>
                           
                        </div>
                    </div>                        
                </div>
            )
        });

        return (
            <div className="row">
              {items}
            </div>
        )
    }


   
    render() {

        const {tasks, loading, errorMessage, next, previous} = this.state;
        const items = this.renderItems(tasks);
        const spinner = loading ? <Spinner/> : null;
        const error = errorMessage ? <Error/> : null;
        const content = !(loading || error) ? items : null;

        return (                
                <>
                    {spinner}
                    {error}
                    {content}       
                    <div className="btn-group mb-4 pt-3 text-center mx-auto d-block">
                      <button className="btn btn-primary" disabled = {previous} aria-current="page" onClick={() => this.onPagination(-3)} > &lt; Назад </button>
                      <button className="btn btn-info" disabled = {next} onClick={() => this.onPagination(3)}> Вперед &gt; </button>
                    </div>                                       
                </>      
        );
    }
}

export default Task;