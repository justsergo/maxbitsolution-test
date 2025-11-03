import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import { AppRouter } from '@/app/router';
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary';
import './App.scss';

function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <BrowserRouter>
          <div className="app">
            <AppRouter />
          </div>
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
