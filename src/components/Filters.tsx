import React from "react";
import "../styles/filters.scss";
import { Col, Row, Form, Button } from "react-bootstrap";
import { FilterProps } from "../types";

function Filters(props: FilterProps) {
  const { handleSubmit, inputs, setInputs } = props;

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="filters">
      <Form as={Row} onKeyDown={handleKeyDown}>
        <Form.Group as={Col} xs={12} md={4}>
          <Form.Control
            placeholder="Enter name..."
            onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
          />
        </Form.Group>
        <Form.Group as={Col} xs={12} md={4}>
          <Form.Control
            placeholder="Enter type..."
            onChange={(e) => setInputs({ ...inputs, type: e.target.value })}
          />
        </Form.Group>
        <Form.Group as={Col} xs={12} md={4}>
          <Form.Control
            placeholder="Enter species..."
            onChange={(e) => setInputs({ ...inputs, species: e.target.value })}
          />
        </Form.Group>
        <Form.Group as={Col} xs={12} md={4}>
          <Form.Select
            aria-label="Status select"
            onChange={(e) => setInputs({ ...inputs, status: e.target.value })}
          >
            <option value="">Choose status...</option>
            <option value="alive">Alive</option>
            <option value="dead">Dead</option>
            <option value="unknown">Unknown</option>
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col} xs={12} md={4}>
          <Form.Select
            aria-label="Gender select"
            onChange={(e) => setInputs({ ...inputs, gender: e.target.value })}
          >
            <option value="">Choose gender...</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="genderless">Genderless</option>
            <option value="unknown">Unknown</option>
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col} xs={12} md={4}>
          <Button className="w-100 h-100" onClick={() => handleSubmit()}>
            Search
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}

export default Filters;
