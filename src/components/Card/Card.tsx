import React from "react";
import { Button, Col } from "react-bootstrap";
import { ICardProps } from "../../models/CardModel";
import modals, { ModalTypes } from "../../store/modals";
import "./card.scss";

const Card: React.FC<ICardProps> = ({ char }) => {
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
          <Button onClick={() => modals.open(ModalTypes.Detail, char.id)}>
            Details
          </Button>
        </div>
      </div>
    </Col>
  );
};

export default Card;
