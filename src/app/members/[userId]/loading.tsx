import { Spinner } from '@nextui-org/react'
import React from 'react'

const loading = () => {
  return (
    <div className='flex justify-center items-center vertical-center'>
        <Spinner label='Loading...'/>
      
    </div>
  )
}

export default loading
