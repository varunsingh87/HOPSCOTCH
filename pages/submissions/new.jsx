import React from 'react';
import { ConvexHttpClient } from "convex/browser";
import { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Container } from 'reactstrap';
import { useMutation, useQuery } from "../../convex/_generated/react";
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import clientConfig from "../../convex/_generated/clientConfig";
import { useRouter } from 'next/router';

const convex = new ConvexHttpClient(clientConfig);

export default function App(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState("");

    const router = useRouter()

    async function handleAddSubmission(event) {
        event.preventDefault();
        // await addSubmission({ title, description });
        router.push('/profile')
        // console.log(competition + name  + title + description);
    }
    const addSubmission = useMutation("addSubmission");
    return (
        <Container>
            <Breadcrumb listTag="div">
                <BreadcrumbItem href="/" tag="a">Home</BreadcrumbItem>
                <BreadcrumbItem href="#" tag="a">Submissions</BreadcrumbItem>
                <BreadcrumbItem href="#" tag="a">New</BreadcrumbItem>
            </Breadcrumb>
            <Form
                onSubmit={handleAddSubmission}
            >
                <FormGroup>
                    <Label for="exampleEmail">Title</Label>
                    <Input type="title" name="title" id="exampleTitle" placeholder="Title" value={title}
                        onChange={event => setTitle(event.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleText">Music Description</Label>
                    <Input type="textarea" name="text" id="exampleDescription" placeholder='Enter a detailed description of your composition and/or performance, including new techniques you tried out and accomplishments you are proud of' value={description}
                        onChange={event => setDescription(event.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label for="composition">Composition</Label>
                    <Input type="file" name="file" id="composition" value={file}
                        onChange={event => setFile(event.target.value)} />
                    <FormText color="muted">
                        Upload a pdf of your composed music
                    </FormText>
                </FormGroup>
                <FormGroup>
                    <Label for="performance">Performance</Label>
                    <Input type="file" name="file" id="performance" value={file}
                        onChange={event => setFile(event.target.value)} />
                    <FormText color="muted">
                        Upload an audio or video file of your performance
                    </FormText>
                </FormGroup>
                <Button>Submit{new URLSearchParams(window.location.search).has("competition") ? ' to Competition' : ''}</Button>
            </Form>
        </Container>
    );
}
