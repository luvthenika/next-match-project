import React from 'react'
import MessageSideBar from './MessageSideBar'
import MessagesTable from './MessagesTable';

const Messages = async () => {
  return (
    <div className='grid grid-cols-3 w-full gap-1'>
        <div className="col-span-1"><MessageSideBar/>
        </div>
        <div className="col-span-2"><MessagesTable/></div>
    </div>
  )
}

export default Messages
