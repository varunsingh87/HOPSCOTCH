import React from 'react';
import { ConvexHttpClient } from "convex/browser";
import { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Container } from 'reactstrap';
import { useMutation } from "../../../convex/_generated/react";
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import clientConfig from "../../../convex/_generated/clientConfig";

const convex = new ConvexHttpClient(clientConfig);

export default function App(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState("");
  const [name, setName] = useState('user name');

  useEffect(() => {
    const randomName = "User " + Math.floor(Math.random() * 10000);
    setName(randomName);
  }, [])

  async function handleAddSubmission(event) {
    event.preventDefault();
    console.log(props.competitionId + props.name + props.title + props.description);
    await addSubmission(props);
    // console.log(competition + name  + title + description);
  }
  const addSubmission = useMutation("addSubmission");
  return (
    <Container>
      <Breadcrumb listTag="div">
        <BreadcrumbItem href="/" tag="a">Home</BreadcrumbItem>
        <BreadcrumbItem href="/">{props.competitionId}</BreadcrumbItem>
        <BreadcrumbItem href="#" tag="a">Submission</BreadcrumbItem>
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
          <Input type="textarea" name="text" id="exampleDescription" placeholder='enter description about composed music' value={description}
            onChange={event => setDescription(event.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="exampleFile">File</Label>
          <Input type="file" name="file" id="project files" value={file}
            onChange={event => setFile(event.target.value)} />
          <FormText color="muted">
            Upload a pdf of your composed music along with an mp3 file if you have one.
          </FormText>
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    </Container>
  );
}

export async function getStaticProps(context) {
  const submission = await convex.query("getSubmission")(context.params.id)
  submission.id = submission._id = submission._id.id

  return { props: submission }
}

export async function getStaticPaths() {
  const submissions = await convex.query("listSubmissions")();
  return {
    paths: submissions.map(item => {
      return {
        params: { id: item._id.id }
      }
    }),
    fallback: false
  }
}
