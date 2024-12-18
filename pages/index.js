import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import UserCard from '../components/UserCard';
import { getUsers } from '../api/userData';

function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then((data) => {
      setUsers(data);
    });
  }, []);

  return (
    <>

      {/* Main Content */}
      <Container className="mt-4">
        <h1 className="text-center mb-4">Registered Users</h1>
        <Row className="g-4">
          {users.length > 0 ? (
            users.map((user) => (
              <Col key={`user--${user.id}`} xs={12} sm={6} md={4} lg={3}>
                <UserCard
                  {...user}
                  id={user.id.toString()}
                  first_name={user.firstName}
                  last_name={user.lastName}
                  bio={user.bio}
                  profile_image_url={user.image}
                  email={user.email}
                  created_on={user.created_on}
                  active={user.active}
                  is_staff={user.is_staff}
                  onUpdate={() => window.location.reload()}
                />
              </Col>
            ))
          ) : (
            <Col>
              <p className="text-center">No users found.</p>
            </Col>
          )}
        </Row>
      </Container>
    </>
  );
}

export default Home;
