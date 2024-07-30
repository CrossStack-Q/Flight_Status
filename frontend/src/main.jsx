import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import About from './components/About/About';
import Home from './components/Main/Home';
import Schedule from './components/Schedule/Schedule';
import Flight from './components/Flight/Flight';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />
      },
      {
        path : "/",
        element : <Flight/>
      },
      {
        path : "/flight",
        element : <Flight/>
      }
    ]
  }]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

