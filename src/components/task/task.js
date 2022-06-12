import { useEffect } from 'react';
import useGlobalSetState from '../../hooks/abstractState.hook'
import todoApi from '../../services/todoApi';
import Spinner from '../spinner/spinner';
import Error from '../error/error';
import './style.css';

const Task = (props) => {

    const tasks = useGlobalSetState([])
    const loading = useGlobalSetState(true);
    const errorMessage = useGlobalSetState(false);
    const offset = useGlobalSetState(0);
    const previous = useGlobalSetState (true);
    const next = useGlobalSetState (true);

    const todoApiObj = new todoApi();

    useEffect(() => {

        if (props.reload) {
            offset.onChange(0);
        }

        onTodoLoading();
    }, [offset.value, props.reload]);
    
    
    const onTodoListLoaded = (res) => {
        tasks.onChange(res.results);
        loading.onChange(false);
        next.onChange(res.next === null);
        previous.onChange(res.previous === null);
    }

    const onTodoLoading = () => {
        loading.onChange(true);
        todoApiObj.getTaskList(offset.value, props.archive, props.olderTasks, props.searchQuery)
        .then(onTodoListLoaded)
        .then(props.onLoading(false))
        .catch(onError)
    }

    const onIsDone = (pk, title, content, isDone) => {
        loading.onChange(true);
        todoApiObj.putTask(pk, title, content, isDone)
        .then(props.onLoading(true))
        .catch(onError)
    }

    const onIsDeleted = (pk) => {
        loading.onChange(true);
        todoApiObj.delTask(pk)
        .then(props.onLoading(true))
        .catch(onError)
    }


    const onPagination = (newOffset) => {
        offset.onChange(offset.value + newOffset);
    }

    const onError = () => {
        error.onChange(true);
    }

    const isStaffElem = (pk, title, content, archive) => {
        let textContent = 'Архивировать'
        if (archive) {
            textContent = 'Вернуть задачу'
        }
        
        
        return (
        <div className="card-footer">
            <button type="submit" className="btn btn-light btn-sm" 
            onClick={() =>onIsDone(pk, title, content, !archive)}>
                {textContent}
            </button>


            <button type="submit" className="btn btn-light btn-sm " 
            onClick={() =>onIsDeleted(pk)}>
                <span className="text-danger">Удалить</span>
            </button>
            
          
        </div>
        )
    }

    const renderItems = (arr) => {

        const items =  arr.map((item) => {  

            let pk = item.pk,
                content = item.content,
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

           const isStaff = (props.isStaff) ? isStaffElem(pk, title, content, props.archive) : null;
            
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

                        {isStaff}
                        
                    </div>                        
                </div>
            )
        });
        if (items.length > 0) {
            return (
                <div className="row">
                  {items}
                </div>
            )
        }

        return  (
            <h2> Тасков не найдено</h2>
        )
           
        
        
    }
        
        const items = renderItems(tasks.value);
        const spinner = loading.value ? <Spinner/> : null;
        const error = errorMessage.value ? <Error/> : null;
        const content = !(loading.value || error )? items : null;



        return (                
                <>
                    {spinner}
                    {error}
                    {content}       
                    
                    <div className="btn-group mb-4 pt-3 text-center mx-auto d-block">
                      <button className="btn btn-primary" disabled = {previous.value} aria-current="page"
                       onClick={() => onPagination(-3)} > &lt; Назад </button>

                      <button className="btn btn-info" disabled = {next.value} 
                      onClick={() => onPagination(3)}> Вперед &gt; </button>
                    </div>                                       
                </>      
        );

}

export default Task;