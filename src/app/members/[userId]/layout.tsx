import { getMemberById } from 'app/lib/membersActions';
import React, { ReactNode } from 'react'
import MemberSidebar from './MemberSideBar';
import { Card } from '@nextui-org/react';

const Layout = async ({children , params} : {children : ReactNode , params : {userId : string}}) => {
const member = await getMemberById(params.userId);
const baseUrl = `/members/${member?.userId}`;
const navLinks = [
  { name: "Profile", href: `${baseUrl}` },
  { name: "Photos", href: `${baseUrl}/photos` },
  { name: "Chat", href: `${baseUrl}/chat` },
];
  return (

    <div className='grid grid-cols-12 gap-4'>
        <div className='col-span-4'>
            <MemberSidebar navLinks={navLinks} member={member}></MemberSidebar>
        </div>
        <div className='col-span-7'>
            <Card className='w-full mt-10'>
            {children}
            </Card>

        </div>


    </div>
  )
}

export default Layout
