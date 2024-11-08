
'use client'
import { useCallback, useEffect, useRef } from "react"
import usePresenceStore from "./usePresenceStore"
import { Channel } from "pusher-js"
import { pusherClient } from "app/lib/pusher"
import { Member } from "@prisma/client"

export const usePresenceChannel = () => {
    const set = usePresenceStore((state) => state.set)
    const add = usePresenceStore((state) => state.add)
    const remove = usePresenceStore((state) => state.remove)
    
    const channelRef = useRef<Channel | null>(null);
    const handleSetMembers = useCallback((memberIds : string[]) => {
     set(memberIds);   
    },[])
    const handleAddMembers = useCallback((memberId : string) => {
        add(memberId);   
       },[])
    const handleDeleteMembers = useCallback((memberId : string) => {
        remove(memberId);   
       },[])

    useEffect(()=>{
        if(!channelRef.current){
            channelRef.current = pusherClient.subscribe('presence-nm');
            channelRef.current.bind('pusher:subscription-succeeded' , (member : Member)=>{
                handleSetMembers(Object.keys(member.id))
                console.log(member);
            })
            channelRef.current.bind('pusher:member_added' ,(member : any)=>{
                handleAddMembers(member)
                console.log('member added ', member)
            })
            channelRef.current.bind('pusher:member_removed' ,(member : any)=>{
                handleDeleteMembers(member)

            })
        }
        return () => {
            if(channelRef.current){
                channelRef.current.unsubscribe()
                  channelRef.current.unbind('pusher:subscription-succeeded', handleSetMembers);
                  channelRef.current.unbind('pusher:member_added', handleAddMembers )
                  channelRef.current.unbind('pusher:member_removed', handleDeleteMembers)

            }
        }
    },[set , add , remove , channelRef])
}