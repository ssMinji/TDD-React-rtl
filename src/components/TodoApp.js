import React, { useState, useCallback, useRef } from 'react';
import TodoList from './TodoList';
import TodoForm from './TodoForm';

const TodoApp = () => {
    const [todos, setTodos] = useState([
        {
            id: 1,
            text: 'TDD trial',
            done: true
        },
        {
            id: 2,
            text: 'rtl use',
            done: true
        }

    ]);
    const nextId = useRef(3); // 새로 추가 할 항목에서 사용할 id

    const onInsert = useCallback(text => {
        setTodos(todos =>
            todos.concat({
                id: nextId.current,
                text,
                done: false
            })
        );
        nextId.current += 1;
    }, []);

    // setTodos 시 todos => 추가, useCallback 두번째 파라미터 비워줌
    // 따라서 onToggle, onRemove는 컴포넌트가 처음 렌더링할 때만 한 번 만들어지고, 그 이후에는 이미 만든 함수 재사용
    
    const onToggle = useCallback(id => {
        setTodos(todos =>
            todos.map(todo => todo.id === id ? { ...todo, done: !todo.done } : todo)
        );
    }, []);

    const onRemove = useCallback(id => {
        setTodos(todos => todos.filter(todo => todo.id !== id));
    }, []);

    return (
        <div>
            <TodoForm onInsert={onInsert}/>
            <TodoList todos={todos} onToggle={onToggle} onRemove={onRemove}/>
        </div>
    );
};

export default TodoApp;