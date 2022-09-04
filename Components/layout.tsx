import { Container } from "reactstrap";
import { Logout } from "../lib/account-auth"
import { useEffect, useState } from "react"
import { Document, Id } from "../convex/_generated/dataModel";
import { useMutation } from "../convex/_generated/react";

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
      <div className="d-flex flex-row-reverse">
        <div className="me-3 mt-2" style={{position: "absolute"}}>
          <Logout ></Logout>
        </div>
      </div>
      <Container className="mt-2">
        <div style={{clear: 'right'}}>{props.children}</div>
      </Container>
    </div>
  );
}