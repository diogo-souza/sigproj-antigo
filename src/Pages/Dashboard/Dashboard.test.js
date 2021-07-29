import React from "react";
/* import nock from "nock"; */
import {
  render
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { UserStorage } from '../../Services/UserContext';
import Dashboard from './Dashboard';

describe('Testing Dashboard Page', () => {
  it('should render Dashboard Page as expected', () => {
    render(<UserStorage><Dashboard /></UserStorage>);
    expect( document.getElementsByClassName('dashboard')[0] ).toBeInTheDocument();
  });
});
