import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import DashHomePage from './DashHomePage';

test('renders learn react link', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
  <DashHomePage />
  </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});