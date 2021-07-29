import React from 'react';
import {
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Col,
  Row,
} from 'react-bootstrap';

export default function InputNumber(props) {
  return (
    <FormGroup as={Row} controlId={props.label}>
      <FormLabel>{props.label}</FormLabel>
      
        <FormControl
          required={props.required}
          disabled={props.disabled}
          type="number"
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
