import React, { useState } from "react";
import { Check } from "react-bootstrap-icons";
import { useQuery, useMutation } from "../convex/_generated/react";

export default function Profile() {
    const userbio = useQuery("getUserBio");
    const [bio, setBio] = useState("Loading Bio...");
    const storeUser = useMutation("storeUser");

    useEffect(() => {
        setBio(userbio)
    }, [])

    return (
        <div>
            <div className="d-flex flex-row mb-4">
                <img src="https://picsum.photos/300/300" width="200" height="200" className="rounded-circle float-start pt-3" />
                <div className="d-flex flex-column ms-5 me-auto">
                    <h1 className="display-1">Varun Singh</h1>
                    <textarea value={bio} onChange={(e) => setBio(e.target.value)} cols="100" className="form-control"></textarea>
                    <button className="mt-1 btn btn-success btn-sm" onClick={() => storeUser(bio)}>Save<Check /></button>
                </div>
            </div>
            <SubmissionsList />
        </div>
    );
}

function SubmissionViewer() {
    return (
        <div class="card">
            <img src="https://www.aboutbritain.com/images/articles/big/medieval-knights-shutterstock-trio-92785621.jpg"
                class="card-img-top"
                height="100px"
                width="auto"
                style={{ objectFit: "cover" }} />
            <div class="card-body">
                <h5 class="card-title">Medieval Chant</h5>
                <p class="card-text">Encapsulates the spirit of the most noble and bravest knights.</p>
            </div>
            <div class="card-footer">
                <small class="text-muted">Last updated {Math.round(Math.random() * 5)} mins ago</small>
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