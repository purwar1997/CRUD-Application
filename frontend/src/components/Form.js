import { useState } from 'react';
import axios from 'axios';
import List from './List';

export default function Form() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('');

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const res = await axios.post('/createUser', {
        username,
        email,
        password,
      });

      console.log(res.data);
    } catch (err) {
      console.log(`${err.message}\n${err.response.data.message}`);
    }

    setUsername('');
    setEmail('');
    setPassword('');
    setUser('');
  };

  return (
    <>
      <h1 className="mt-10 text-4xl font-semibold text-center">Create User</h1>

      <form
        onSubmit={handleSubmit}
        className="mt-12 flex flex-col items-center gap-10"
        action=""
        method="post"
      >
        <div className="flex justify-center gap-10">
          <div className="flex flex-col items-start gap-2">
            <label className="text-lg" htmlFor="username">
              Username
            </label>
            <input
              className="bg-[#fcfcfc] px-3 py-2.5 w-72 border rounded focus:outline-[#656EF5]"
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={event => {
                setUsername(event.target.value);
              }}
            />
          </div>

          <div className="flex flex-col items-start gap-2">
            <label className="text-lg" htmlFor="email">
              Email
            </label>
            <input
              className="bg-[#fcfcfc] px-3 py-2.5 w-72 border rounded focus:outline-[#656EF5]"
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={event => {
                setEmail(event.target.value);
              }}
            />
          </div>

          <div className="flex flex-col items-start gap-2">
            <label className="text-lg" htmlFor="password">
              Password
            </label>
            <input
              className="bg-[#fcfcfc] px-3 py-2.5 w-72 border rounded focus:outline-[#656EF5]"
              type="text"
              name="password"
              id="password"
              value={password}
              onChange={event => {
                setPassword(event.target.value);
              }}
            />
          </div>
        </div>

        <button
          className="bg-[#656EF5] px-6 py-2 text-white text-lg rounded transition hover:opacity-80"
          type="submit"
        >
          Submit
        </button>
      </form>

      <List user={user} setUser={setUser} />
    </>
  );
}
