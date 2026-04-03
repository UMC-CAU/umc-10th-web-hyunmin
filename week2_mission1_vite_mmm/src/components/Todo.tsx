import TodoForm from "./TodoForm";
import TodoList from './TodoList';
import { useTodo} from "../context/TodoContext.tsx";

const Todo = () => {
    const {todos, completeTodo, deleteTodo,
        doneTodos}=useTodo();

    return <div className='todo-container'>
        <h1 className='todo-container__header'>Hyunmin's TODO</h1> <TodoForm /> {/*할 일 입력 폼*/}
        <div className='render-container'>
            {/*할 일 목록*/}
            <TodoList title='할 일'
                      todos={todos}
                      buttonLabel='완료'
                      onClick={completeTodo}/>
            {/*완료된 할 일 목록*/} <TodoList title='완료'
                                       todos={doneTodos}
                                       buttonLabel='삭제'
                                       onClick={deleteTodo}/>
        </div>
    </div> };
export default Todo;