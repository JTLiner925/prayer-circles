import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import EventListPage from './EventListPage';

test('renders learn react link', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
  <EventListPage />
  </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});