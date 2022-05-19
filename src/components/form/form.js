import { Component } from 'react';
import todoApi from '../../services/todoApi';

class Form extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
        }
    }

    todoApiObj = new todoApi();

    onValueChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        })

    }

    cleanForm = () => {
        this.setState({
            title: '',
            content: '',
        })
    }
    
   
    onSubmit = (e) => {
        e.preventDefault();       
        this.todoApiObj.postTask(this.state.title, this.state.content)
        .then(this.cleanForm())
        .then(this.props.onLoading(true))        
        .catch(this.onError)
    }

    render() {

        const {title, content} = this.state;

        return (
            
            <form
            onSubmit = {this.onSubmit}>
                <div className="mb-3">
                                        <input type="text"
                        className="form-control"
                        id="exampleFormControlInput1"
                        placeholder="Введите тайтл таска"
                        name="title"
                        value={title}
                        onChange={this.onValueChange} />
                </div>
                <div className="mb-3">
                    
                    <textarea className="form-control"
                        id="exampleFormControlTextarea1" 
                        placeholder="Введите текст задачи..."
                        rows="2"
                        name="content"
                        value={content}                        
                        onChange={this.onValueChange}></textarea>
                </div>
                <button className="btn btn-success">Опубликовать задачу</button>
            </form>
        );
    }
}

export default Form;