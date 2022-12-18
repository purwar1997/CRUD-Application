import { useState, useEffect } from 'react';
import axios from 'axios';

export default function List() {
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

  return (
    <>
      <h1 className="mt-16 mb-12 text-4xl font-semibold text-center">All Users</h1>

      <table className="m-auto w-3/4 border">
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
                  <button className="hover:text-yellow-500">Show</button>
                </td>
                <td className="px-5 py-2.5">
                  <button className="hover:text-green-500">Edit</button>
                </td>
                <td className="px-5 py-2.5">
                  <button className="hover:text-red-500">Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
