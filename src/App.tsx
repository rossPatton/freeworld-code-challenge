import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Switch, } from 'react-router-dom';

import { DBProvider } from './context/DBContext';

const Home = lazy(() => import('./pages/Home'));
const AddCandidateForm = lazy(() => import('./pages/AddCandidateForm'));
const Nav = lazy(() => import('./components/Nav'));

export const App = () => (
  <BrowserRouter>
    <Suspense fallback={<main className="flex items-center justify-center">Loading...</main>}>
      <Switch>
        <DBProvider>
          <Nav />
          <main className="dark:bg-gray-700 dark:text-white p-20">
            <Route
              exact
              path="/freeworld-code-challenge"
              component={Home}
            />
            <Route
              exact
              path="/freeworld-code-challenge/add-candidate"
              component={AddCandidateForm}
            />
          </main>
        </DBProvider>
      </Switch>
    </Suspense>
  </BrowserRouter>
);
