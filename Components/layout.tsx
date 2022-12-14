import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Collapse, Container, FormGroup, Input, Label, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from "reactstrap";
import { Id } from "../convex/_generated/dataModel";
import { useMutation } from "../convex/_generated/react";
import { Logout } from "../lib/account-auth";
import { Search } from "react-bootstrap-icons"
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

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const router = useRouter()

  return (
    <div>
      <Navbar color="secondary" dark expand="md" container="fluid">
        <Link href="/"><NavbarBrand href="/"><img alt='logo' height={50} src="/MusathonLogo.png" /> Hopscotch</NavbarBrand></Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ms-5 me-auto align-items-center" navbar> 
            <NavItem>
              <Link href="/"><NavLink href="/">Browse Competitions</NavLink></Link>
            </NavItem>
            <NavItem>
              <Link href="/new-competition"><NavLink href="/new-competition">Host a Competition</NavLink></Link>
            </NavItem>
            <div tabIndex={0} style={{width: '500px'}} className="search-bar-container form-control input-group d-flex align-items-center">
                <Search className="input-group-prepend" width="25px" />
                <Input style={{outline: 'none', boxShadow: 'none', border: 'none'}} type="search" placeholder="Search competitions" onChange={e => router.push({pathname: '/', query: { q: e.target.value }})} name="searchCompetitions" id="searchCompetitions" className="py-0" />
            </div>
          </Nav>
            <Logout />
        </Collapse> 
        
      </Navbar>
      <Container fluid>
        {props.children}
      </Container>
    </div>
  );
}