import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'
import classnames from 'classnames'
import Link from 'next/link'
import { useState } from 'react'
import AuthenticatedCompetition from './authenticated/Competition'
import { useConvexAuth } from 'convex/react'

export default function CompetitionNavbar(props: any) {
  const [activeTab, setActiveTab] = useState(props.tabId)

  const { isAuthenticated } = useConvexAuth()

  const toggle = (tab: number) => {
    if (activeTab !== tab) setActiveTab(tab)
  }
  return (
    <div className="mt-3">
      {isAuthenticated ? <AuthenticatedCompetition {...props} /> : null}
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === 1 })}
            tag={Link}
            href={`/competitions/${props.id}`}
            onClick={() => {
              toggle(1)
            }}
            style={{ cursor: 'pointer' }}
          >
            Overview
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === 2 })}
            tag={Link}
            href={`/competitions/${props.id}/rules`}
            onClick={() => {
              toggle(2)
            }}
            style={{ cursor: 'pointer' }}
          >
            Rules & Rubric
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === 3 })}
            tag={Link}
            href={`/competitions/${props.id}/prizes`}
            onClick={() => {
              toggle(3)
            }}
            style={{ cursor: 'pointer' }}
          >
            Prizes
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === 4 })}
            tag={Link}
            href={`/competitions/${props.id}/teams`}
            onClick={() => {
              toggle(4)
            }}
            style={{ cursor: 'pointer' }}
          >
            Find Teammates
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === 5 })}
            tag={Link}
            href={`/competitions/${props.id}/gallery`}
            onClick={() => {
              toggle(5)
            }}
            style={{ cursor: 'pointer' }}
          >
            Music Gallery
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === 6 })}
            onClick={() => {
              toggle(6)
            }}
            tag={Link}
            href={`/competitions/${props.id}/team`}
          >
            My Team
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId={props.tabId}>{props.children}</TabPane>
      </TabContent>
    </div>
  )
}
