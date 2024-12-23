import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { React, useEffect, useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createPost, updatePost } from '../../api/postData';
import { getCategories } from '../../api/categoryData'; // Corrected Import

const initialState = {
  category: '',
  title: '',
  publication_date: '',
  image_url: '',
  content: '',
  approved: true,
};

export default function PostForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj?.id) {
      setFormInput({
        ...obj,
        category: obj.category.id,
      });
    }
  }, [obj]);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formInput,
      uid: user.uid,
    };
    if (obj?.id) {
      updatePost(payload).then(() => router.push('/'));
    } else {
      createPost(payload).then(router.push('/'));
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.id ? 'Update' : 'Create'} Post</h2>

      <FloatingLabel controlId="floatingInput1" label="Post Title" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter a title"
          name="title"
          value={formInput.title}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput2" label="Post Image" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter an image url"
          name="image_url"
          value={formInput.image_url}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingSelect" label="category">
        <Form.Select
          name="category"
          onChange={handleChange}
          className="mb-3"
          value={formInput.category}
          required
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.label}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>

      <FloatingLabel controlId="floatingTextarea" label="content" className="mb-3">
        <Form.Control
          as="textarea"
          placeholder="content"
          style={{ height: '100px' }}
          name="content"
          value={formInput.content}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <Button type="submit">{obj.id ? 'Update' : 'Create'} Post</Button>
    </Form>
  );
}

PostForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    user: PropTypes.number,
    category: PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
    }),
    title: PropTypes.string,
    publication_date: PropTypes.string,
    image_url: PropTypes.string,
    content: PropTypes.string,
    approved: PropTypes.bool,
  }),
};

PostForm.defaultProps = {
  obj: initialState,
};
