import {type FormEvent, useState} from "react";
import {useTodo} from '../context/TodoContext';

const TodoForm = () => {
    const [input, setInput] = useState<string>(''); //입력값 상태
    const {addTodo}=useTodo();
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); //추가버튼 누를때 페이지 리로드 방지
        console.log('동작함');
        const text= input.trim(); //입력받을때 공백 제거

        if (text){
            addTodo(text); //context 함수로 할 일 추가
            setInput(''); //입력창 초기화
        }
    };
    return (
        <form onSubmit={handleSubmit} className='todo-container__form'>
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)} //입력값 변화 감지?
                type='text'
                className='todo-container__input'
                placeholder='할 일 입력'
                required
            />
            <button type='submit' className='todo-container__button'>
                할 일 추가
            </button>
        </form>
    );
};

export default TodoForm;