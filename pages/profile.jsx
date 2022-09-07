import React, { useState, useEffect } from "react";
import { Check } from "react-bootstrap-icons";
import { Card, CardBody, CardFooter, CardImg, Col, Row } from "reactstrap";
import { useQuery, useMutation } from "../convex/_generated/react";

function SubmissionViewer() {
    return (
        <Card>
            <CardImg src="https://www.aboutbritain.com/images/articles/big/medieval-knights-shutterstock-trio-92785621.jpg"
                class="card-img-top"
                height="100px"
                top
                width="auto"
                style={{ objectFit: "cover" }} />
            <CardBody>
                <h5 class="card-title">Medieval Chant</h5>
                <p class="card-text">Encapsulates the spirit of the most noble and bravest knights.</p>
            </CardBody>
            <CardFooter>
                <small class="text-muted">Last updated {Math.round(Math.random() * 5)} mins ago</small>
            </CardFooter>
        </Card>
    );
}

function SubmissionsList() {
    return (
        <Row class="row-cols-1 row-cols-md-3 g-4">
            <Col>
                <SubmissionViewer />
            </Col>
            <Col>
                <SubmissionViewer />
            </Col>
            <Col>
                <SubmissionViewer />
            </Col>
        </Row>
    )
}

export default function Profile() {
    const userbio = useQuery("getUserBio");
    const [bio, setBio] = useState(
        "Loading Bio...");
    const storeUser = useMutation("storeUser");

    useEffect(() => {
        if (userbio === undefined) {
            return;
        }
        setBio(userbio);
    }, [userbio]);

    async function saveBio() {
        await storeUser(bio)
    }

    return (
        <div>
            <div className="d-flex flex-row mb-4">
                <img src="https://picsum.photos/300/300" width="200" height="200" className="rounded-circle float-start pt-3" />
                <div className="d-flex flex-column ms-5 me-auto">
                    <h1 className="display-1">Varun Singh</h1>
                    <textarea placeholder="Write a short bio here" value={bio} onChange={(e) => setBio(e.target.value)} cols="100" className="form-control"></textarea>
                    <button className="mt-1 btn btn-success btn-sm" onClick={() => saveBio()}>Save<Check /></button>
                </div>
            </div>
            <SubmissionsList />
        </div>
    );
}