"use client"
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import { Member } from '@prisma/client'
import { logOut } from 'app/lib/actions'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
type MemberProps = {
  member : Member | 
    {
      image: string
      name: string,
  };
}
const UserMenu = ({member} : MemberProps) => {
  const router = useRouter();
  const handleLogOut = async () => {
    await logOut();
    router.push('/');
   }
  return (
        <>
        <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <Avatar
            isBordered
            as="button"
            className="transition-transform"
            src={member.image ? member.image : '/'  }
            

          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-semibold">Signed in </p>          </DropdownItem>
          <DropdownItem key="edit">
           Edit Profile
          </DropdownItem>
          <DropdownItem key="settings">
            Setting
          </DropdownItem>
          <DropdownItem key="system">System</DropdownItem>
          <DropdownItem key="configurations">Configurations</DropdownItem>
          <DropdownItem key="help_and_feedback">
            Help & Feedback
          </DropdownItem>
          <DropdownItem key="logout" color="danger" as={Link} href='/' onPress={handleLogOut}>
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
        </>
  )
}

export default UserMenu
