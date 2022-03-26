import React from "react";
import "./list.scss";
import { Col, Row, Button } from "react-bootstrap";
import { IListProps } from "../../models/ListModel";
import { ICharacter } from "../../models/CharacterModel";

const List: React.FC<IListProps> = (props) => {
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
};

export default List;
