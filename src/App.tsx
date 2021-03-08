import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Switch, } from 'react-router-dom';

import { DBProvider } from './context/DBContext';

const CalculateForm = lazy(() => import('./pages/CalculateForm'));
const AddCandidateForm = lazy(() => import('./pages/AddCandidateForm'));
const Nav = lazy(() => import('./components/Nav'));

export const App = () => (
  <BrowserRouter>
    <Suspense fallback={<main className="flex items-center justify-center">Loading...</main>}>
      <Switch>
        <DBProvider>
          <Nav />
          <main className="dark:bg-gray-700 dark:text-white p-8 pt-20 md:p-20 md:mt-0">
            <Route
              exact
              path="/freeworld-code-challenge"
              component={CalculateForm}
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
