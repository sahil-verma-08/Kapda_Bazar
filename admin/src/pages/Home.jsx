import React from 'react';

const Home = () => {
  return (
    <div className="flex flex-col items-center mt-20 px-4 text-center">
      <h1 className="text-3xl font-semibold text-blue-600 mb-4">
        Welcome Admin!
      </h1>
      <p className="text-lg font-medium text-gray-700 max-w-xl">
        This is the admin panel where you can add items, check orders, and view listed items.
      </p>
    </div>
  );
};

export default Home;
