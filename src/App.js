import React from 'react';
// import { BrowserRouter as Router } from 'react-router-dom';

import { FirebaseProvider } from './contexts/FirebaseContext';

// import routes, { renderRoutes } from './routes';
// import { BASENAME } from './config/constant';
import { AppRouter } from './routers/AppRouter';


const App = () => {
  return (
    <React.Fragment>
      {/* <Router basename={BASENAME}> */}
        {/* <FirebaseProvider>{renderRoutes(routes)}</FirebaseProvider> */}
      {/* </Router> */}
      <FirebaseProvider>
        <AppRouter />
      </FirebaseProvider>
    </React.Fragment>
  );
};

export default App;
