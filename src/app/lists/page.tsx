import React from 'react'
import ListTabs from './ListTabs'
import { fetchCurrentUsersLikes, fetchLikedMembers } from 'app/lib/likeAction'

const List = async ({searchParams} : {searchParams : {type : string}}) => {
  const listOfLikedMembers = await fetchLikedMembers(searchParams.type);
  console.log(listOfLikedMembers);
  const likes = await fetchCurrentUsersLikes();
  return (
    <div>
      <ListTabs members={listOfLikedMembers} likes={likes}/>
    </div>
  )
}

export default List
