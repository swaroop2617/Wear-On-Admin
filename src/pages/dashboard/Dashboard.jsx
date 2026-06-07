import React, { useEffect, useState } from "react";
import axios from "axios";
import StatsCard from "./components/StatsCard";
import SalesChart from "./components/SalesChart";
import TopProducts from "./components/TopProducts";
import { getDashboardStats, getOrderStatusStats } from "./services/dashboardService";
import OrderStatusChart from "./components/OrderStatusChart";
import CategoryChart from "./components/CategoryChart";
import CustomerSegments from "./components/CustomerSegments"; 
import PaymentChart from "./components/PaymentAnalytics";
import BusinessInsights from "./components/BusinessInsights";

const Dashboard = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalUsers: 0,
    avgOrderValue: 0,
    conversionRate:0,
    revenueGrowth: 0,
  });
  
  const [orderStatusData, setOrderStatusData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchOrderStatus = async () => {
      try {
        const data = await getOrderStatusStats();
        setOrderStatusData(data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchCategoryData = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/dashboard/category`);
        setCategoryData(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCategoryData();
    fetchData();
    fetchOrderStatus();
  }, []);

  return (
    <div className="flex-1 p-6 bg-gray-100 min-h-screen">

      {/* HEADER */}
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Admin Dashboard
      </h1>

      {/* MAIN CARD */}
      <div className="bg-white p-6 rounded-xl shadow-sm">

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatsCard title="Revenue" value={`₹${stats.totalRevenue}`} />
          <StatsCard title="Orders" value={stats.totalOrders} />
          <StatsCard title="Users" value={stats.totalUsers} />
        </div>

        {/* KPI ANALYTICS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <p className="text-gray-500">Revenue Growth</p>
            <h2 className={`text-xl font-semibold ${
              stats.revenueGrowth >= 0 ? "text-green-500" : "text-red-500"
            }`}>
              {stats.revenueGrowth}%
            </h2>
            <p className="text-xs text-gray-400">vs last period</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <p className="text-gray-500">Avg Order Value</p>
            <h2 className="text-xl font-semibold">
              ₹{stats.avgOrderValue ? stats.avgOrderValue.toFixed(2) : 0}
            </h2>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <p className="text-gray-500">Conversion Rate</p>
            <h2 className="text-xl font-semibold text-blue-500">
              {stats.conversionRate}%
            </h2>
          </div>

        </div>

        {/* MAIN CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <SalesChart />
          <OrderStatusChart data={orderStatusData} />
        </div>

        {/* CATEGORY ANALYTICS */}
        <div className="mb-8">
          <CategoryChart data={categoryData} />
        </div>

        {/* TOP PRODUCTS */}
        <TopProducts />

        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PaymentChart />
          <BusinessInsights />
        </div>

        <div className="mb-8">
          <CustomerSegments />
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
