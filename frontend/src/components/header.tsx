import { useState } from 'react';
import { NavDropdown } from 'react-bootstrap';
import { logout } from '../redux/reducers/login';
import { useAppDispatch } from '../shared/custom-hooks';
import { AlertModal } from './shared/alert-modal';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

export const Header = ({ user }) => {
  const dispatch = useAppDispatch();

  const [showAlertModal, setShowAlertModal] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      {showAlertModal && (
        <AlertModal
          show={showAlertModal}
          closeAction={() => setShowAlertModal(false)}
          confirmAction={handleLogout}
          confirmText={'Logout'}
          confirmColor={'danger'}
        />
      )}

      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">React app</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <NavDropdown
              title={`${user.firstName} ${user.lastName}`}
              id="navbarScrollingDropdown"
            >
              <NavDropdown.Item onClick={() => setShowAlertModal(true)}>
                Log Out
              </NavDropdown.Item>
            </NavDropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
