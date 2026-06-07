import { useEffect, useState } from "react";
import axios from "axios";

const PaymentChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/dashboard/payment-stats`
        );
        setData(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPayments();
  }, []);

  const totalRevenue = data.reduce((sum, d) => sum + d.revenue, 0);

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm h-full flex flex-col justify-between">

      {/* HEADER */}
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Payment Intelligence
      </h2>

      {/* DONUT CENTERED */}
      <div className="flex justify-center items-center mb-4">
        <div className="w-36 h-36">
          <svg viewBox="0 0 36 36" className="w-full h-full">

            {data.map((item, i) => {
              const percent = (item.revenue / totalRevenue) * 100;
              const offset = data
                .slice(0, i)
                .reduce((sum, d) => sum + (d.revenue / totalRevenue) * 100, 0);

              const colors = ["#6366F1", "#22C55E", "#F59E0B"];

              return (
                <circle
                  key={i}
                  cx="18"
                  cy="18"
                  r="16"
                  fill="transparent"
                  stroke={colors[i]}
                  strokeWidth="4"
                  s
                  strokeDasharray={`${percent} ${100 - percent}`}
                  strokeDashoffset={-offset}
                />
              );
            })}
          </svg>
        </div>
      </div>

      {/* LEGEND (COMPACT) */}
      <div className="space-y-2 text-sm">
        {data.map((item, i) => {
            const percent = ((item.revenue / totalRevenue) * 100).toFixed(1);
            const colors = ["#6366F1", "#22C55E", "#F59E0B"];

            return (
            <div
                key={i}
                className="flex justify-between items-center p-2 rounded-lg transition-all duration-200 hover:bg-gray-50 hover:scale-[1.02]"
            >
                <div className="flex items-center gap-2">
                <span
                    className="w-3 h-3 rounded-full"
                    style={{ background: colors[i] }}
                />
                <span className="font-medium">
                    {item.method}
                </span>
                </div>

                <div className="text-right">
                <p className="text-gray-800 font-semibold">
                    ₹{item.revenue}
                </p>
                <p className="text-xs text-gray-400">
                    {percent}%
                </p>
                </div>
            </div>
            );
        })}
        </div>

    </div>
  );
};

export default PaymentChart;
