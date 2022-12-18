export default function Table({ user }) {
  return (
    <>
      {user ? (
        <table className="mx-auto mb-14 w-1/2">
          <thead className="bg-[#f4f4f8]">
            <tr>
              <th className="border py-3 text-2xl font-semibold" colSpan="2">
                User
              </th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="border w-1/2 px-4 py-2.5 text-center">Username</td>
              <td className="border px-4 text-center">{user.username}</td>
            </tr>
            <tr>
              <td className="border w-1/2 px-4 py-2.5 text-center">Email</td>
              <td className="border px-4 text-center">{user.email}</td>
            </tr>
            <tr>
              <td className="border w-1/2 px-4 py-2.5 text-center">Password</td>
              <td className="border px-4 text-center">{user.password}</td>
            </tr>
            <tr>
              <td className="border w-1/2 px-4 py-2.5 text-center">UserId</td>
              <td className="border px-4 text-center">{user._id}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        ''
      )}
    </>
  );
}
