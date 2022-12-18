import { useState, useEffect } from 'react';
import axios from 'axios';
import Table from './Table';

export default function List({ user, setUser }) {
  const [userdata, setUserdata] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get('/getUsers');
        setUserdata(res.data.users);
      } catch (err) {
        console.log(`${err.message}\n${err.response.data.message}`);
      }
    }

    fetchData();
  });

  const editData = async user => {
    let newUsername = prompt('Enter your new username');
    let newEmail = prompt('Enter your new email');
    let newPassword = prompt('Enter your new password');

    if (!newUsername) {
      newUsername = user.username;
    }

    if (!newEmail) {
      newEmail = user.email;
    }

    if (!newPassword) {
      newPassword = user.password;
    }

    try {
      const res = await axios.put(`/editUser/${user._id}`, {
        username: newUsername,
        email: newEmail,
        password: newPassword,
      });

      console.log(res.data);
      setUser('');
    } catch (err) {
      console.log(`${err.message}\n${err.response.data.message}`);
    }
  };

  const deleteData = async userId => {
    try {
      const res = await axios.delete(`/deleteUser/${userId}`);
      console.log(res.data);
      setUser('');
    } catch (err) {
      console.log(`${err.message}\n${err.response.data.message}`);
    }
  };

  return (
    <>
      <h1 className="mt-16 mb-12 text-4xl font-semibold text-center">All Users</h1>

      <table className="mx-auto mb-16 w-3/4 border">
        <thead className="bg-[#f4f4f8]">
          <tr className="border">
            <th className="px-5 py-2 font-semibold text-left">Username</th>
            <th className="px-5 py-2 font-semibold text-left">Email</th>
            <th className="px-5 py-2 font-semibold text-left">Show</th>
            <th className="px-5 py-2 font-semibold text-left">Edit</th>
            <th className="px-5 py-2 font-semibold text-left">Delete</th>
          </tr>
        </thead>

        <tbody>
          {userdata &&
            userdata.map(user => (
              <tr className="border">
                <td className="px-5 py-2.5">{user.username}</td>
                <td className="px-5 py-2.5">{user.email}</td>
                <td className="px-5 py-2.5">
                  <button className="hover:text-yellow-500" onClick={() => setUser(user)}>
                    Show
                  </button>
                </td>
                <td className="px-5 py-2.5">
                  <button className="hover:text-green-500" onClick={() => editData(user)}>
                    Edit
                  </button>
                </td>
                <td className="px-5 py-2.5">
                  <button className="hover:text-red-500" onClick={() => deleteData(user._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <Table user={user} />
    </>
  );
}
