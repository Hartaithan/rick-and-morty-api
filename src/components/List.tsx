import React from "react";
import "../styles/list.scss";
import { Col, Row } from "react-bootstrap";

function List(props: any) {
  const { characters } = props;
  return (
    <div className="list">
      <Row>
        {characters.map((char: any) => (
          <Col xs={6} xl={3} key={char.name}>
            <div className="card">
              <img className="card_img" src={char.image} alt={char.name} />
              <div className="card_descr">
                <p className="card_name">{char.name}</p>
                <p className="card_status">{char.status}</p>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default List;
