'use client'
import { Member } from '@prisma/client'
import React, { useState } from 'react'
import {Card, CardHeader, CardBody, Image, CardFooter} from "@nextui-org/react";
import { calculateAge } from 'app/lib/utils';
import Link from 'next/link';
import LikeButtons from 'components/LikeButtons';
import PresenceDot from 'components/PresenceDot';
import UsePresenceStore from 'app/hooks/usePresenceStore';
type MemberProps = {
    member : Member,
    likes : string[]
}

const MemberCard = ({member , likes} : MemberProps) => {
  console.log(UsePresenceStore((state)=> state.members))
  const hasLiked = likes?.includes(member.userId);
  const [isLiked , setLike ] = useState(hasLiked);
  const manageLike = (e : React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault(); 
    setLike((prev) => !prev);
  }
  return (
    <Card className="py-4" as={Link} href={`/members/${member.userId}`} isPressable>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-fill"
          src={member.image}
          width={270}
          
        />
        <div onClick={manageLike}>
        <div className='absolute top-3 right-3 z-50'>
          <LikeButtons targetId={member.userId} hasLiked={isLiked}/>
        </div>
        <div className='absolute top-3 left-3 z-50'>
        <PresenceDot member={member}/>
        </div>
        </div>
      </CardBody>
      <CardFooter className="pb-0 pt-2 px-4 flex-col items-start"> 
        <p className="text-tiny uppercase font-bold">{member.name} , {calculateAge(member.dateOfbirth)}</p>
        <small className="text-default-500">{member.city}</small>
        <h4 className="font-bold text-medium">{member.description.slice(0, 50)}...</h4>
      </CardFooter>
    </Card>
  )
}

export default MemberCard
