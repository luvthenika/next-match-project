"use client"
import { likeMember } from 'app/lib/likeAction'
import React from 'react'
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
interface Props {
    targetId : string,
    hasLiked: boolean
}
const LikeButtons = ({targetId , hasLiked} : Props) => {
    async function toggleLike(){
        await likeMember(targetId, hasLiked)
    }
  return (
    <div onClick={toggleLike} className=' relative hover: opacity-80 transition cursor-pointer'>
      <AiOutlineHeart  size={30} className='absolute fill-white'/> 
      <AiFillHeart size={28} className={hasLiked ? 'fill-rose-600': 'fill-neutral-500'}/>
    </div>
  )
}

export default LikeButtons
