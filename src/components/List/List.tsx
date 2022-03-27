import React from "react";
import "./list.scss";
import { Col, Row } from "react-bootstrap";
import { ICharacter } from "../../models/CharacterModel";
import characters from "../../store/characters";
import { observer } from "mobx-react-lite";
import Card from "../Card/Card";

const List: React.FC = () => {
  return (
    <div className="list">
      {characters.list.length === 0 ? (
        <Row>
          <Col>There is nothing here</Col>
        </Row>
      ) : (
        <Row>
          {characters.list.map((char: ICharacter) => (
            <Card char={char} />
          ))}
        </Row>
      )}
    </div>
  );
};

export default observer(List);
