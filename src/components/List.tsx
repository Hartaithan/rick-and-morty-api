import React from "react";
import "../styles/list.scss";
import { Col, Row, Button } from "react-bootstrap";
import { IListProps } from "../models/ListModel";
import { ICharacter } from "../models/CharacterModel";

function List(props: IListProps) {
  const { characters, modal, setModal } = props;
  return (
    <div className="list">
      {characters.length === 0 ? (
        <Row>
          <Col>There is nothing here</Col>
        </Row>
      ) : (
        <Row>
          {characters.map((char: ICharacter) => {
            return (
              <Col
                className="card_col"
                xs={12}
                md={6}
                lg={4}
                xl={3}
                key={`${char.id}-${char.name}`}
              >
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
            );
          })}
        </Row>
      )}
    </div>
  );
}

export default List;
