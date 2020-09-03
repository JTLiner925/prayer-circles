import 'mutationobserver-shim'
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import 'mutationobserver-shim'
import ChatWallComponent from './ChatWallComponent';

test('renders learn react link', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
  <ChatWallComponent groups={[]} />
  </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});