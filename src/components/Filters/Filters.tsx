import React from "react";
import "./filters.scss";
import { Col, Row, Form, Button } from "react-bootstrap";
import { IFilterProps } from "../../models/FilterModel";
import filters from "../../store/filters";
import { observer } from "mobx-react-lite";

const Filters: React.FC<IFilterProps> = (props) => {
  const { handleSubmit } = props;

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
            onChange={(e) => filters.setValue("name", e.target.value)}
            value={filters.inputs.name}
          />
        </Form.Group>
        <Form.Group as={Col} xs={12} md={4}>
          <Form.Control
            placeholder="Enter type..."
            onChange={(e) => filters.setValue("type", e.target.value)}
            value={filters.inputs.type}
          />
        </Form.Group>
        <Form.Group as={Col} xs={12} md={4}>
          <Form.Control
            placeholder="Enter species..."
            onChange={(e) => filters.setValue("species", e.target.value)}
            value={filters.inputs.species}
          />
        </Form.Group>
        <Form.Group as={Col} xs={12} md={4}>
          <Form.Select
            aria-label="Status select"
            onChange={(e) => filters.setValue("status", e.target.value)}
            value={filters.inputs.status.toLocaleLowerCase()}
          >
            <option value="">All statuses</option>
            <option value="alive">Alive</option>
            <option value="dead">Dead</option>
            <option value="unknown">Unknown</option>
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col} xs={12} md={4}>
          <Form.Select
            aria-label="Gender select"
            onChange={(e) => filters.setValue("gender", e.target.value)}
            value={filters.inputs.gender.toLocaleLowerCase()}
          >
            <option value="">All genders</option>
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
};

export default observer(Filters);
