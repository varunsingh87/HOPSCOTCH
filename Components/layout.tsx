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
import { useConvexAuth, useMutation } from 'convex/react'
import { Login, Logout } from './account-auth'
import { Search } from 'react-bootstrap-icons'
import { api } from '../convex/_generated/api'
import Link from 'next/link'

// Render a chat message.
export function Layout(props: any) {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)

  const router = useRouter()

  const { isAuthenticated } = useConvexAuth()
  const storeUser = useMutation(api.user.storeUser)
  useEffect(() => {
    // Store the user in the database.
    // Recall that `storeUser` gets the user information via the `auth`
    // object on the server. You don't need to pass anything manually here.
    if (isAuthenticated) {
      storeUser({ bio: '' })
    }
  }, [isAuthenticated])

  return (
    <div>
      <Navbar color="secondary" dark expand="md" container="fluid">
        <NavbarBrand tag={Link} href="/">
          <img alt="logo" height={50} src="/MusathonLogo.png" />{' '}
          <img src="/wordmark.png" alt="Hopscotch" width={256} height={46} />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ms-5 me-auto align-items-center" navbar>
            <NavItem>
              <NavLink tag={Link} href="/">
                Browse Competitions
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} href="/new-competition">
                Host a Competition
              </NavLink>
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
          {isAuthenticated ? <Logout /> : <Login />}
        </Collapse>
      </Navbar>
      <Container fluid>{props.children}</Container>
    </div>
  )
}
