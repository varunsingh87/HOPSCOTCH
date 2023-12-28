import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import {
  Collapse,
  Container,
  Input,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from 'reactstrap'
import { useMutation } from 'convex/react'
import { Logout } from '../shared/account-auth'
import { Search } from 'react-bootstrap-icons'
import { api } from '../convex/_generated/api'

// Render a chat message.
export function Layout(props: any) {
  const storeUser = useMutation(api.user.storeUser)
  useEffect(() => {
    // Store the user in the database.
    // Recall that `storeUser` gets the user information via the `auth`
    // object on the server. You don't need to pass anything manually here.
    storeUser({ bio: '' })
  }, [storeUser])

  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)

  const router = useRouter()

  return (
    <div>
      <Navbar color="secondary" dark expand="md" container="fluid">
        <NavbarBrand href="/">
          <img alt="logo" height={50} src="/MusathonLogo.png" /> Hopscotch
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ms-5 me-auto align-items-center" navbar>
            <NavItem>
              <NavLink href="/">Browse Competitions</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/new-competition">Host a Competition</NavLink>
            </NavItem>
            <div
              tabIndex={0}
              style={{ width: '500px' }}
              className="search-bar-container form-control input-group d-flex align-items-center"
            >
              <Search className="input-group-prepend" width="25px" />
              <Input
                style={{ outline: 'none', boxShadow: 'none', border: 'none' }}
                type="search"
                placeholder="Search competitions"
                onChange={(e) =>
                  router.push({ pathname: '/', query: { q: e.target.value } })
                }
                name="searchCompetitions"
                id="searchCompetitions"
                className="py-0"
              />
            </div>
          </Nav>
          <Logout />
        </Collapse>
      </Navbar>
      <Container fluid>{props.children}</Container>
    </div>
  )
}
