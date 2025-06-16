import React from 'react'

export interface Transaction {
  date: string
  amount: number
  description: string
}

export interface TransactionsTableProps {
  transactions: Transaction[]
}

export default function TransactionsTable({ transactions }: TransactionsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto text-sm font-sans">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-4 py-2 text-left">Date</th>
            <th className="px-4 py-2 text-right">Amount</th>
            <th className="px-4 py-2 text-left">Description</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn, idx) => (
            <tr key={idx} className="even:bg-gray-50">
              <td className="px-4 py-2 whitespace-nowrap">{new Date(txn.date).toLocaleDateString()}</td>
              <td className="px-4 py-2 whitespace-nowrap text-right">{txn.amount.toFixed(2)}</td>
              <td className="px-4 py-2">{txn.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
