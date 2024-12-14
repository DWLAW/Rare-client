import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getUsers = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/rareusers`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const getSingleUser = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/rareusers/${uid}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

// CREATE USER
const createUser = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/rareusers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// UPDATE USER
const updateUserProfile = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/rareusers/${payload.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    // .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getUsers, getSingleUser, createUser, updateUserProfile,
};
