import { useEffect, useState } from "react";
import { getTopProducts } from "../services/dashboardService";

const TopProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getTopProducts();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const totalRevenue = products.reduce(
    (sum, p) => sum + (p.revenue || 0),
    0
  );

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border">
      <h2 className="text-lg font-semibold text-gray-800 mb-6">
        Top Performing Products
      </h2>

      {products.length === 0 ? (
        <p className="text-gray-400">No data available</p>
      ) : (
        <div className="space-y-5">
          {products.map((item, index) => {
            const contribution = (
              (item.revenue / totalRevenue) *
              100
            ).toFixed(1);

            return (
              <div
                key={index}
                className="flex flex-col gap-2 pb-4 border-b last:border-none"
              >
                {/* Top Row */}
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-400">
                      Rank #{index + 1}
                    </p>
                    <h3 className="font-medium text-gray-800">
                      {item.name}
                    </h3>
                  </div>

                  <div className="text-right">
                    <p className="text-green-600 font-semibold">
                      ₹{item.revenue}
                    </p>
                    <p className="text-xs text-gray-400">
                      {contribution}% of total
                    </p>
                  </div>
                </div>

                {/* Bottom Metrics */}
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{item.totalSold} units sold</span>

                  <span
                    className={`font-medium ${
                      contribution > 30
                        ? "text-green-500"
                        : contribution > 15
                        ? "text-yellow-500"
                        : "text-gray-400"
                    }`}
                  >
                    {contribution > 30
                      ? "High Impact"
                      : contribution > 15
                      ? "Moderate"
                      : "Low"}
                  </span>
                </div>

                {/* Insight Bar */}
                <div className="w-full bg-gray-200 h-1.5 rounded">
                  <div
                    className="h-1.5 rounded bg-gray-800"
                    style={{ width: `${contribution}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TopProducts;