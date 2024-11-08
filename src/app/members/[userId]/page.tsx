import { Card, CardBody, CardHeader, Divider } from '@nextui-org/react';
import CardInnerWrapper from 'components/CardInnerWrapper';
import ChatForm from 'components/ChatForm';
import { getMemberById } from 'app/lib/membersActions';
import { notFound } from 'next/navigation';
import React from 'react'

const Member = async ({params} : {params : {userId : string}}) => {
    const member = await getMemberById(params.userId);
    if(!member) return notFound();

  return (
   <CardInnerWrapper header="profile" body={member.description}
   />
  )
}

export default Member
