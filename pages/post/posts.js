import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getPosts } from '../../api/postData';
import PostCard from '../../components/PostCard';

export default function Tags() {
  const [posts, setPosts] = useState([]);

  const getAllPosts = () => {
    getPosts().then(setPosts);
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <>
      <div>
        <h1>Posts</h1>
        <Link passHref href="/post/new">Add A Post</Link>
      </div>
      {posts.map((post) => (
        <PostCard key={post.id} postObj={post} onUpdate={getAllPosts} />
      ))}
    </>
  );
}
