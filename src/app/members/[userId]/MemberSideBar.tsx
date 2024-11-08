'use client'
import { Button, Card, CardBody, CardFooter, Divider, Image } from "@nextui-org/react";
import { Member } from "@prisma/client";
import { calculateAge } from "app/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
type NavLink = { name: string; href: string };

type MemberProps = {
  member: Member;
  navLinks: NavLink[];
};

const MemberSidebar = ({ member , navLinks}: MemberProps) => {
  const pathname = usePathname();

  return (
    <Card className="p-10 ml-10 mt-10">
      <Image
        alt=""
        width={200}
        height={200}
        className="rounded-full object-cover"
        src={member?.image ?  member.image : '/images/nouser.webp'}

      ></Image>
      <CardBody>
      <div className="fles flex-col items-center">
        <div className="text-2xl">
          {member.name} , {calculateAge(member.dateOfbirth)}
        </div>
        <div className="text-sm text-neutral-600">
          {member.country} , {member.city}
        </div>
      </div>
      <Divider className="my-3"/>
      <nav className="flex flex-col ml-4 text-2xl gap-4">
        {navLinks.map((link , i)=> (
            <Link href={link.href} key={i}  className={`${pathname === link.href ? 'text-pink' : 'hover:text-pink/50'}`}>{link.name}</Link>
        ))}
      </nav>
      </CardBody>
      <CardFooter>
        <Button as={Link} href={'/members'} fullWidth color="pink" variant="bordered">Go Back</Button>
      </CardFooter>

    </Card>
  );
};
export default MemberSidebar