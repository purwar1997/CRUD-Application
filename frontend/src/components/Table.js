export default function Table() {
  return (
    <>
      <table className="mt-16 mx-auto mb-16 w-1/2">
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
            <td className="border px-4 text-center">suyash90</td>
          </tr>
          <tr>
            <td className="border w-1/2 px-4 py-2.5 text-center">Email</td>
            <td className="border px-4 text-center">suyash4056</td>
          </tr>
          <tr>
            <td className="border w-1/2 px-4 py-2.5 text-center">Password</td>
            <td className="border px-4 text-center">hadsha-00</td>
          </tr>
          <tr>
            <td className="border w-1/2 px-4 py-2.5 text-center">UserId</td>
            <td className="border px-4 text-center">456789kaj0989</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
