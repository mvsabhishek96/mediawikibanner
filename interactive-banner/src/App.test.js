import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('banner text updates on input change', () => {
  render(<App />);
  
  const bannerTextElement = screen.getByTestId('banner-text');
  const textInput = screen.getByLabelText(/Banner Text:/i);
  
  expect(bannerTextElement).toHaveTextContent("I love coding!");
  
  fireEvent.change(textInput, { target: { value: 'I enjoy React!' } });
  expect(bannerTextElement).toHaveTextContent("I enjoy React!");
});

test('template selection updates banner properties', () => {
  render(<App />);
  
  const modernTemplate = screen.getByText('Modern');
  fireEvent.click(modernTemplate);
  
  const bannerTextElement = screen.getByTestId('banner-text');
  expect(bannerTextElement).toHaveTextContent("Modern Banner");
});
