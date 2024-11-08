import { getMemberById } from '../../lib/membersActions';
import React, { ReactNode } from 'react'
import MemberSidebar from '../../members/[userId]/MemberSideBar';
import { Card } from '@nextui-org/react';
import { getSessionCredentials, getUserIdBySessionCredentials } from 'app/lib/statless-session';
import { notFound } from 'next/navigation';

const Layout = async ({children } : {children : ReactNode , params : {userId : string}}) => {
const sessionToken = await getSessionCredentials();
const { userId } = await getUserIdBySessionCredentials(sessionToken);
const member = await getMemberById(userId);
if(!member) return notFound();

const baseUrl = `/members/edit`;
const navLinks = [
  { name: "Update profile", href: `${baseUrl}` },
  { name: "Update Photos", href: `${baseUrl}/updatePhotos` },
];
  return (

    <div className='grid grid-cols-12 gap-4'>
        <div className='col-span-4'>
            <MemberSidebar member={member} navLinks={navLinks}></MemberSidebar>
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
