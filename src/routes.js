import Home from './containers/Home';
import NotFound from './containers/NotFound';

const routes = [
  {
    component: Home,
    routes: [
      {
        path: '/',
        component: Home, // Landing Page
        exact: true
      },
      {
        component: NotFound
      }
    ]
  }
];

export default routes;
