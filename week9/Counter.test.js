import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import Counter from '../components/Counter';

describe('Counter', () => {
    
    let container;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
        render(<Counter count={5} />);
    })
    
    const render = component => ReactDOM.render(component, container);

    it('displays the counter', () => {
        expect(container.querySelector('#display-count').textContent).toMatch('5');
    });

    it('increases the counter', () => {
        const button = container.querySelector('#increase-count');
        ReactTestUtils.Simulate.click(button);
        expect(container.querySelector('#display-count').textContent).toMatch('6');
    });

    it('decreases the counter', () => {
        const button = container.querySelector('#decrease-count');
        ReactTestUtils.Simulate.click(button);
        expect(container.querySelector('#display-count').textContent).toMatch('4');
    });

    it('clears the counter', () => {
        const button = container.querySelector('#clear-count');
        ReactTestUtils.Simulate.click(button);
        expect(container.querySelector('#display-count').textContent).toMatch('0');
    });

    it('does not decrease the counter past zero', () => {
        let button = container.querySelector('#clear-count');
        ReactTestUtils.Simulate.click(button);
        button = container.querySelector('#decrease-count');
        ReactTestUtils.Simulate.click(button);
        expect(container.querySelector('#display-count').textContent).toMatch('0');
    });
})