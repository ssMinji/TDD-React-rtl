import React from 'react';
import TodoForm from '../components/TodoForm';
import { render, fireEvent } from '@testing-library/react';

describe('<TodoForm />', () => {
    const setup = (props = {}) => {
        const utils = render(<TodoForm {...props} />);
        const { getByText, getByPlaceholderText } = utils;
        const input = getByPlaceholderText('할 일을 입력하세요'); // input 있는지 확인
        const button = getByText('등록'); // button 있는지 확인
        return {
            ...utils,
            input,
            button
        };
    };


    it('has input and a button', () => {
        const { input, button } = setup();
        expect(input).toBeTruthy(); // 해당 값이 truthy한 값인지 확인
        expect(button).toBeTruthy();
    });
    it('changes input', () => {
        const { input } = setup();
        fireEvent.change(input, {
            target: {
                value: 'TDD 배우기'
            }
        });
        expect(input).toHaveAttribute('value', 'TDD 배우기');
    });
    it('calls onInsert and clears input', () => {
        const onInsert = jest.fn(); // jest에서 제공하는 mock 함수 
        const { input, button } = setup({ onInsert }); // props가 필요할 땐 직접 파라미터로 전달 

        // input 수정
        fireEvent.change(input, {
            target: {
                value: 'TDD trial'
            }
        });

        // 버튼 클릭
        fireEvent.click(button);
        expect(onInsert).toBeCalledWith('TDD trial'); // onInsert가 'TDD trial' 파라미터 호출됐어야 함
        expect(input).toHaveAttribute('value', ''); // input 비우기
    });
});