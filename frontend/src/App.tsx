import { Container } from 'react-bootstrap';
import { BrowserRouter } from 'react-router-dom';

import { useAppSelector } from './shared/custom-hooks';
import { Header } from './components/header';
import { RoutesWrapper } from './components/routing/routes-wrapper';

function App() {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <BrowserRouter>
      {user && <Header user={user} />}

      <Container className="mt-5 mb-5">
        <RoutesWrapper isLoggedIn={user !== null} />
      </Container>
    </BrowserRouter>
  );
}

export default App;
