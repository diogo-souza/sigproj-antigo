import React from 'react';
import {
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Col,
} from 'react-bootstrap';

// {props.value !== null ? (props.value) : ("Campo vazio")}

export default function InputText(props) {
  return (
        <FormGroup as={Col} >
          <FormLabel>{props.label}</FormLabel>
          <FormControl
            required={props.required}
            disabled={props.disabled}
            type="text"
            placeholder={props.placeholder}
            value={props.value}
            maxLength="100"
            onChange={props.handleChange}
          />
          <Form.Control.Feedback type="invalid">
            {props.feedback}
          </Form.Control.Feedback>
        </FormGroup>
  );
}
