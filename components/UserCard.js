/* eslint-disable react/no-unescaped-entities */
/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';

function UserCard({
  id,
  first_name,
  last_name,
  bio,
  profile_image_url,
  email,
  created_on,
  active,
  is_staff,
  onUpdate,
}) {
  return (
    <Card className="user-card shadow-sm mb-4" style={{ width: '18rem' }}>
      <Card.Img
        variant="top"
        src={profile_image_url || 'https://png.pngtree.com/png-vector/20190710/ourlarge/pngtree-business-user-profile-vector-png-image_1541960.jpg'}
        alt={`${first_name} ${last_name}`}
        className="user-card-image"
      />
      <Card.Body>
        <Card.Title>
          {first_name} {last_name}
          {is_staff && <span className="badge bg-primary ms-2">Staff</span>}
        </Card.Title>
        <Card.Text>
          <strong>Email:</strong> {email} <br />
          <strong>Active:</strong> {active ? 'Yes' : 'No'} <br />
          <strong>Member Since:</strong> {new Date(created_on).toLocaleDateString()}
        </Card.Text>
        {bio && (
          <Card.Text className="text-muted">
            <em>"{bio}"</em>
          </Card.Text>
        )}
        <div className="d-grid">
          <Button variant="info" size="sm" onClick={() => onUpdate(id)}>
            Refresh User
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

UserCard.propTypes = {
  id: PropTypes.string.isRequired,
  first_name: PropTypes.string.isRequired,
  last_name: PropTypes.string.isRequired,
  bio: PropTypes.string,
  profile_image_url: PropTypes.string,
  email: PropTypes.string.isRequired,
  created_on: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  is_staff: PropTypes.bool.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

UserCard.defaultProps = {
  bio: '',
  profile_image_url: '',
};

export default UserCard;
