import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import EventSelectComponent from './EventSelectComponent';

test('renders learn react link', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
  <EventSelectComponent />
  </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});