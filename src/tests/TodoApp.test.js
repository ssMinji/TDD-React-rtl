import React from 'react';
import TodoApp from '../components/TodoApp';
import { render, fireEvent } from '@testing-library/react';

describe('<TodoApp />', () => {
    it('renders TodoForm and TodoList', () => {
        const { getByText, getByTestId } = render(<TodoApp />);
        getByText('등록');
        getByTestId('TodoList');
    });
    it('renders two default todos', () => {
        const { getByText } = render(<TodoApp />);
        getByText('TDD trial');
        getByText('rtl use');
    });
    it('creates new todo', () => {
        const { getByPlaceholderText, getByText } = render(<TodoApp />);

        fireEvent.change(getByPlaceholderText('할 일을 입력하세요'), {
            target: {
                value: '새 항목 추가'
            }
        });
        fireEvent.click(getByText('등록'));
        getByText('새 항목 추가');
    });
    it('toggles todo', () => {
        const { getByText } = render(<TodoApp />);
        const todoText = getByText('TDD trial');
        expect(todoText).toHaveStyle('text-decoration: line-through;');
        fireEvent.click(todoText);
        expect(todoText).not.toHaveStyle('text-decoration: line-through;');
        fireEvent.click(todoText);
        expect(todoText).toHaveStyle('text-decoration: line-through;');
    });
    it('removes todo', () => {
        const { getByText } = render(<TodoApp />);
        const todoText = getByText('TDD trial');
        const removeButton = todoText.nextSibling;
        fireEvent.click(removeButton);
        expect(todoText).not.toBeInTheDocument(); //페이지에서 사라졌음을 의미
    });
});