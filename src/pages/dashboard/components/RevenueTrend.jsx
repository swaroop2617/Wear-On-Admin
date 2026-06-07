import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

const RevenueTrend = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/api/dashboard/sales?type=day"
        );

        setData(res.data);
      } catch (err) {
        console.error("Sales error:", err);
      }
    };

    fetchSales();
  }, []);

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm w-full h-[280px]">

      {/* TITLE */}
      <h2 className="text-md font-semibold text-gray-800 mb-3">
        Revenue Trend
      </h2>

      {data.length === 0 ? (
        <p className="text-gray-400 text-sm">No data available</p>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>

            <CartesianGrid strokeDasharray="2 2" />

            <XAxis dataKey="label" />

            <YAxis tickFormatter={(value) => `₹${value}`} />

            <Tooltip formatter={(value) => `₹${value}`} />

            <Line
              type="monotone"
              dataKey="sales"
              stroke="#6366f1"
              strokeWidth={2}
              dot={{ r: 3 }}
            />

          </LineChart>
        </ResponsiveContainer>
      )}

    </div>
  );
};

export default RevenueTrend;