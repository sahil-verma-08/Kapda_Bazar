import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/frontend_assets/assets'
import Title from '../component/Title'
import ProductList from '../component/ProductList'

const Collection = () => {
  const {products,search,showSearch}=useContext(ShopContext);
  const [showFilter,setShowfilter]=useState(false);
  const[filterProduct,setFilterProduct]=useState([]);
  const [category,setcategory]=useState([]);
  const[subcategory,setsubcategory] =useState([]);
  const [sortType,setSortType]=useState('relavent')

  const toggelCategory =(e)=>{
    if(category.includes(e.target.value))
    {
      setcategory(prev=> prev.filter(item=> item!==e.target.value))
    }
    else{
      setcategory(prev=>[...prev,e.target.value])
    }
  }
   
  const toggelSubCategory=(e)=>{
    if(subcategory.includes(e.target.value)){
      setsubcategory(prev=>prev.filter(item=> item!==e.target.value ))
    }
    else{
      setsubcategory(prev=>[...prev,e.target.value])
    }
    
  }

  const applyfilter=()=>{
    let productsCopy=products.slice();

    if (showSearch && search.trim()) {
      const keywords = search.toLowerCase().trim().split(/\s+/); // split by space
      productsCopy = productsCopy.filter(item => {
        const combinedText = `
          ${item.name}
          ${item.description || ''}
          ${item.category || ''}
          ${item.subCategory || ''}
        `.toLowerCase();
    
        // Create a list of words from product fields
        const productWords = combinedText.match(/\b\w+\b/g) || [];
    
        // All keywords must match some full word in product
        return keywords.every(kw => productWords.includes(kw));
      });
    }
    
    if(category.length>0 ){
      productsCopy=productsCopy.filter(item=>category.includes(item.category));
    }
    if(subcategory.length>0 ){
      productsCopy=productsCopy.filter(item=>subcategory.includes(item.subCategory));
    }
    setFilterProduct(productsCopy);

  }
   const sortProduct=()=>{
    let fpCopy= filterProduct.slice();
    switch(sortType){
      case 'Low-high':
        setFilterProduct(fpCopy.sort((a,b)=>(a.price-b.price)));
        break;
      case 'high-low':
        setFilterProduct(fpCopy.sort((a,b)=>(b.price-a.price)));
        break;
      default:
        applyfilter();
        break;
    }
   }

  useEffect(()=>{
     
             setFilterProduct(products);
  },[products])
   
 useEffect(()=>{
  applyfilter();
 },[category,subcategory,search,showSearch,products ])

 useEffect(()=>{
    sortProduct();
 },[sortType])

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      
      {/* filter option  */}
      <div className='min-w-60'>
        <p onClick={()=>setShowfilter(!showFilter)
        } className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
          <img className={`h-3 sm:hidden ${showFilter ? "rotate-90":''}`} src={assets.dropdown_icon} alt=''/>
        </p>
        {/* category  */}
        <div className={`border border-blue-200 pl-5 py-3 mt-6v ${ showFilter?"":'hidden'} sm:block`}>
        <p className='mb-3 text-sm font-medium'> CATGORIES</p>
        <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
          <p className='flex gap-2'>
            <input className='w-3 ' type='checkbox' value={'Men'} onChange={toggelCategory}/> Men
          </p>
          <p className='flex gap-2'>
            <input className='w-3 ' type='checkbox' value={'Women'} onChange={toggelCategory}/> Women
          </p>
          <p className='flex gap-2'>
            <input className='w-3 ' type='checkbox' value={'Kids'} onChange={toggelCategory}/> Kids
          </p>
        </div>
        </div>
            {/* subcategory filter  */}
            <div className={`border border-blue-200 pl-5 py-3 my-5 ${ showFilter?"":'hidden'} sm:block`}>
        <p className='mb-3 text-sm font-medium'> TYPE</p>
        <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
          <p className='flex gap-2'>
            <input className='w-3 ' type='checkbox' value={'Topwear'} onChange={toggelSubCategory}/> Topwear
          </p>
          <p className='flex gap-2'>
            <input className='w-3 ' type='checkbox' value={'Bottomwear'} onChange={toggelSubCategory}/>Bottomwear
          </p>
          <p className='flex gap-2'>
            <input className='w-3 ' type='checkbox' value={'Winterwear'} onChange={toggelSubCategory}/> Winterwear
          </p>
        </div>
        </div>
      </div>
      
      
        {/* right side 
         */}
         <div className='flex-1'>
          <div className='flex justify-between text-base sm:text-2xl mb-4'>
             
             <Title text1={'ALL'} text2={'COLLECTION'}/>
             {/* product sort  */}
             <select onChange={(e)=>setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
              <option value="relavent">sort by:Relavent</option>
              <option value="Low-high">Sort by: Low to high</option>
              <option value="high-low"> Sort by: high to low</option>
             </select>
          </div>

          {/* Map product  */}
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>

          {
            filterProduct.map((item,index)=>(
              <ProductList key={index} name={item.name} id={item._id} price={item.price} image={item.image}/>
            ))
          }
          </div>
         </div>
      
       </div>
  )
}

export default Collection