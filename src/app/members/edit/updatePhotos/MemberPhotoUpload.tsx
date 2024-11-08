'use client'
import ImageUploader from 'components/ImageUploader'
import { uploadPhoto } from 'app/lib/updateProfileActions';
import { CloudinaryUploadWidgetResults } from 'next-cloudinary';
import { useRouter } from 'next/navigation';
import React from 'react'

const MemberPhotoUpload = () => {
  const router = useRouter();
    const onAddImage = async (result : CloudinaryUploadWidgetResults) => {
        console.log(result);
        if(result.info && typeof result.info === 'object'){
            const uploadedPhoto  = await uploadPhoto(result.info.secure_url , result.info.public_id);
            console.log('photo uploaded successfully')
            router.refresh();
        }
        else {
            throw Error('there is a problem with image uploading')
        }
    }
  return (
    <div className='absolute left-3'>
    <ImageUploader addImage={onAddImage}/>
    </div>
  )
}

export default MemberPhotoUpload
