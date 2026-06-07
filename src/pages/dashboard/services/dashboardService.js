import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/dashboard`;
/* =========================
   DASHBOARD STATS
========================= */
export const getDashboardStats = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/stats`);
    return res.data;
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return {};
  }
};


/* =========================
   SALES DATA (day/week/month/year)
========================= */
export const getSalesData = async (type = "day") => {
  try {
    const res = await axios.get(
      `${BASE_URL}/sales?type=${type}`
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching sales data:", error);
    return [];
  }
};


/* =========================
   TOP PRODUCTS
========================= */
export const getTopProducts = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/top-products`);
    return res.data;
  } catch (error) {
    console.error("Error fetching top products:", error);
    return [];
  }
};


/* =========================
   ORDER STATUS
========================= */
export const getOrderStatusStats = async () => {
  try {
    const res = await axios.get(
      `${BASE_URL}/order-status`
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching order status:", error);
    return [];
  }
};


/* =========================
   CATEGORY ANALYTICS
========================= */
export const getCategoryStats = async () => {
  try {
    const res = await axios.get(
      `${BASE_URL}/category-stats`
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching category stats:", error);
    return [];
  }
};


/* =========================
   CUSTOMER SEGMENTS
========================= */
export const getCustomerSegments = async () => {
  try {
    const res = await axios.get(
      `${BASE_URL}/customer-segments`
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching customer segments:", error);
    return {};
  }
};


/* =========================
   PAYMENT ANALYTICS
========================= */
export const getPaymentStats = async () => {
  try {
    const res = await axios.get(
      `${BASE_URL}/payment-stats`
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching payment stats:", error);
    return [];
  }
};
