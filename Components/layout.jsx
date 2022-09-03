import { Container } from "reactstrap";
import {Logout} from "../Lib/account-auth"

// Render a chat message.
export function Layout(props) {
  return (
    <div>
        <div className="container float-end">
            <Logout ></Logout>
        </div>
        {props.children}
    </div>
  );
}