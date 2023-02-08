import React from 'react';
import Navbar from './components/Navbar';
import Paths from './components/Paths';
import { AuthLoader } from './hooks/authHooks';
import './App.scss';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const fillWindow = {
  height: '100%',
  width: '100%'
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App" style={fillWindow}>
        <Navbar />
        <AuthLoader
          renderLoading={() => <div>Loading...</div>}
          renderUnauthenticated={() => (
            <div>Unauthenticated: Login or Sign Up first</div>
          )}
        >
          <Paths />
        </AuthLoader>
      </div>
      {/* <ReactQueryDevtoolsPanel initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}

export default App;
