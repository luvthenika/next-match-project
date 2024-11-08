import { Button, Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react";
import Link from "next/link";
import NavLink from "./NavLink";
import { notFound } from "next/navigation";
import UserMenu from "./UserMenu";
import {
  getSessionCredentials,
  getUserIdBySessionCredentials,
} from "app/lib/statless-session";
import { getMemberById } from "app/lib/membersActions";
const TopBar = async ({ initialSession }) => {
  const defaultMember = {
    image: "/path/to/default-avatar.jpg",
    name: "Guest User",
  };
  

  let member = defaultMember; 
  const sessionToken = await getSessionCredentials();
  if (sessionToken) {
    const { userId } = await getUserIdBySessionCredentials(sessionToken);
    const fetchedMember = await getMemberById(userId);
    if (fetchedMember) {
      member = fetchedMember; // Update with fetched data if available
    }
  }
  return (
    <Navbar
      maxWidth="xl"
      className="bg-pink-200"
      classNames={{
        item: ["text-xl", "text-white", "uppercase"],
      }}
    >
      <NavbarBrand>
        <div className="text-3xl font-bold text-gray-800">
          <span>Next</span>
          <span>Match</span>
        </div>
      </NavbarBrand>
      <NavbarContent justify="center">
        <NavLink href="/matches" label="matches" />
        <NavLink href="/lists" label="lists" />
        <NavLink href="/messages" label="messages" />
        <NavLink href="/members" label="members" />
      </NavbarContent>
      <NavbarContent justify="end">
        {initialSession ? (
          <UserMenu member={member} />
        ) : (
          <>
            <Button variant="bordered" href="/authentication/login" as={Link}>
              Log In
            </Button>
            <Button variant="solid" href="/authentication/register" as={Link}>
              Sign Up
            </Button>
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
};

export default TopBar;
