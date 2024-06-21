import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { Fragment, Suspense } from 'react';
import SuspenseLoader from './components/common/SuspenseLoader';
import Login from './components/Authentication/Form/Login';
import ErrorComponents from './components/common/ErrorComponents';
import SignUp from './components/Authentication/Form/SignUp';
import { routes } from './routes/routes';
import ContextProvider from './context/ContextProvider';
import { useSelector } from 'react-redux';

function App() {
  const { isLoggedIn } = useSelector((state) => state.users);

  function renderRoutes(isLoggedIn = false) {
    if (!isLoggedIn) {
      return (
        <Fragment>
          <Route path='/login' element={<Login />} errorElement={<ErrorComponents />} />
          <Route path='/' element={<SignUp />} errorElement={<ErrorComponents />} />
        </Fragment>
      )
    } else {
      return (
        <Fragment>
          <Route path={routes.main.path} element={<Navigate to={`${routes.emails.path}/inbox`} />} />
          <Route path={routes.main.path} element={<routes.main.element />}>
            <Route path={`${routes.emails.path}/:type`} element={<routes.emails.element />} errorElement={<ErrorComponents />} />
            <Route path={routes.view.path} element={<routes.view.element />} errorElement={<ErrorComponents />} />
          </Route>
          <Route path={routes.invalid.path} element={<Navigate to={`${routes.emails.path}/inbox`} />} />
        </Fragment>
      )
    }
  }


  return (
    <Suspense fallback={<SuspenseLoader />}>
      <ContextProvider>
        <Routes>
          {renderRoutes(isLoggedIn)}
        </Routes>
      </ContextProvider>
    </Suspense>
  );
}

export default App;
