import { useAuth0 } from '@auth0/auth0-react';

export function Login() {
    const { isLoading, loginWithRedirect } = useAuth0();
    if (isLoading) {
      return <button className="btn btn-primary">Loading...</button>;
    }
    return (
      <main className="py-4">
        <h1 className="text-center">Convex Chat</h1>
        <div className="text-center">
          <span>
            <button className="btn btn-primary" onClick={loginWithRedirect}>
              Log in
            </button>
          </span>
        </div>
      </main>
    );
  }

  export function Logout() {
    const { logout, user } = useAuth0();
    return (
      <div className="float-end">
        {/* We know this component only renders if the user is logged in. */}
        {/* <p>Logged in{user!.name ? ` as ${user!.name}` : ""}</p> */}
        <button
          className="btn btn-secondary float-end"
          onClick={() => logout({ returnTo: window.location.origin })}
        >
          Log out
        </button>
      </div>
    );
  }