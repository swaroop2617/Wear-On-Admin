import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import { getSalesData } from "../services/dashboardService";

const SalesChart = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("day");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSales = async () => {
      setLoading(true);
      const result = await getSalesData(filter);
      setData(result);
      setLoading(false);
    };

    fetchSales();
  }, [filter]);

  return (
    <div className="bg-white rounded-xl shadow p-6">
      
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Sales Overview</h2>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2 mb-4 justify-end">
        {["day", "week", "month", "year"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition ${
              filter === type
                ? "bg-indigo-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Chart */}
      {loading ? (
        <div className="h-[300px] flex items-center justify-center text-gray-400">
          Loading chart...
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#4f46e5"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default SalesChart;