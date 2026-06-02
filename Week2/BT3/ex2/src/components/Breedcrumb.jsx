import React from 'react';
import { Breadcrumb } from 'react-bootstrap';


function Breedcrumb() {
  return (
    <Breadcrumb>
      <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
      <Breadcrumb.Item href="/about">About</Breadcrumb.Item>
      <Breadcrumb.Item active>Registration</Breadcrumb.Item>
    </Breadcrumb>
  );
}

export default Breedcrumb;