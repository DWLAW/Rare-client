import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteCategory } from '../api/categoryData';

function CategoryCard({ categoryObj, onUpdate }) {
  const deleteThisCategory = () => {
    if (window.confirm(`Delete ${categoryObj.label}?`)) {
      deleteCategory(categoryObj.id).then(() => onUpdate());
    }
  };

  return (
    <Card className="category-card" style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title>{categoryObj.label}</Card.Title>
        <Link href={`/category/edit/${categoryObj.id}`} passHref>
          <Button variant="light">EDIT</Button>
        </Link>
        <Button variant="light" onClick={deleteThisCategory} className="m-2">
          DELETE
        </Button>

      </Card.Body>
    </Card>
  );
}

CategoryCard.propTypes = {
  categoryObj: PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default CategoryCard;
