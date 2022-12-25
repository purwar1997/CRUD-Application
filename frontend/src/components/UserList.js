import { useState, useEffect } from 'react';
import axios from 'axios';
import User from './User';

export default function UserList() {
  const [users, setUsers] = useState('');
  const [user, setUser] = useState('');

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await axios.get('/getUsers');
        setUsers(res.data.users);
      } catch (err) {
        console.log(`${err.message}\n${err.response.data.message}`);
      }
    }

    fetchUsers();
  }, [users]);

  const editUser = async userdata => {
    let username = prompt('Enter your new username');
    let email = prompt('Enter your new email');
    let password = prompt('Enter your new password');

    if (!username) {
      username = userdata.username;
    }

    if (!email) {
      email = userdata.email;
    }

    if (!password) {
      password = userdata.password;
    }

    try {
      const res = await axios.put(`/editUser/${userdata._id}`, {
        username,
        email,
        password,
      });

      console.log(res.data);

      if (user._id === userdata._id) {
        setUser(res.data.updatedUser);
      }
    } catch (err) {
      console.log(`${err.message}\n${err.response.data.message}`);
      alert(err.response.data.message);
    }
  };

  const deleteUser = async userId => {
    try {
      const res = await axios.delete(`/deleteUser/${userId}`);
      console.log(res.data);

      if (userId === user._id) {
        setUser('');
      }
    } catch (err) {
      console.log(`${err.message}\n${err.response.data.message}`);
    }
  };

  return (
    <>
      {users.length ? (
        <>
          <h1 className="mt-16 mb-10 text-4xl text-center">All Users</h1>

          <table className="mx-auto mb-16 w-3/4 border">
            <thead className="bg-[#f4f4f8]">
              <tr className="border">
                <th className="px-5 py-2 font-semibold text-left">Username</th>
                <th className="px-5 py-2 font-semibold text-left">Email</th>
                <th className="px-5 py-2 font-semibold text-left">View</th>
                <th className="px-5 py-2 font-semibold text-left">Edit</th>
                <th className="px-5 py-2 font-semibold text-left">Delete</th>
              </tr>
            </thead>

            <tbody>
              {users.map(user => (
                <tr className="border">
                  <td className="px-5 py-2.5">{user.username}</td>
                  <td className="px-5 py-2.5">{user.email}</td>
                  <td className="px-5 py-2.5">
                    <button className="text-yellow-500" onClick={() => setUser(user)}>
                      View
                    </button>
                  </td>
                  <td className="px-5 py-2.5">
                    <button className="text-green-500" onClick={() => editUser(user)}>
                      Edit
                    </button>
                  </td>
                  <td className="px-5 py-2.5">
                    <button className="text-red-500" onClick={() => deleteUser(user._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        ''
      )}

      <User user={user} />
    </>
  );
}
