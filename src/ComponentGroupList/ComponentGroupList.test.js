import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import 'mutationobserver-shim'
import ComponentGroupList from './ComponentGroupList';

test('renders learn react link', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
  <ComponentGroupList />
  </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});