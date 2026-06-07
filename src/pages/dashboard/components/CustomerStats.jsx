const CustomerStats = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="mb-4 font-semibold">Customer Insights</h2>

      <div className="flex justify-between">
        <div>
          <p className="text-gray-500">New Users</p>
          <h2 className="text-xl font-semibold text-green-500">120</h2>
        </div>

        <div>
          <p className="text-gray-500">Returning Users</p>
          <h2 className="text-xl font-semibold text-blue-500">75</h2>
        </div>
      </div>
    </div>
  );
};

export default CustomerStats;