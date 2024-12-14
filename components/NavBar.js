/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, //
  Container,
  Nav,
  Button,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';

const [rareUserId, setRareUserId] = useState(null);

useEffect(() => {
  // Check Firebase auth and fetch RareUser ID
  const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, fetch RareUser ID
      checkUser(user.uid).then((data) => {
        setRareUserId(data.id); // Assumes `data.id` is the RareUser ID returned from the backend
      });
    } else {
      setRareUserId(null); // No user logged in
    }
  });

  return () => unsubscribe();
}, []);

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand>RARE</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link passHref href="/">
              <Nav.Link>Home</Nav.Link>
            </Link>

            <Link passHref href="/posts">
              <Nav.Link>All Posts</Nav.Link>
            </Link>
            <Link passHref href={`/posts?user_id=${rareUserId}`}>
              <Nav.Link>My Posts</Nav.Link>
            </Link>
            <Link passHref href="/categories">
              <Nav.Link>Category Manager</Nav.Link>

            </Link>
            <Button variant="danger" onClick={signOut}>
              Sign Out
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
