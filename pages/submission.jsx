import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Container } from 'reactstrap';

export default class Example extends React.Component {
  render() {
    return (
        <Container>
      <Form>
        <FormGroup>
          <Label for="exampleEmail">Title</Label>
          <Input type="title" name="title" id="exampleTitle" placeholder="Title" />
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
          <Input type="textarea" name="text" id="exampleDescription" placeholder='enter description about composed music'/>
        </FormGroup>
        <FormGroup>
          <Label for="exampleFile">File</Label>
          <Input type="file" name="file" id="project files" />
          <FormText color="muted">
            Upload a pdf of your composed music along with an mp3 file if you have one.
          </FormText>
        </FormGroup>
        <Button>Submit</Button>
      </Form>
      </Container>
    );
  }
}