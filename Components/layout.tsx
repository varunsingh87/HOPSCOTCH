import { Container, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from "reactstrap";
import { Logout } from "../lib/account-auth"
import { useEffect, useState } from "react"
import { Document, Id } from "../convex/_generated/dataModel";
import { useMutation } from "../convex/_generated/react";
import Link from "next/link";

// Render a chat message.
export function Layout(props: any) {
  const storeUser = useMutation("storeUser");
  useEffect(() => {
    // Store the user in the database.
    // Recall that `storeUser` gets the user information via the `auth`
    // object on the server. You don't need to pass anything manually here.
    async function createUser() {
      const id = await storeUser();
    }
    createUser();
  }, [storeUser]);

  return (
    <div>
      <Navbar>
        <NavbarBrand href="/">Musathon</NavbarBrand>
        <Nav>
            <Link href="/">Browse Musathons</Link>
            <Link href="/new-competition">Host a Musathon</Link>
        </Nav>
        <Logout />
      </Navbar>
      <Container className="mt-2">{props.children}</Container>
    </div>
  );
}