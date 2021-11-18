import React from "react";
import "../styles/list.scss";
import { Col, Row, Button } from "react-bootstrap";

function List(props: any) {
  const { characters, modal, setModal } = props;
  return (
    <div className="list">
      <Row>
        {characters.map((char: any) => (
          <Col className="card_col" xs={6} xl={3} key={char.name}>
            <div className="card">
              <img className="card_img" src={char.image} alt={char.name} />
              <div className="card_descr">
                <p className="card_name">{char.name}</p>
                <p className="card_status">{char.status}</p>
                <Button
                  onClick={() =>
                    setModal({ ...modal, isShow: true, id: char.id })
                  }
                >
                  Details
                </Button>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default List;
