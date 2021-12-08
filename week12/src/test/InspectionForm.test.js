import React from 'react';
import { createContainer } from './domManipulators';
import ReactTestUtils from 'react-dom/test-utils';
import InspectionForm from '../components/InspectionForm';

describe('Counter', () => {
    let render, container;

    beforeEach(() => {
        ({ render, container } = createContainer());
        render(<InspectionForm />);
    });

    const form = id => container.querySelector(`form[id="${id}"]`);
    const field = name => form('inspection-form').elements[name];
    const labelFor = formElement => container.querySelector(`label[for="${formElement}"]`);

    it('renders a form', () => {
        expect(
            form('inspection-form')
        ).not.toBeNull();
    });

    describe('name field', () => {
        it('renders as a textbox', () => {
            expect(field('name')).not.toBeNull();
            expect(field('name').tagName).toEqual('INPUT');
            expect(field('name').type).toEqual('text');
        });
        
        it('renders a label', () => {
            expect(labelFor('name')).not.toBeNull();
            expect(labelFor('name').textContent).toEqual('Name');
        });

        it('assigns an id that matches the label id', () => {
            expect(field('name').id).toEqual('name');
        });
    });

    describe('status field', () => {
        it('renders as a checkbox', () => {
            expect(field('status')).not.toBeNull();
            expect(field('status').tagName).toEqual('INPUT');
            expect(field('status').type).toEqual('checkbox');
        });
        
        it('renders a label', () => {
            expect(labelFor('status')).not.toBeNull();
            expect(labelFor('status').querySelector('span').textContent).toEqual('All OK?');
        });

        it('assigns an id that matches the label id', () => {
            expect(field('status').id).toEqual('status');
        });
    });

    describe('description field', () => {
        it('renders as a textarea', () => {
            expect(field('description')).not.toBeNull();
            expect(field('description').tagName).toEqual('TEXTAREA');
        });
        
        it('renders a label', () => {
            expect(labelFor('description')).not.toBeNull();
            expect(labelFor('description').textContent).toEqual('Description (optional)');
        });

        it('assigns an id that matches the label id', () => {
            expect(field('description').id).toEqual('description');
        });
    });

    test.todo('renders a submit button');
    test.todo('submits the form (see page 70)');
});