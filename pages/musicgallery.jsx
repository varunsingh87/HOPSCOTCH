import React from 'react';
import { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Container } from 'reactstrap';
import { useMutation } from "../convex/_generated/react";
import { Breadcrumb, BreadcrumbItem, CardGroup, Card, CardTitle, CardBody, CardSubtitle, CardText, CardImg} from 'reactstrap';

export default function App() {
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
            <CardGroup>
                <Card>
                    <CardImg
                        alt="Card image cap"
                        src="https://picsum.photos/318/180"
                        top
                        width="100%"
                    />
                    <CardBody>
                        <CardTitle tag="h5">
                            Card title
                        </CardTitle>
                        <CardSubtitle
                            className="mb-2 text-muted"
                            tag="h6"
                        >
                            Card subtitle
                        </CardSubtitle>
                        <CardText>
                            This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
                        </CardText>
                        <Button>
                            Like
                        </Button>
                    </CardBody>
                </Card>
                <Card>
                    <CardImg
                        alt="Card image cap"
                        src="https://picsum.photos/318/180"
                        top
                        width="100%"
                    />
                    <CardBody>
                        <CardTitle tag="h5">
                            Card title
                        </CardTitle>
                        <CardSubtitle
                            className="mb-2 text-muted"
                            tag="h6"
                        >
                            Card subtitle
                        </CardSubtitle>
                        <CardText>
                            This card has supporting text below as a natural lead-in to additional content.
                        </CardText>
                        {/* <Button>
                            Button
                        </Button> */}
                    </CardBody>
                </Card>
                <Card>
                    <CardImg
                        alt="Card image cap"
                        src="https://picsum.photos/318/180"
                        top
                        width="100%"
                    />
                    <CardBody>
                        <CardTitle tag="h5">
                            Card title
                        </CardTitle>
                        <CardSubtitle
                            className="mb-2 text-muted"
                            tag="h6"
                        >
                            Card subtitle
                        </CardSubtitle>
                        <CardText>
                            This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.
                        </CardText>
                        {/* <Button>
                            Button
                        </Button> */}
                    </CardBody>
                </Card>
            </CardGroup>
        </Container>
    );
}
