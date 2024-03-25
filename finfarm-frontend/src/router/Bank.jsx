<<<<<<< HEAD
import { Routes, Route } from 'react-router-dom';
import BankHome from '@/pages/bank/BankHome';
import BankAccount from '@/pages/bank/BankAccount';

export default function Bank() {
  return (
    <>
      <Routes>
        <Route path="/" element={<BankHome />} />
        <Route path="account" element={<BankAccount />} />
      </Routes>
    </>
  );
}
=======
import React from "react";
import { Routes, Route } from 'react-router-dom';
import BankHome from '@/pages/bank/BankHome';
// import BankAccount from '@/pages/bank/BankAccount'

export default function Bank() {
    return (
        <>
            <Routes>
                <Route path="/" element={<BankHome/>} />
                {/* <Route path="account" element={<BankAccount/>} /> */}
            </Routes>
        </>
    )
}
>>>>>>> cbb36b02d9de3d10040478285a2083bce5e7553e
