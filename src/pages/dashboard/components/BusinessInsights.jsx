  import { useEffect, useState } from "react";
  import axios from "axios";

  const BusinessInsights = () => {
    const [insights, setInsights] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const salesRes = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/dashboard/sales?type=day`
          );

          const paymentRes = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/dashboard/payment-stats`
          );

          const sales = salesRes.data;
          const payments = paymentRes.data;

          if (!sales.length || !payments.length) return;

          const topPayment = payments.reduce((a, b) =>
            a.revenue > b.revenue ? a : b
          );

          const maxDay = sales.reduce((a, b) =>
            a.sales > b.sales ? a : b
          );

          const minDay = sales.reduce((a, b) =>
            a.sales < b.sales ? a : b
          );

          const avg =
            sales.reduce((sum, s) => sum + s.sales, 0) / sales.length;

          const trend =
            sales[sales.length - 1].sales > sales[0].sales
              ? "Upward"
              : "Downward";

          // ===== SMART ANALYSIS =====
          const lastDay = sales[sales.length - 1].sales;
          const prevDay = sales[sales.length - 2]?.sales || lastDay;
          console.log("Today:", lastDay);
          console.log("Yesterday:", prevDay);
          let insightMessage = "";
          let insightType = "neutral";

          const change = prevDay === 0 ? 0 : ((lastDay - prevDay) / prevDay) * 100;
          
          if (change > 20) {
            insightType = "success";
            insightMessage = "Strong growth observed.";
          } else if (change > -10) {
            insightType = "neutral";
            insightMessage = "Stable performance.";
          } else {
            insightType = "danger";
            insightMessage = "Revenue dropped significantly.";
          }

          setInsights({
            topPayment: topPayment.method,
            maxDay,
            minDay,
            avg: Math.round(avg),
            trend,
            insightMessage,
            insightType,
            changePercent: change.toFixed(1) 
          });

        } catch (err) {
          console.error(err);
        }
      };

      fetchData();
    }, []);

    return (
      <div className="bg-white p-5 rounded-xl shadow-sm h-full flex flex-col justify-between transition-all duration-300 hover:shadow-md">

        {/* HEADER */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Business Insights
          </h2>
          <p className="text-xs text-gray-400">
            AI-driven insights from recent activity
          </p>
        </div>

        {!insights ? (
          <p className="text-gray-400 animate-pulse">Analyzing...</p>
        ) : (
          <>
            {/* SMART INSIGHT BOX */}
            <div
              className={`p-3 rounded-lg mb-4 text-sm font-medium flex justify-between items-center ${
                insights.insightType === "danger"
                  ? "bg-red-50 text-red-600"
                  : insights.insightType === "success"
                  ? "bg-green-50 text-green-600"
                  : "bg-gray-50 text-gray-600"
              }`}
            >
              <span>{insights.insightMessage}</span>
              <span
                className={`font-semibold ${
                  insights.changePercent >= 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {insights.changePercent > 0 ? "+" : ""}
                {insights.changePercent}%
              </span>
            </div>

            {/* TOP PAYMENT */}
            <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white p-3 rounded-lg mb-4 text-center transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
              <p className="text-xs opacity-80">Top Payment Method</p>
              <p className="text-md font-semibold mt-1">
                {insights.topPayment}
              </p>
            </div>

            {/* KPI GRID */}
            <div className="grid grid-cols-2 gap-3 text-center">

              <div className="bg-gray-50 p-3 rounded-lg transition-all duration-300 hover:bg-indigo-50 hover:-translate-y-1 hover:shadow-md cursor-pointer">
                <p className="text-xs text-gray-400 mb-1">Best Day</p>
                <p className="font-semibold">₹{insights.maxDay.sales}</p>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg transition-all duration-300 hover:bg-red-50 hover:-translate-y-1 hover:shadow-md cursor-pointer">
                <p className="text-xs text-gray-400 mb-1">Lowest Day</p>
                <p className="font-semibold text-red-500">
                  ₹{insights.minDay.sales}
                </p>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg transition-all duration-300 hover:bg-indigo-50 hover:-translate-y-1 hover:shadow-md cursor-pointer">
                <p className="text-xs text-gray-400 mb-1">Avg Daily</p>
                <p className="font-semibold">₹{insights.avg}</p>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg transition-all duration-300 hover:bg-green-50 hover:-translate-y-1 hover:shadow-md cursor-pointer">
                <p className="text-xs text-gray-400 mb-1">Trend</p>
                <p
                  className={`font-semibold ${
                    insights.trend === "Upward"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {insights.trend}
                </p>
              </div>

            </div>
          </>
        )}
      </div>
    );
  };

  export default BusinessInsights;
