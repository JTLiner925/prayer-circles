import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import PrayerWallComponent from './PrayerWallComponent';

test('renders learn react link', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
  <PrayerWallComponent />
  </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});