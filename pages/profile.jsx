import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "bootstrap";
import React from "react"
import { useEffect, useState } from "react"
import { TextArea } from "react-bootstrap-icons";
import EditableText from "../Components/editableText"
import { useQuery, useMutation } from "../convex/_generated/react";


function SubmissionViewer() {
    return (
        <div class="card">
            <img src="https://picsum.photos/500/500"
                class="card-img-top"
                height="100px"
                width="auto"
                style={{ objectFit: "cover" }} />
            <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
            </div>
            <div class="card-footer">
                <small class="text-muted">Last updated 3 mins ago</small>
            </div>
        </div>
    );
}

function SubmissionsList() {
    return (
        <div class="row row-cols-1 row-cols-md-3 g-4">
            <div class="col">
                <SubmissionViewer />
            </div>
            <div class="col">
                <SubmissionViewer />
            </div>
            <div class="col">
                <SubmissionViewer />
            </div>
        </div>
    )
}

export default function Profile() {
    const userbio = useQuery("getUserBio");
    const [bio, setBio] = useState("null");
    const storeUser = useMutation("storeUser");

    useEffect(() => {
        console.log(userbio)
        setBio(userbio)
    }, [])

    async function saveBio() {
        await storeUser(bio)
    }

    return (
        <div>
            <div className="d-flex flex-row">
                <img src="https://picsum.photos/300/300" width="200" height="200" className="rounded-circle float-start pt-3" />
                <div className="d-flex flex-column ms-5 me-auto">
                    <h1 className="display-1">FName LName</h1>
                    <textarea value={bio} onChange={(e) => setBio(e.target.value)} cols="100" className="form-control"></textarea>
                    <button onClick={() => saveBio()}>Save</button>
                </div>
            </div>
            <SubmissionsList />
        </div>
    );
}