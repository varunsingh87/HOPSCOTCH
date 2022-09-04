import { Container, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink ,Collapse,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText} from "reactstrap";
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

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md" container="fluid">
        <NavbarBrand href="/" ><img alt='logo' height={120} src="/Musathon_Logo.png"></img>Musathon</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar> 
            <NavItem>
              <Link href="/"><NavLink href="/">Browser Musathon</NavLink></Link>
            </NavItem>
            <NavItem className="justify-content-center">
              <Link href="/new-competition"><NavLink href="/new-competition">Host a Musathon</NavLink></Link>
            </NavItem>
          </Nav>
            <Logout />
        </Collapse> 
        
      </Navbar>
      <Container>{props.children}</Container>
      
    </div>
  );
}