import '@testing-library/jest-dom'
import {render, screen, fireEvent, cleanup, act} from '@testing-library/react';
import App from './App';

afterEach(cleanup)

describe('Testing HOMEPAGE (App.js)', () => {
  function sum(a, b) {
     return a + b;
  }

  it('should equal 4',()=>{
     expect(sum(2,2)).toBe(4);
  });

  test('also should equal 4', () => {
      expect(sum(2,2)).toBe(4);
  });

  it('should render the homepage Head Tag', async () => {
    const {container} = render(<App />);
    await act(async () => {
      expect(document.getElementsByTagName('head')[0]).toBeInTheDocument();
    });
  });

});
