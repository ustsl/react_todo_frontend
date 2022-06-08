import { useState } from 'react';
import todoApi from '../../services/todoApi';


const Form = (props) => {

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [error, setError] = useState(false)

    const todoApiObj = new todoApi();

    const cleanForm = () => {
        setTitle('')
        setContent('')
        setError(false)
    }
    
    const onSubmit = (e) => {
        e.preventDefault();       
        todoApiObj.postTask(title, content)
        .then(cleanForm())
        .then(props.onLoading(true))        
        .catch(onError)

    }

    const onError = () => {
        setError(true);
    }    

    const errorBlock  = error ? <div className="pb-3">Ошибка</div> : null;


    return (
            
            <form
            onSubmit = {onSubmit}>
                <div className="mb-3">
                                        <input type="text"
                        className="form-control"
                        id="exampleFormControlInput1"
                        placeholder="Введите тайтл таска"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle (e.target.value)} />
                </div>
                <div className="mb-3">
                    
                    <textarea className="form-control"
                        id="exampleFormControlTextarea1" 
                        placeholder="Введите текст задачи..."
                        rows="2"
                        name="content"
                        value={content}                        
                        onChange={(e) => setContent (e.target.value)}></textarea>
                </div>
                {errorBlock}
                <button className="btn btn-success">Опубликовать задачу</button>
            </form>
        );
}

export default Form;