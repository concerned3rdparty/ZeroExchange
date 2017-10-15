import Home from './containers/Home';
import NotFound from './containers/NotFound';
import SetPage from './containers/SetPage';

const routes = [
  {
    component: SetPage,
    path: '/set'
  },
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
      },
    ]
  }

];

export default routes;
