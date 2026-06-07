import { useEffect, useState } from "react";
import { getCategoryStats } from "../services/dashboardService";

const CategoryChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getCategoryStats();
      setData(res);
    };
    fetchData();
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border">
      <h2 className="text-lg font-semibold mb-6 text-gray-800">
        Category Contribution
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 justify-items-center">
        {data.map((item, i) => {
          const percent = item.percentage;

          return (
            <div key={i} className="flex flex-col items-center">

              {/* DONUT RING */}
              <div className="relative w-24 h-24">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="50%"
                    cy="50%"
                    r="40"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                    fill="none"
                  />

                  <circle
                    cx="50%"
                    cy="50%"
                    r="40"
                    stroke="#6366f1"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    strokeDashoffset={`${
                      2 * Math.PI * 40 *
                      (1 - percent / 100)
                    }`}
                    strokeLinecap="round"
                  />
                </svg>

                {/* CENTER TEXT */}
                <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-gray-700">
                  {percent}%
                </div>
              </div>

              {/* LABEL */}
              <p className="mt-2 font-medium text-gray-800">
                {item.category}
              </p>

              {/* META */}
              <p className="text-xs text-gray-500">
                ₹{item.revenue}
              </p>

              <p className="text-xs text-gray-400">
                {item.quantity} units
              </p>

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryChart;