'use client'
import { Link, NavbarItem } from '@nextui-org/react';
import { usePathname } from 'next/navigation';
import React from 'react';

type NavLinkProps = {
    href: string;
    label: string;
};

const NavLink = ({ href, label }: NavLinkProps) => {
    const pathname = usePathname();
    const isActive = pathname === href;
  
    return (
        <Link href={href}>
            <NavbarItem className={isActive ? 'text-yellow-200' : 'text-white'}>
                {label}
            </NavbarItem>
        </Link>
    );
};

export default NavLink;
