import type {TTodo} from '../types/todo';
import {createContext, type PropsWithChildren, useContext, useState} from "react";

/*ITodoContext인터페이스
-context안에 들어갈 데이터와 함수 모양 미리 정의
-ts에서 이렇게 타입 정의하면 안전하게 사용가능
*/
interface ITodoContext {
    todos: TTodo[]; //아직 완료되지 않은 할 일 배열
    doneTodos: TTodo[]; //완료된 할 일
    addTodo: (text: string) => void; //새 할 일 추가하는 함수
    completeTodo: (todo: TTodo) => void; //할 일 완료 처리하는 함수
    deleteTodo: (todo: TTodo) => void; //완료된 할 일 삭제하는 함수
}
//context생성: 전역 상태,함수
export const TodoContext = createContext<ITodoContext | undefined>(undefined);

/*TodoProvider
-자식 컴포넌트를 감싸서 전역 상태와 함수 사용 가능하게
*/
export const TodoProvider = ({children}:PropsWithChildren) => {
    const[todos,setTodos] = useState<TTodo[]>([]); //할 일 목록 상태
    const[doneTodos, setDoneTodos] = useState<TTodo[]>([]); //완료된 목록 상태

    //새 할 일 추가
    const addTodo=(text: string) => {
        const newTodo: TTodo = { id: Date.now(), text };
        setTodos((prevTodos) => [...prevTodos, newTodo]);
    };
    //할 일을 완료처리
    const completeTodo = (todo: TTodo) => {
        setTodos((prevTodos)=> prevTodos.filter((t) => t.id !== todo.id));
        setDoneTodos((prevDoneTodos) => [...prevDoneTodos, todo]);
    };
    //완료된 할 일 삭제
    const deleteTodo = (todo: TTodo) => {
        setDoneTodos((prevDoneTodos)=> prevDoneTodos.filter((t) => t.id !== todo.id));
    };

    return (<TodoContext.Provider //provider를 통해 컴포넌트들이 쓸 수 있는 상태와 함수 전달
            value={{todos,doneTodos,
                addTodo,completeTodo,deleteTodo}} >
            {children} </TodoContext.Provider>
    );
};
/*useTodo
-provider안에서만 사용 가능
-이렇게 해두면 todo컴포넌트에서 구조분해 할당 바로 가능
*/
export const useTodo = () => {
    const context = useContext(TodoContext);
    if (!context) { //컨텍스트가 없는경우
        throw new Error(
            'useTodo를 사용하기 위해선, 무조건 TodoProvider로 감싸야 합니다.'
        );
    }
    return context; //컨테스트 있는 경우
};
