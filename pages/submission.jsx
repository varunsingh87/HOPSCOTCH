import React from 'react';
import { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Container } from 'reactstrap';
import { useMutation } from "../convex/_generated/react";
import {Breadcrumb, BreadcrumbItem} from 'reactstrap';
  
export default function App() {
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
  const competition = "DUMMYDATA";
  console.log(competition + name + title + description);
  await addSubmission({competition, name , title, description}  );
  // console.log(competition + name  + title + description);
}
const addSubmission = useMutation("addSubmission");
    return (
        <Container>
          <Breadcrumb listTag="div">
  <BreadcrumbItem
    href="#"
    tag="a"
  >
    Home
  </BreadcrumbItem>
  <BreadcrumbItem
    href="#"
    tag="a"
  >
    Library
  </BreadcrumbItem>
  <BreadcrumbItem
    href="#"
    tag="a"
  >
    Data
  </BreadcrumbItem>
  <BreadcrumbItem
    active
    tag="span"
  >
    Bootstrap
  </BreadcrumbItem>
</Breadcrumb>
      <Form
      onSubmit={handleAddSubmission}
      >
        <FormGroup>
          <Label for="exampleEmail">Title</Label>
          <Input type="title" name="title" id="exampleTitle" placeholder="Title"  value={title}
                    onChange={event => setTitle(event.target.value)}/>
        </FormGroup>
        {/* <FormGroup>
          <Label for="exampleSelect">Select</Label>
          <Input type="select" name="select" id="exampleSelect">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Input>
        </FormGroup> */}
        {/* <FormGroup>
          <Label for="exampleSelectMulti">Select Multiple</Label>
          <Input type="select" name="selectMulti" id="exampleSelectMulti" multiple>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Input>
        </FormGroup> */}
        <FormGroup>
          <Label for="exampleText">Music Description</Label>
          <Input type="textarea" name="text" id="exampleDescription" placeholder='enter description about composed music'  value={description}
                    onChange={event => setDescription(event.target.value)}/>
        </FormGroup>
        <FormGroup>
          <Label for="exampleFile">File</Label>
          <Input type="file" name="file" id="project files"  value={file}
                    onChange={event => setFile(event.target.value)}/>
          <FormText color="muted">
            Upload a pdf of your composed music along with an mp3 file if you have one.
          </FormText>
        </FormGroup>
        <Button>Submit</Button>
      </Form>
      </Container>
    );
  }
