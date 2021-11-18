import React from "react";
import "../styles/filters.scss";
import { Col, Row, Form, Button } from "react-bootstrap";

function Filters(props: any) {
  const { handleSubmit, inputs, setInputs } = props;

  return (
    <div className="filters">
      <Row>
        <Col xs={12} md={4}>
          <Form.Control
            placeholder="Enter name..."
            onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
          />
        </Col>
        <Col xs={12} md={4}>
          <Form.Control
            placeholder="Enter type..."
            onChange={(e) => setInputs({ ...inputs, type: e.target.value })}
          />
        </Col>
        <Col xs={12} md={4} className="mb-2">
          <Form.Control
            placeholder="Enter species..."
            onChange={(e) => setInputs({ ...inputs, species: e.target.value })}
          />
        </Col>
        <Col xs={12} md={4}>
          <Form.Select
            aria-label="Status select"
            onChange={(e) => setInputs({ ...inputs, status: e.target.value })}
          >
            <option value="">Choose status...</option>
            <option value="alive">Alive</option>
            <option value="dead">Dead</option>
            <option value="unknown">Unknown</option>
          </Form.Select>
        </Col>
        <Col xs={12} md={4}>
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
        </Col>
        <Col xs={12} md={4}>
          <Button className="w-100 h-100" onClick={() => handleSubmit()}>
            Search
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default Filters;
