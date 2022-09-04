import { Container, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink ,Collapse,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem} from "reactstrap";
import { Logout } from "../lib/account-auth"
import { useEffect, useState } from "react"
import { Document, Id } from "../convex/_generated/dataModel";
import { useMutation } from "../convex/_generated/react";
import Link from "next/link";
// Render a chat message.
export function Layout(props: any) {
  const [userId, setUserId] = useState<Id<"users"> | null>(null);
  const storeUser = useMutation("storeUser");
  //const addChannel = useMutation("addChannel");

  useEffect(() => {
    // Store the user in the database.
    // Recall that `storeUser` gets the user information via the `auth`
    // object on the server. You don't need to pass anything manually here.
    async function createUser() {
      const id = await storeUser();
      setUserId(id);
    }
    createUser();
    return () => setUserId(null);
  }, [storeUser]);

  return (
    <div>
      <Navbar>
        <NavbarBrand href="/" ><h1><img alt='logo' height={120} src="https://media.discordapp.net/attachments/896181221200113735/1015839374727979019/logo.PNG"></img>Musathon</h1></NavbarBrand>
        <Nav className="me-auto" navbar> 
        <NavItem>
                <NavLink href="/">Browse Musathons</NavLink>
              </NavItem>
              </Nav>
              <Nav  navbar>
              <NavItem className="justify-content-center">
                <NavLink href="/new-competition">Host a Musathon</NavLink>
              </NavItem>
              </Nav>
        <Logout />
        
      </Navbar>
      <Container>{props.children}</Container>
      
    </div>
  );
}