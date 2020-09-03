import 'mutationobserver-shim'
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import 'mutationobserver-shim'
import ChatPage from './ChatPage';

test('renders learn react link', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
  <ChatPage groups={[]} />
  </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});