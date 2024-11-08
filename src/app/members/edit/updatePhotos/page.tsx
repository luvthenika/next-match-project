
import { Card, CardBody, CardHeader, Divider } from '@nextui-org/react'
import React, { useState } from 'react'
import { getSessionCredentials, getUserIdBySessionCredentials } from 'app/lib/statless-session';
import { getMemberById, getPhotosByUserId } from 'app/lib/membersActions';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import StarButton from 'components/StarButton';
import DeleteButton from 'components/DeleteButton';
import PhotoAlbum from 'components/PhotoAlbum';
import { Photo } from '@prisma/client';
import ImageUploader from 'components/ImageUploader';
import MemberPhotoUpload from './MemberPhotoUpload';

const UpdatePhotosPage = async () => {
    const sessionToken = await getSessionCredentials();
    const { userId } = await getUserIdBySessionCredentials(sessionToken);
    const member = await getMemberById(userId);
    if(!member) return notFound();
    const photos : Photo[] = await getPhotosByUserId(userId);
  return (

    <div className='relative'>
    <Card>
      <CardHeader className='text-2xl text-pink'>
        Photos
      </CardHeader>
      <Divider/>
      <CardBody>
        <div className='pt-2 w-[300px]'>
          <MemberPhotoUpload/>
        </div>
        <div className='pt-16'>
          <PhotoAlbum photos={photos} mainImageUrl={member.image}/>
        </div>
      </CardBody>
    </Card>
  </div>
  
  )
}

export default UpdatePhotosPage
