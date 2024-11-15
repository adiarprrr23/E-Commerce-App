import React from 'react'
import Title from '../components/Title'
import {assets} from '../assets/frontend_assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

function About() {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'About'} text2={'Us'} />
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque, fugiat! Libero suscipit similique hic fugiat culpa iste accusantium est sit laborum. Dolores delectus sequi numquam blanditiis quam. Similique, dolorem beatae.</p>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure perspiciatis ab aspernatur sunt id autem, optio inventore, libero quae consequatur corrupti nulla quia qui! Voluptatum perspiciatis expedita possimus iste atque!
          </p>
          <b className='text-gray-800'>Our Misson</b>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut obcaecati placeat ipsum sed. Quas dolorum ipsam aspernatur, hic earum rerum animi magnam labore ullam quo ipsum quos eaque distinctio error?</p>
        </div>
      </div>
      <div className='text-xl py-4'>
        <Title text1={'Why'} text2={'Choose Us'} />
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis consectetur laborum ea cum.
          </p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis consectetur laborum ea cum.
          </p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis consectetur laborum ea cum.
          </p>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  )
}

export default About
