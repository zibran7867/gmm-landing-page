import React from 'react'
import TableC from '../components/ui/TableC'

const DipositHistory = () => {

  const transactions = [
    { id: 1, date: "2025-03-04", time: "12:00 PM", sentamount: "$500" },
    { id: 2, date: "2025-03-03", time: "03:45 PM", sentamount: "$300" },
    { id: 3, date: "2025-03-02", time: "10:15 AM", sentamount: "$150" },
  ];


  return (
    <div className='h-screen w-full flex flex-col hatch'>
      <h2 className='text-3xl sm:text-2xl md:text-5xl text-white text-center font-serif mt-3'>Deposit History</h2>

      <TableC columns={["ID", "Date", "Time", "Sent Amount"]}
        data={transactions}/>
    </div>
  )
}

export default DipositHistory
