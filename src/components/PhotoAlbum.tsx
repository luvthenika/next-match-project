"use client";
import React, { useState } from "react";
import Image from "next/image";
import StarButton from "./StarButton";
import DeleteButton from "./DeleteButton";
import { Photo } from "@prisma/client";
import { deletePhotos, setAvatarPicture } from "app/lib/updateProfileActions";
import { Spinner } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { CldImage } from "next-cloudinary";

type Props = {
  photos: Photo[] | null;
  mainImageUrl: string;
};

const PhotoAlbum = ({ photos, mainImageUrl }: Props) => {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const onChangeAvatarPicture = async (photo: Photo) => {
    if (photo.url === mainImageUrl) return;
    setIsPending(true);
    const avatar = await setAvatarPicture(photo);
    setIsPending(false);
    if (avatar) {
      router.refresh();
    }
  };
  const onDeletePhoto = async (photo: Photo) => {
    setIsPending(true);
    const deletedPhoto = await deletePhotos(photo);
    if (deletedPhoto) {
      setIsPending(false);
      router.refresh();
      console.log('deleted')
    }
  };

  return (
    <div className="relative">
      {isPending && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50">
          <Spinner color="pink" />
        </div>
      )}
      <div
        className={`grid grid-cols-5 gap-2 ${
          isPending ? "opacity-50" : "opacity-100"
        }`}
      >
        {photos &&
          photos.map((photo) => (
            <div
              key={photo.id}
              className="relative cursor-pointer"
              onClick={() => onChangeAvatarPicture(photo)}
            >
              <CldImage
              preserveTransformations
                width="220"
                crop="fill"
                height="220"
                alt=""
                src={photo.url}
              />
              <div className="absolute top-3 left-3">
                <StarButton
                  selected={photo.url === mainImageUrl}
                  loading={false}
                />
              </div>
              <div
                className="absolute top-3 right-3"
                onClick={() => onDeletePhoto(photo)}
              >
                <DeleteButton loading={false} />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PhotoAlbum;
