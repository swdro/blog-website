import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import store from './redux/store';
import { Provider } from 'react-redux';
import App from './App';
import Now from './components/routes/Now';
import About from './components/routes/About';
import Contact from './components/routes/Contact';
import Portfolio from './components/routes/Portfolio';
import PageNotFound from './components/routes/PageNotFound';
import Login from './components/routes/Login';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="now" element={<Now />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="portfolio" element={<Portfolio />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter> 
    </Provider> 
  </React.StrictMode>
);
