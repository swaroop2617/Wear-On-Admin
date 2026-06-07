import { FaRupeeSign, FaShoppingCart, FaUsers } from "react-icons/fa";

const iconMap = {
  Revenue: <FaRupeeSign />,
  Orders: <FaShoppingCart />,
  Users: <FaUsers />,
};

const colorMap = {
  Revenue: "bg-green-100 text-green-600",
  Orders: "bg-blue-100 text-blue-600",
  Users: "bg-purple-100 text-purple-600",
};

const StatsCard = ({ title, value }) => {
  return (
    <div className="flex items-center justify-between p-5 bg-white rounded-xl shadow hover:shadow-xl hover:scale-[1.02] transition duration-300">
      <div>
        <p className="text-gray-500">{title}</p>
        <h2 className="text-2xl font-bold text-gray-800">{value}</h2>
      </div>

      <div
        className={`p-3 rounded-full text-xl ${colorMap[title]}`}
      >
        {iconMap[title]}
      </div>
    </div>
  );
};

export default StatsCard;