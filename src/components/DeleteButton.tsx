"use client"
import React from 'react'
import { AiFillDelete, AiFillStar, AiOutlineDelete, AiOutlineStar } from 'react-icons/ai';
import { PiSpinnerGap } from "react-icons/pi";
type Props = {
    loading: boolean;
}

const DeleteButton = ({loading} : Props) => {
  return (
    <div className='relative hover: opacity-80'>
      {!loading ? (
        <>
        <AiOutlineDelete className='fill-white absolute -top-[2px] -right-[2px]' size={32} />
        <AiFillDelete className={ 'fill-red-500'  } size={28}/>
        </>
      ) : (
        <PiSpinnerGap className="fill-white animate-spin" />
      )}
    </div>
  )
}

export default DeleteButton
