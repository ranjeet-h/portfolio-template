import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

const HomeComponent = lazy(() => import('./routes/Home'));
const DashboardComponent = lazy(() => import('./routes/Dashboard'));
const PortfolioComponent = lazy(() => import('./routes/Portfolio'));

function App() {
  return (
    <Router>
      <div className="App">
        <Suspense fallback={
          <div style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            background: '#1a1a1a',
            color: '#ffffff'
          }}>
            Loading...
          </div>
        }>
          <Switch>
            <Route exact path="/" component={PortfolioComponent} />
            <Route path="/home" component={HomeComponent} />
            <Route path="/dashboard" component={DashboardComponent} />
          </Switch>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
