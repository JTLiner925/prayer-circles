import 'mutationobserver-shim'
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import 'mutationobserver-shim'
import AddEventPage from './AddEventPage';

test('renders learn react link', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
  <AddEventPage groups={[]} />
  </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});