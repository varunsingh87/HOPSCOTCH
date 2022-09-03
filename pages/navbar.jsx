import React from 'react';
import {Breadcrumb, BreadcrumbItem} from 'reactstrap';
export default function App() {
  return (
    <>
    <Breadcrumb>
      <BreadcrumbItem active>
        Home
      </BreadcrumbItem>
    </Breadcrumb>
    <Breadcrumb>
      <BreadcrumbItem>
        <a href="#">
          Home
        </a>
      </BreadcrumbItem>
      <BreadcrumbItem active>
        Library
      </BreadcrumbItem>
    </Breadcrumb>
    <Breadcrumb>
      <BreadcrumbItem>
        <a href="#">
          Home
        </a>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <a href="#">
          Library
        </a>
      </BreadcrumbItem>
      <BreadcrumbItem active>
        Data
      </BreadcrumbItem>
    </Breadcrumb>
  </>
  
  );
}