import 'mutationobserver-shim'
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import 'mutationobserver-shim'
import AddGroupPage from './AddGroupPage';

test('renders learn react link', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
  <AddGroupPage groups={[]} />
  </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});