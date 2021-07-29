import React from 'react';
import { Form, FormControl, FormGroup, FormLabel, Col } from 'react-bootstrap';

export default function InputSelect(props) {
  return (
    <FormGroup as={Col} md={props.tamanho} controlId={props.label}>
      <FormLabel>{props.label}</FormLabel>
      <FormControl
        required={props.required}
        as="select"
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.handleChange}
        disabled={props.disabled}
      >
        <option value="">Selecione uma opção</option>
        {Array.isArray(props.optionsList) ? (
          <>
            {props.optionsList.map((val) => (
              <option>{val}</option>
            ))}
          </>
        ) : (
          <>{Object.entries(props.optionsList).map((val) => (
            <option value={val[0]}>{val[1]}</option>
          ))}</>
        )}
      </FormControl>
      <Form.Control.Feedback type="invalid">
        {props.feedback}
      </Form.Control.Feedback>
    </FormGroup>
  );
}
