export default function BankAccountTable() {
  return (
    <table className="table rounded-none bg-white">
      {/* head */}
      <thead>
        <tr className="bg-gray-300">
          <th>거래일시</th>
          <th>구분</th>
          <th>닉네임</th>
          <th>출금액</th>
          <th>출금액</th>
          <th>잔액</th>
        </tr>
      </thead>
      <tbody>
        {/* row 1 */}
        <tr>
          <td>Cy Ganderton</td>
          <td>Quality Control Specialist</td>
          <td>Blue</td>
          <td>Blue</td>
          <td>Blue</td>
        </tr>
        {/* row 2 */}
        <tr>
          <td>Hart Hagerty</td>
          <td>Desktop Support Technician</td>
          <td>Purple</td>
          <td>Blue</td>
          <td>Blue</td>
        </tr>
        {/* row 3 */}
        <tr>
          <td>Brice Swyre</td>
          <td>Tax Accountant</td>
          <td>Red</td>
          <td>Blue</td>
          <td>Blue</td>
        </tr>
      </tbody>
    </table>
  );
}
