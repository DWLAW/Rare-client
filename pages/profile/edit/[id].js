import React, { useEffect, useState } from 'react';

import { getSingleUser } from '../../../api/userData';
import { useAuth } from '../../../utils/context/authContext';
import RegisterForm from '../../../components/RegisterForm';

export default function EditPost() {
  const [userDetails, setUserDetails] = useState({});
  const { user } = useAuth();
  // const { updateUser } = useAuth();
  // const router = useRouter();
  // const { id } = router.query;

  const getTheUser = () => {
    getSingleUser(user.uid).then((theUser) => {
      setUserDetails(theUser);
    });
  };

  useEffect(() => {
    getTheUser();
  }, [user]);

  console.warn('userDetails', userDetails);

  return (
    <RegisterForm obj={userDetails} updateUser={() => console.warn('updated')} />
  );
}
