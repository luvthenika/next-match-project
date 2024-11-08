'use client'
import React from 'react'
import { userStore } from 'store/user';

const Matches =  () => {
  const user = userStore((state : any) => state.user)
  console.log(user);
      return (
    <div>
      {user.fullName}
    </div>
  )
}

export default Matches;
