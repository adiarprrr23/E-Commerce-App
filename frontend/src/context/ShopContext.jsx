import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";
import {useNavigate} from 'react-router-dom'

export const ShopContext=createContext();


const ShopContextProvider=(props)=>{
    const currency='$';
    const deliveryFee=10;
    const backendUrl=import.meta.env.VITE_BACKEND_URL
    const [search,setSearch]=useState('')
    const [showSearch,setShowSearch]=useState(false)
    const [cartItems,setCartItems]=useState({})
    const [totalCount,setTotalCount]=useState(0)
    const [products,setProducts]=useState([])
    const [token,setToken]=useState('')
    const [totalCost,setTotalCost]=useState(0)
    const navigate=useNavigate()


    const addToCart=async (itemId,size)=>{

        if (!size) {
            toast.error('Select Product Size')
            return
        }

        let cartData=structuredClone(cartItems||{})
        console.log(token);
        
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size]+=1
            }
            else{
                cartData[itemId][size]=1
            }
        }
        else{
            cartData[itemId]={}
            cartData[itemId][size]=1
        }
        setCartItems(cartData)
        if(token){
            try {
                await axios.post(backendUrl+'/api/cart/add',{itemId,size},{headers:{token}})
            } catch (error) {
                console.log(error);
                toast.error(error.message)
            }
        }
    }

    useEffect(()=>{
        getCartCount()
    },[cartItems])

    useEffect(()=>{
        if(!token && localStorage.getItem("token")){
            setToken(localStorage.getItem('token'))
            // console.log(localStorage.getItem('token'));
            
            getUserCart(localStorage.getItem("token"))
            // console.log(cartItems);
            
        }
    },[])

    const getCartCount=()=>{
        let totalCount=0
        // console.log(cartItems);
        for(const itemId in cartItems){
            for (const size in cartItems[itemId]){
                totalCount+=cartItems[itemId][size]
            }
            
        }
        
        
        setTotalCount(totalCount)
        
    }

    const updateQuantity=async (itemId,size,quantity)=>{
        let cartData=structuredClone(cartItems)
        cartData[itemId][size]=quantity
        setCartItems(cartData)
        getCartCount()
        if(token){
            try {
                await axios.post(backendUrl+'/api/cart/update',{itemId,size,quantity},{headers:{token}})
            } catch (error) {
                console.log(error);
                toast.error(error.message)
            }
        }
    }

    useEffect(() => {
        // Only run getCartAmount if both products and cartItems are loaded
        if (products.length > 0 && Object.keys(cartItems).length > 0) {
            setTotalCost(getCartAmount());
        }
    }, [products, cartItems]); 
    

    const getCartAmount=()=>{
        let totalAmount=0
        // console.log(cartItems);
        
        for(const itemId in cartItems){

            let itemsInfo=products.find((product)=>product._id===itemId)
            // console.log(products);
            
            for(const item in cartItems[itemId]){
                try{
                    if(cartItems[itemId][item]>0){
                        totalAmount+=itemsInfo.price*cartItems[itemId][item]
                    }
                }
                catch(error){
                    console.log(error);
                    toast.error(error.message)
                }
            }
        }
        setTotalCost(totalAmount)
        return totalAmount
    }

    const getProductsData=async()=>{
        try {
            const response=await axios.get(backendUrl+'/api/product/list')
            
            if(response.data.success){
                setProducts(response.data.products)
            }else{
                toast.error(response.data.message)
            }
            
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        getProductsData()
    },[])

    // useEffect(()=>{
    //     setTotalCost(getCartAmount())
    //     // setTotalCost(getCartAmount())
        
    // },[cartItems])

    const getUserCart=async (token)=>{
        try {
            const response=await axios.post(backendUrl+'/api/cart/get',{},{headers:{token}})
            
            
            if(response.data.success){
                setCartItems(response.data.cartData)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }


    const value={
        products,
        currency,
        deliveryFee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        addToCart,
        totalCount,
        updateQuantity,
        setCartItems,
        navigate,
        backendUrl,
        setToken,
        token,
        totalCost
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider