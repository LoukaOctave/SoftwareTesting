import React from 'react';
import { createContainer } from './domManipulators';
import InspectionForm from '../components/InspectionForm';

describe('InspectionForm', () => {
    let render, container;

    beforeEach(() => {
        ({ render, container } = createContainer());
        render(<InspectionForm />);
    });

    const form = id => container.querySelector(`form[id="${id}"]`);
    const field = name => form('inspection-form').elements[name];
    const labelFor = formElement => container.querySelector(`label[for="${formElement}"]`);

    const expectFieldValueToBeEmptyString = (fieldName) =>
        expect(field(fieldName).value).toEqual('');

    const itRendersALabel = (fieldName, value) =>
        it('renders a label', () => {
            expect(labelFor(fieldName)).not.toBeNull();
            expect(labelFor(fieldName).textContent).toEqual(value);
        });

    const itAssignsAnIdThatMatchesTheLabelId = (fieldName) =>   
        it('assigns an id that matches the label id', () => {
            expect(field(fieldName).id).toEqual(fieldName);
        });

    it('renders a form', () => {
        expect(form('inspection-form')).not.toBeNull();
    });

    describe('name field', () => {
        it('renders as a textbox', () => {
            expect(field('name')).not.toBeNull();
            expect(field('name').tagName).toEqual('INPUT');
            expect(field('name').type).toEqual('text');
        });

        it('includes the default value', () => {
            expectFieldValueToBeEmptyString('name');
        });

        itRendersALabel('name', 'Name');
        itAssignsAnIdThatMatchesTheLabelId('name');
    });

    describe('status field', () => {
        it('renders as a checkbox', () => {
            expect(field('status')).not.toBeNull();
            expect(field('status').tagName).toEqual('INPUT');
            expect(field('status').type).toEqual('checkbox');
        });

        it('includes the default value', () => {
            expect(field('status').checked).toBeFalsy();
        });
        
        it('renders a label', () => {
            expect(labelFor('status')).not.toBeNull();
            expect(labelFor('status').querySelector('span').textContent).toEqual('All OK?');
        });

        itAssignsAnIdThatMatchesTheLabelId('status');
    });

    describe('description field', () => {
        it('renders as a textarea', () => {
            expect(field('description')).not.toBeNull();
            expect(field('description').tagName).toEqual('TEXTAREA');
        });

        it('includes the default value', () => {
            expectFieldValueToBeEmptyString('description');
        });

        itRendersALabel('description', 'Description (optional)');
        itAssignsAnIdThatMatchesTheLabelId('description');
    });

    test.todo('renders a submit button');
    test.todo('submits the form (see page 70)');
});