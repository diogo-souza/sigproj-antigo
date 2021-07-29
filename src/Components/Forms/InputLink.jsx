import React from 'react';
import { Form, FormControl, FormGroup, FormLabel, Col } from 'react-bootstrap';

// {props.value !== null ? (props.value) : ("Campo vazio")}

export default function InputLink(props) {
  return (
    <FormGroup as={Col} controlId={props.label}>
      <FormLabel>{props.label}</FormLabel>
      <FormControl
        required={props.required}
        disabled={props.disabled}
        type="text"
        placeholder={props.placeholder}
        value={props.value}
        min={0}
        onChange={props.handleChange}
      />
      <Form.Control.Feedback type="invalid">
        {props.feedback}
      </Form.Control.Feedback>
    </FormGroup>
  );
}
