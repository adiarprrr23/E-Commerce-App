import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import Title from "../components/Title"
import ProductItem from "../components/ProductItem"

function Collection() {
  const { products,search,showSearch } = useContext(ShopContext);
  const [showfilter, setShowFIlter] = useState(false);
  const [filterProducts,setFilterProducts]=useState([])
  const [category,setCategory]=useState([])
  const [subcategory,setSubCategory]=useState([])
  const [sortType,setSortType]=useState('relevant')

  const toggleCategory=(e)=>{
    if(category.includes(e.target.value)){
      setCategory(prev=>prev.filter(item=>item!==e.target.value))
    }
    else{
      setCategory(prev=>[... prev,e.target.value])
    }
  }

  const toggleSubCategory=(e)=>{
    if(subcategory.includes(e.target.value)){
      setSubCategory(prev=>prev.filter(item=>item!==e.target.value))
    }
    else{
      setSubCategory(prev=>[... prev,e.target.value])
    }
  }

  const applyFilter=()=>{
    let productsCopy=products.slice()
    // console.log(productsCopy);
    

    if(showSearch && search){
      productsCopy=productsCopy.filter(item=>item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if(category.length>0){
      productsCopy=productsCopy.filter(item=>category.includes(item.category))
    }

    if(subcategory.length>0){
      productsCopy=productsCopy.filter(item=>subcategory.includes(item.subCategory))
    }

    setFilterProducts(productsCopy)
  }

  const sortProduct=()=>{
    let productsCopy=filterProducts.slice()
    switch (sortType) {
      case 'low-high':
        setFilterProducts(productsCopy.sort((a,b)=>(a.price-b.price)))
        break;
      case 'high-low':
        setFilterProducts(productsCopy.sort((a,b)=>(b.price-a.price)))
        break;
    
      default:
        applyFilter()
        break;
    }
  }

  useEffect(()=>{
    setFilterProducts(products)
  },[])

  useEffect(()=>{
    sortProduct()
  },[sortType])



  useEffect(()=>{
    applyFilter();
  },[category,subcategory,search,showSearch,products])

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      <div className="min-w-60">
        <p onClick={()=>setShowFIlter(!showfilter)} className="my-2 text-xl flex items-center cursor-pointer gap-2">
          Filters
          <img className={`h-3 sm:hidden ${showfilter?'rotate-90':''}`} src={assets.dropdown_icon} alt="" />
        </p>
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showfilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">Categories</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Men"} onChange={toggleCategory}/>
              Men
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Women"} onChange={toggleCategory}/>
              Woman
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Kids"} onChange={toggleCategory}/>
              Kids
            </p>
          </div>
        </div>
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 my-5 ${
            showfilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">Type</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Topwear"} onChange={toggleSubCategory}/>
              Topwear
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Bottomwear"} onChange={toggleSubCategory}/>
              Bottomwear
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Winterwear"} onChange={toggleSubCategory}/>
              Winterwear
            </p>
          </div>
        </div>
      </div>
      <div className="flex-1">
          <div className="flex justify-between text-base sm:text-2xl mb-4">
            <Title text1={'All'} text2={"Collections"} />
            <select onChange={(e)=>setSortType(e.target.value)} className="border-2 border-gray-300 text-sm px-2">
              <option value="relevant">Sort by:Relevant</option>
              <option value="low-high">Sort by:low-high</option>
              <option value="high-low">Sort by:high-low</option>
            </select>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
            {
              filterProducts.map((item,index)=>(
                <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />))
            }
          </div>
      </div>
    </div>
  );
}

export default Collection;