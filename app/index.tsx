import { createRoot } from 'react-dom/client';
import App from './components/App';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { LazyAbout } from './pages/about';
import { Suspense } from 'react';
import { LazyShop } from '@/pages/shop';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: '/about',
        element: <Suspense><LazyAbout /></Suspense>
      },
      {
        path: '/shop',
        element: <Suspense><LazyShop /></Suspense>
      }
  ]
  },
]);

const root = document.getElementById('root');

if (!root) {
  throw new Error('root not found');
}

const container = createRoot(root);

container.render(<RouterProvider router={router} />);