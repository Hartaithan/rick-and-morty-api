import React from "react";
import "./list.scss";
import { Col, Row, Button } from "react-bootstrap";
import { ICharacter } from "../../models/CharacterModel";
import characters from "../../store/characters";
import { observer } from "mobx-react-lite";
import modals, { ModalTypes } from "../../store/modals";

const List: React.FC = () => {
  return (
    <div className="list">
      {characters.list.length === 0 ? (
        <Row>
          <Col>There is nothing here</Col>
        </Row>
      ) : (
        <Row>
          {characters.list.map((char: ICharacter) => {
            return (
              <Col
                className="card__col"
                xs={12}
                md={6}
                lg={4}
                xl={3}
                key={`${char.id}-${char.name}`}
              >
                <div className="card">
                  <img className="card__img" src={char.image} alt={char.name} />
                  <div className="card__descr">
                    <p className="card__name">{char.name}</p>
                    <p className="card__status">{char.status}</p>
                    <Button
                      onClick={() => modals.open(ModalTypes.Detail, char.id)}
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
};

export default observer(List);
