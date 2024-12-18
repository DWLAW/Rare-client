import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { createCategory, updateCategory } from '../../api/categoryData';

const initialState = {
  id: '',
  label: '',
};

export default function CategoryForm({ obj, onSubmit }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();

  useEffect(() => {
    if (obj.id) {
      setFormInput(obj);
    } else {
      setFormInput(initialState);
    }
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.id) {
      const updatedCategory = {
        id: obj.id,
        label: formInput.label,
      };
      updateCategory(updatedCategory).then(() => router.push('/category'));
    } else {
      const payload = formInput.label;
      createCategory(payload).then(() => {
        setFormInput(initialState);
        onSubmit();
      });
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
  onSubmit: PropTypes.func.isRequired,
};

CategoryForm.defaultProps = {
  obj: initialState,
};
