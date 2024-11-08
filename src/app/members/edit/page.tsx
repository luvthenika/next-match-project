import { Card, CardBody, CardHeader, Divider } from '@nextui-org/react'
import { getMemberById } from 'app/lib/membersActions';
import { getSessionCredentials, getUserIdBySessionCredentials } from 'app/lib/statless-session';
import { notFound } from 'next/navigation';
import React from 'react'
import EditProfileForm from './EditProfileForm';

const EditProfilePage = async () => {
const sessionToken = await getSessionCredentials();
const { userId } = await getUserIdBySessionCredentials(sessionToken);
const member = await getMemberById(userId);
if(!member) return notFound();

  return (
    <div>
      <Card>
        <CardHeader className='text-2xl text-pink'>
            Edit Profile
            </CardHeader>
        <Divider/>
        <CardBody>
            <EditProfileForm member={member}/>
        </CardBody>
    </Card>
    </div>
  )
}

export default EditProfilePage
