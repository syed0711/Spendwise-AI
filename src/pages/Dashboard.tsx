import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

export interface DashboardProps {
  transactions: any[] | null;
}

export function Dashboard({ transactions }: DashboardProps) {
  if (!transactions) {
    return (
      <div className="p-8 max-w-2xl mx-auto text-center text-gray-500">
        No data yet—go back home to upload.
      </div>
    );
  }

  const chartData = transactions.map((t) => ({
    date: new Date(t.date).toLocaleDateString(),
    amount: Number(t.amount),
  }));

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <LineChart
        width={600}
        height={320}
        data={chartData}
        className="mx-auto"
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="amount" stroke="#60a5fa" />
      </LineChart>
    </div>
  );
}
