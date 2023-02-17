import React from 'react';
import Navbar from './components/Navbar';
import Paths from './components/Paths';
import { AuthLoader } from './hooks/authHooks';
import './App.scss';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Navbar />
        <div className="app-content-wrapper">
          <AuthLoader
            renderLoading={() => <div>User Loading...</div>}
            renderUnauthenticated={() => (
              <div>Unauthenticated: Login or Sign Up first</div>
            )}
          >
            <Paths />
          </AuthLoader>
        </div>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
