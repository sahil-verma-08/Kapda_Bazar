import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/frontend_assets/assets';
import { useLocation } from 'react-router-dom';

const Searchbar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes('/collection')) {
      setVisible(true);
    } else {
      setVisible(false);
      setShowSearch(false);  // also hide searchbar when leaving collection page
    }
  }, [location, setShowSearch]);

  return showSearch && visible ? (
    <div className='border-t border-b bg-blue-100 text-center'>
      <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='flex-1 outline-none bg-inherit text-sm'
          type="text"
          placeholder='Search'
        />
        <img className='w-4' src={assets.search_icon} alt='' />
      </div>
      <img
        onClick={() => setShowSearch(false)}
        className='inline w-4 cursor-pointer'
        src={assets.cross_icon}
        alt=''
      />
    </div>
  ) : null;
};

export default Searchbar;
