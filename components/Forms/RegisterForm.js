/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { registerUser } from '../../utils/auth';
import { updateUserProfile } from '../../api/userData';

function RegisterForm({ obj, user, updateUser }) {
  const [formData, setFormData] = useState({});
  const router = useRouter();

  useEffect(() => {
    if (!obj.id) {
      setFormData({
        bio: '',
        uid: user.uid,
        name: '',
      });
    } else {
      setFormData({ ...obj, id: obj.id });
    }
  }, [obj, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!obj.id) {
      registerUser(formData).then(() => updateUser(user.uid));
    } else {
      updateUserProfile(formData).then(() => router.push(`/profile/${obj.uid}`));
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="first_name">
        <Form.Label>first name</Form.Label>
        <Form.Control as="textarea" name="name" required placeholder="Enter your Name" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} value={formData.first_name} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="last_name">
        <Form.Label>last name</Form.Label>
        <Form.Control as="textarea" name="name" required placeholder="Enter your Name" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} value={formData.last_name} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBio">
        <Form.Label>bio</Form.Label>
        <Form.Control as="textarea" name="bio" required placeholder="Enter your Bio" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} value={formData.bio} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="profile_image_url">
        <Form.Label>profile image</Form.Label>
        <Form.Control as="textarea" name="profileimage" required placeholder="Enter your profile image" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} value={formData.profile_image_url} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control as="textarea" placeholder="Enter email" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} value={formData.email} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
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
  },
  user: {
    uid: '',
  },

};
