import { getMembers } from 'app/lib/membersActions'
import React from 'react'
import MemberCard from './MemberCard';
import { fetchCurrentUsersLikes } from 'app/lib/likeAction';


const MembersPage = async () => {
  const members = await getMembers();
  const likes = await fetchCurrentUsersLikes();
  return (
    <div className="grid grid-cols-4 gap-4 p-10">
      { members && members.map((member, i) => (
        <MemberCard key={i} member={member} likes={likes}/>
      ))}
    </div>
  )
}

export default MembersPage
