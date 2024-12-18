import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { ButtonGroup } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { deletePost } from '../api/postData';

function PostCard({ postObj, onUpdate }) {
  const { user } = useAuth();

  const deleteThisPost = () => {
    if (window.confirm(`Delete ${postObj.title}?`)) {
      deletePost(postObj.id).then(() => onUpdate());
    }
  };

  const isUserOwner = user?.uid === postObj?.user?.uid;
  const userLink = postObj.user?.uid ? `/profile/${postObj.user.uid}` : null;

  return (
    <Card className="post-card" style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title>{postObj.title}</Card.Title>

        <div
          style={{
            height: '280px',
            width: '280px',
            display: 'flex',
            margin: '10px',
          }}
        >
          <Card.Img
            variant="top"
            src={postObj.image_url}
            alt={postObj.title}
            style={{ height: '280px', width: '280px' }}
          />
        </div>

        <Card.Subtitle
          style={{
            marginTop: '5px',
            textAlign: 'right',
            fontSize: '18px',
            fontWeight: '600',
            color: '#CDB47B',
          }}
        >
          {postObj.category.label}
        </Card.Subtitle>

        <ButtonGroup
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'bottom',
          }}
        >
          <Link href={`/post/${postObj.id}`} passHref>
            <Button className="post-card-button">View</Button>
          </Link>

          {isUserOwner && (
            <>
              <Link href={`/post/edit/${postObj.id}`} passHref>
                <Button className="post-card-button">Edit</Button>
              </Link>
              <Button
                className="delete-button post-card-button"
                onClick={deleteThisPost}
              >
                Delete
              </Button>
            </>
          )}
        </ButtonGroup>

        <Card.Footer
          style={{
            fontSize: '12px',
            textAlign: 'right',
            padding: '0',
            marginTop: '5px',
          }}
        >
          {userLink ? (
            <Link href={userLink}>{postObj.user?.name}</Link>
          ) : (
            <span>{postObj.user?.name}</span>
          )}
        </Card.Footer>
      </Card.Body>
    </Card>
  );
}

PostCard.propTypes = {
  postObj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    postDate: PropTypes.string,
    image_url: PropTypes.string,
    content: PropTypes.string,
    user: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      uid: PropTypes.string,
      bio: PropTypes.string,
    }),
    category: PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
    }),
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default PostCard;
