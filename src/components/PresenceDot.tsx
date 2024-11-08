import { Member } from '@prisma/client'
import usePresenceStore from 'app/hooks/usePresenceStore'
import { GoDotFill } from "react-icons/go";
import React from 'react'

type Props = {
    member:Member
}
const PresenceDot = ({member} : Props) => {
    const {members} = usePresenceStore(state => ({
        members: state.members
    }));
    const isOnline = members.indexOf(member.userId) !== -1;

    if(!isOnline) return null

  return (
    <div>
     <GoDotFill size={36} className='fill-green-500 animate-pulse' />
    </div>
  )
}

export default PresenceDot
