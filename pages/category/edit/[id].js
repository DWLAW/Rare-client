import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import CategoryForm from '../../../components/Forms/CategoryForm';
import { getSingleCategory } from '../../../api/categoryData';

export default function EditPost() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  //  grab the post ID
  const { id } = router.query;

  //  make a call to the API to get the Post data
  useEffect(() => {
    getSingleCategory(id).then(setEditItem);
  }, [id]);
  //  pass object to form
  return (<CategoryForm obj={editItem} />);
}
