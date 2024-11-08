"use client"
import React from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { PiSpinnerGap } from "react-icons/pi";
type Props = {
    selected: boolean;
    loading: boolean;
}
const StarButton = ({selected , loading} : Props) => {

  return (
    <div className='relative hover: opacity-80'>
      {!loading ? (

        <>
        <AiOutlineStar className='fill-white absolute -top-[2px] -right-[2px]' size={32} ></AiOutlineStar>
        <AiFillStar className={selected ? 'fill-yellow-500' : 'fill-neutral-50' } size={28}></AiFillStar>
        </>
      ) : (
        <PiSpinnerGap className="fill-white animate-spin" />
      )}
    </div>
  )
}

export default StarButton
