import React from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/admin_assets/assets';

const Sidebar = () => {
  return (
    <div className="w-20 md:w-52 min-h-screen border-r-2 border-blue-200 bg-blue-200 fixed md:static z-10">
      <div className="flex flex-col gap-4 pt-5 items-center md:items-start px-2">
        <NavLink
          className="flex items-center gap-3 border border-blue-200 border-r-0 px-3 py-2 rounded-l w-full"
          to="/add"
        >
          <img className="w-5 h-5" src={assets.add_icon} alt="Add" />
          <p className="hidden md:block">Add Items</p>
        </NavLink>

        <NavLink
          className="flex items-center gap-3 border border-blue-200 border-r-0 px-3 py-2 rounded-l w-full"
          to="/list"
        >
          <img className="w-5 h-5" src={assets.order_icon} alt="List" />
          <p className="hidden md:block">List Items</p>
        </NavLink>

        <NavLink
          className="flex items-center gap-3 border border-blue-200 border-r-0 px-3 py-2 rounded-l w-full"
          to="/orders"
        >
          <img className="w-5 h-5" src={assets.order_icon} alt="Orders" />
          <p className="hidden md:block">Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
