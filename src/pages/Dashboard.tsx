import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

export interface Transaction {
  date: string
  amount: number
  description: string
}

export interface DashboardProps {
  transactions: Transaction[] | null
}

export default function Dashboard({ transactions }: DashboardProps) {
  if (!transactions || transactions.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        No data – upload a CSV first.
      </div>
    )
  }

  const totalCount = transactions.length
  const totalSum = transactions.reduce((sum, t) => sum + t.amount, 0)
  const chartData = transactions.map(t => ({
    date: new Date(t.date).toLocaleDateString(),
    amount: t.amount,
  }))

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <div className="flex justify-between bg-white shadow rounded p-4">
        <div className="font-semibold">Transactions: {totalCount}</div>
        <div className="font-semibold">Total Spent: ${totalSum.toFixed(2)}</div>
      </div>
      <div className="bg-white shadow rounded p-4">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="amount" stroke="#3b82f6" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
