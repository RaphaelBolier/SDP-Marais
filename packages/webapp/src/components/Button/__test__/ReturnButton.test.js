import React from 'react';
import ReactDOM from 'react-dom';
import { ReturnButton } from '../ReturButton';

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ReturnButton/>, div);
})