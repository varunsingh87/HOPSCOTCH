import { Container } from "reactstrap";
import { Logout } from "../lib/account-auth"

// Render a chat message.
export function Layout(props) {
  return (
    <Container className="my-2">
      <div className="container float-end">
        <Logout ></Logout>
      </div>
      <div style={{ clear: 'right' }}>
        {props.children}
      </div>
    </Container>
  );
}