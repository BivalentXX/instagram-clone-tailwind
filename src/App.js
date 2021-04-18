import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as ROUTES from './constants/routes';
// import Login from './pages/login'




const Login = lazy(() => import('./pages/login'));
const SignUp = lazy(() => import('./pages/signup'));
// const Profile = lazy(() => import('./pages/profile'));
// const NotFound = lazy(() => import('./pages/not-found'));
// const Dashboard = lazy(() => import('./pages/dashboard'));



 function App() {
  return (
      <Router>
        <Suspense fallback={<p>Loading...</p>}>
          <Switch>
            <Route path={ROUTES.LOGIN} component={Login} />
            <Route path={ROUTES.SIGN_UP} component={SignUp} />
            {/* <Route path={ROUTES.PROFILE} component={Profile} />
            <Route component={NotFound} /> */}

          </Switch>
        </Suspense>
      </Router>
  );    
}

export default App;