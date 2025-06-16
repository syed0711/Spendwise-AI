import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
} from 'recharts'
import { Link } from 'react-router-dom'

export interface Transaction {
  date: string
  amount: number
  description: string
}

export interface DashboardProps {
  transactions: Transaction[] | null
}

export function Dashboard({ transactions }: DashboardProps) {
  if (!transactions || transactions.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-gray-500 mb-4">No data yet — please upload a CSV first.</p>
        <Link to="/" className="text-blue-500">&larr; Back to upload</Link>
      </div>
    )
  }

  const totalCount = transactions.length
  const totalAmount = transactions.reduce((sum, t) => sum + t.amount, 0)

  const chartData = transactions.map((t) => ({
    date: t.date,
    amount: t.amount,
  }))

  return (
    <div className="p-4 space-y-8">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded shadow p-4 text-center">
          <div className="text-sm text-gray-500">Transactions</div>
          <div className="text-2xl font-semibold">{totalCount}</div>
        </div>
        <div className="bg-white rounded shadow p-4 text-center">
          <div className="text-sm text-gray-500">Total Amount</div>
          <div className="text-2xl font-semibold">
            {totalAmount.toLocaleString(undefined, { style: 'currency', currency: 'USD' })}
          </div>
        </div>
      </div>

      <div className="h-64 bg-white rounded shadow p-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="amount" stroke="#3b82f6" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Date</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Description</th>
              <th className="px-4 py-2 text-right text-sm font-medium text-gray-500">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {transactions.map((t) => (
              <tr key={t.date + t.description} className="bg-white odd:bg-gray-50">
                <td className="px-4 py-2 whitespace-nowrap">
                  {new Date(t.date).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">{t.description}</td>
                <td className="px-4 py-2 text-right">
                  {t.amount.toLocaleString(undefined, { style: 'currency', currency: 'USD' })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
