import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { ButtonGroup } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { deleteCategory } from '../api/categoryData';

function CategoryCard({ categoryObj, onUpdate }) {
  const deleteThisCategory = () => {
    if (window.confirm(`Delete ${categoryObj.label}?`)) {
      deleteCategory(categoryObj.id).then(() => onUpdate());
    }
  };
  const { user } = useAuth();

  return (
    <Card className="category-card" style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Label>{categoryObj.label}</Card.Label>
        <div style={{
          height: '280', width: '280', display: 'flex', margin: '10',
        }}
        />
        <ButtonGroup style={{ width: '100%', display: 'flex', alignItems: 'bottom' }}>
          {user.uid === categoryObj.user.uid ? (
            <Link href={`/category/edit/${categoryObj.id}`} passHref>
              <Button className="category-card-button">Edit</Button>
            </Link>
          ) : ''}
          {user.uid === categoryObj.user.uid ? <Button className="delete-button category-card-button" onClick={deleteThisCategory}>Delete</Button> : ''}
        </ButtonGroup>
      </Card.Body>
    </Card>
  );
}

CategoryCard.propTypes = {
  categoryObj: PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
    user: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      uid: PropTypes.string,
      bio: PropTypes.string,
    }),
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
export default CategoryCard;
