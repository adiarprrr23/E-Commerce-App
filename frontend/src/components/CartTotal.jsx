import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'

function CartTotal() {
    const {currency,deliveryFee,totalCost}=useContext(ShopContext)
    // console.log(totalCost);
    

  return (
    <div className='w-full'>
        <div className='text-2xl'>
            <Title text1={'CART'} text2={'TOTALS'} />
        </div>
        <div className='flex flex-col gap-2 mt-2 text-sm'>
            <dir className='flex justify-between'>
                <p>Subtotal</p>
                <p>{currency} {totalCost}.00</p>
            </dir>
            <hr />
            <div className='flex justify-between'>
                <p>Shipping Fee</p>
                <p>{currency} {deliveryFee}.00</p>
            </div>
            <hr />
            <div className='flex justify-between'>
                <b>Total</b>
                <b>{currency} {totalCost===0?0:totalCost+deliveryFee}.00</b>
            </div>
        </div>
    </div>
  )
}

export default CartTotal
