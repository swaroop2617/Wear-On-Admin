import { useEffect, useState } from "react";
import axios from "axios";

const CustomerSegments = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/api/dashboard/customer-segments"
        );
        setData(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return (
      <div className="bg-white p-5 rounded-xl shadow-sm">
        <p className="text-gray-400 animate-pulse">Loading...</p>
      </div>
    );
  }

  const Card = ({ title, color, stats }) => (
    <div
      className={`flex justify-between items-center p-4 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md ${
        color === "green"
          ? "bg-green-50"
          : color === "yellow"
          ? "bg-yellow-50"
          : "bg-red-50"
      }`}
    >
      {/* LEFT CONTENT */}
      <div className="space-y-1 text-sm">
        <p
          className={`font-semibold ${
            color === "green"
              ? "text-green-600"
              : color === "yellow"
              ? "text-yellow-600"
              : "text-red-500"
          }`}
        >
          {title}
        </p>

        <p className="text-gray-600 text-xs">
          Revenue: ₹{stats.revenue}
        </p>

        <p className="text-gray-500 text-xs">
          Contribution: {stats.contribution}%
        </p>

        <p className="text-gray-500 text-xs">
          Avg Spend: ₹{stats.avgSpend}
        </p>

        <p className="text-gray-500 text-xs">
          Avg Orders: {stats.avgOrders}
        </p>
      </div>

      {/* RIGHT BIG NUMBER */}
      <div className="text-right">
        <p
          className={`text-3xl font-bold ${
            color === "green"
              ? "text-green-600"
              : color === "yellow"
              ? "text-yellow-600"
              : "text-red-500"
          }`}
        >
          {stats.users}
        </p>
        <p className="text-xs text-gray-400">customers</p>
      </div>
    </div>
  );

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm">

      {/* HEADER */}
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Customer Insights
      </h2>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <Card
          title="High Value"
          color="green"
          stats={data.high}
        />

        <Card
          title="Medium Value"
          color="yellow"
          stats={data.medium}
        />

        <Card
          title="Low Value"
          color="red"
          stats={data.low}
        />

      </div>
    </div>
  );
};

export default CustomerSegments;