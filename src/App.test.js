import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';
import ContactForm from './components/ContactForm';
require('mutationobserver-shim');

test('Renders App component without crashing', () => {
	render(<App />);
});

test('ContactForm render to the page without crashing', () => {
	render(<ContactForm />);
});

test('ContactForm elements are displayed', () => {
	const container = render(<ContactForm />);
	const firstName = container.getByPlaceholderText('bill');
	const lastName = container.queryByPlaceholderText('luo');
	const email = container.getByText('Email*');
	const message = container.findByLabelText(/Message/i);
});

test('Input value changes', () => {
	const container = render(<ContactForm />);
	const firstName = container.queryByPlaceholderText('bill');
	fireEvent.change(firstName, { target: { value: 'aaa' } });
	expect(firstName.value).toBe('aaa');

	const lastName = container.queryByPlaceholderText('luo');
	fireEvent.change(lastName, { target: { value: '231ff' } });
	expect(lastName.value).toMatch(/[A-Za-z0-9]/);

	const email = container.getByText('Email*').nextSibling;
	fireEvent.change(email, { target: { value: 'ewa.czech@hotmail.com' } });
	expect(email.value).toMatch(
		/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
	);
});
