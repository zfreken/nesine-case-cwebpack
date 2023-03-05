import { render } from '@testing-library/react';
import React from 'react';
import App from '../App';

describe('App tests', () => {
	it('should contains App Component', () => {
		render(<App />);
	});
});