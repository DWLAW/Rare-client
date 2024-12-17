/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { registerUser } from '../utils/auth';
import { updateUserProfile } from '../api/userData';

function RegisterForm({ obj, user, updateUser }) {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!obj.id) {
      setFormData({
        first_name: '',
        last_name: '',
        bio: '',
        profile_image_url: '',
        email: '',
        uid: user.uid,
      });
    } else {
      setFormData({ ...obj, id: obj.id });
    }
  }, [obj, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!obj.id) {
        await registerUser(formData);
        updateUser(user.uid);
      } else {
        await updateUserProfile(formData);
        router.push(`/profile/${obj.uid}`);
      }
    } catch (err) {
      setError('An error occurred while saving your profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = ({ target }) => {
    setFormData((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <div className="alert alert-danger">{error}</div>}

      <Form.Group className="mb-3" controlId="first_name">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type="text"
          name="first_name"
          required
          placeholder="Enter your First Name"
          onChange={handleChange}
          value={formData.first_name}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="last_name">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          type="text"
          name="last_name"
          required
          placeholder="Enter your Last Name"
          onChange={handleChange}
          value={formData.last_name}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="bio">
        <Form.Label>Bio</Form.Label>
        <Form.Control
          as="textarea"
          name="bio"
          required
          placeholder="Enter your Bio"
          onChange={handleChange}
          value={formData.bio}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="profile_image_url">
        <Form.Label>Profile Image URL</Form.Label>
        <Form.Control
          type="text"
          name="profile_image_url"
          required
          placeholder="Enter your Profile Image URL"
          onChange={handleChange}
          value={formData.profile_image_url}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder="Enter your Email"
          onChange={handleChange}
          value={formData.email}
        />
      </Form.Group>

      <Button variant="primary" type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit'}
      </Button>
    </Form>
  );
}

RegisterForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string,
  }),
  updateUser: PropTypes.func.isRequired,
  obj: PropTypes.shape({
    id: PropTypes.number,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    bio: PropTypes.string,
    profile_image_url: PropTypes.string,
    email: PropTypes.string,
    active: true,
    is_staff: false,
    created_on: PropTypes.string,
  }),
};

RegisterForm.defaultProps = {
  obj: {
    first_name: '',
    last_name: '',
    bio: '',
    profile_image_url: '',
    email: '',
    uid: '',
    active: true,
    is_staff: false,
    created_on: new Date().toISOString().split('T')[0],
  },
  user: {
    uid: '',
  },
};

export default RegisterForm;
