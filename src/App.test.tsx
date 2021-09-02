import { render, screen } from '@testing-library/react';
import App from './App';

test('Render header in app', () => {
	render(<App />);
	const headerElement = screen.getByText(/Burger Frontend™/i);
	expect(headerElement).toBeInTheDocument();
});
