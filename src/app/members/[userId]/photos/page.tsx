import { Card, CardBody, CardHeader, Divider, Image } from '@nextui-org/react'
import { getPhotosByUserId } from 'app/lib/membersActions'
import React from 'react'

const PhotoGallery = async ({ params }: { params: { userId: string } }) => {
    const photos = await getPhotosByUserId(params.userId);
  
    return (
      <>
        <Card>
          <CardHeader className='text-2xl text-pink'>
            Photos
          </CardHeader>
          <Divider />
          <CardBody>
            <div className='grid grid-cols-5 gap-3'> {/* Corrected 'grod' to 'grid' */}
              {photos && photos.map((photo) => (
                <div key={photo.id}>
                  <Image width={300} height={300} src={photo.url} className="object-cover" alt="Photo" />
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </>
    );
  }
  
  export default PhotoGallery;
