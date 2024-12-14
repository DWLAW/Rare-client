import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createCategory, updateCategory } from '../../api/categoryData';

const initialState = {
  label: '',
};

export default function CategoryForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

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
      updateCategory(payload).then(() => router.push('/'));
    } else {
      createCategory(payload).then(router.push('/'));
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.id ? 'Update' : 'Create'} Category</h2>
      {/* TITLE INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Category label" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter a category"
          name="category"
          value={formInput.title}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.id ? 'Update' : 'Create'} Post</Button>

    </Form>
  );
}

CategoryForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
  }),
};

CategoryForm.defaultProps = {
  obj: initialState,
};
