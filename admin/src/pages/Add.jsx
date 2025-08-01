import React, { useState } from 'react';
import { assets } from '../assets/admin_assets/assets';
import axios from "axios";
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [sizes, setSize] = useState([]);
  const [category, setCategory] = useState('Men');
  const [subCategory, setSubCategory] = useState('Topwear');
  const [bestseller, setBestseller] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", Number(price));
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      image1 && formData.append("image1", image1);
      image2&& formData.append("image2", image2);
      image3&& formData.append("image3", image3);
      image4&& formData.append("image4", image4);

      const response = await axios.post(`${backendUrl}/api/product/add`, formData, {
        headers: {
          token,
        },
      });

    
     if (response.data.success){
      toast.success(response.data.message)
      
      setImage1(false);
      setImage2(false);
      setImage3(false);
      setImage4(false);
      setName('');
      setDescription('');
      setPrice('');
      setSize([]);
      setCategory('Men');
      setSubCategory('Topwear');
      setBestseller(false);
     }
     else{
      toast.error(response.data.message)
     }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
      {/* Image Upload */}
      <div>
        <p className='mb-2'>Upload image</p>
        <div className='flex gap-2'>
          {[
            { id: 'image1', image: image1, setImage: setImage1 },
            { id: 'image2', image: image2, setImage: setImage2 },
            { id: 'image3', image: image3, setImage: setImage3 },
            { id: 'image4', image: image4, setImage: setImage4 },
          ].map(({ id, image, setImage }) => (
            <label key={id} htmlFor={id}>
              <img className='w-20' src={!image ? assets.upload_area : URL.createObjectURL(image)} alt='' />
              <input onChange={(e) => setImage(e.target.files[0])} type='file' id={id} hidden />
            </label>
          ))}
        </div>
      </div>

      {/* Name */}
      <div className='w-full'>
        <p className='mb-2'>Product name</p>
        <input onChange={(e) => setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2' type='text' placeholder='Type here' required />
      </div>

      {/* Description */}
      <div className='w-full'>
        <p className='mb-2'>Product description</p>
        <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2' placeholder='Write content here' required />
      </div>

      {/* Category, SubCategory, Price */}
      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div>
          <p className='mb-2'>Product category</p>
          <select onChange={(e) => setCategory(e.target.value)} value={category} className='w-full px-3 py-2'>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div>
          <p className='mb-2'>Product subCategory</p>
          <select onChange={(e) => setSubCategory(e.target.value)} value={subCategory} className='w-full px-3 py-2'>
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="WinterWear">WinterWear</option>
          </select>
        </div>
        <div>
          <p className='mb-2'>Product price</p>
          <input onChange={(e) => setPrice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120px]' type='number' placeholder='25' />
        </div>
      </div>

      {/* Sizes */}
      <div>
        <p className='mb-2'>Product sizes</p>
        <div className='flex gap-3'>
          {["S", "M", "L", "XL", "XXL"].map(size => (
            <div key={size} onClick={() => setSize(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size])}>
              <p className={`${sizes.includes(size) ? "bg-blue-600 text-white" : "bg-blue-300"} px-3 py-1 cursor-pointer`}>{size}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bestseller checkbox */}
      <div className='flex gap-2 mt-2'>
        <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type='checkbox' id='bestseller' />
        <label className='cursor-pointer' htmlFor='bestseller'>Add to bestseller</label>
      </div>

      {/* Submit button */}
      <button type='submit' className='w-28 py-3 mt-4 bg-blue-700 text-white'>ADD</button>
    </form>
  );
};

export default Add;
