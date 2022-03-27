import React from "react";
import "./detailModal.scss";
import { Modal, Accordion } from "react-bootstrap";
import { ICharacter } from "../../models/CharacterModel";
import Loader from "../Loader/Loader";
import API from "../../api";
import modals, { ModalTypes } from "../../store/modals";
import { observer } from "mobx-react-lite";

const DetailModal: React.FC = () => {
  const [isLoading, setLoading] = React.useState(true);
  const [details, setDetails] = React.useState<ICharacter | null>(null);

  React.useEffect(() => {
    if (modals.detail) {
      API.get(`/character/${modals.id}`).then(({ data }) => {
        setDetails(data);
        setLoading(false);
      });
    }
  }, [modals.detail]); // eslint-disable-line

  return (
    <Modal
      className="detail-modal"
      show={modals.detail}
      onHide={() => modals.close(ModalTypes.Detail)}
      onExited={() => setLoading(true)}
      centered
    >
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Modal.Header closeButton>
            <Modal.Title>
              <img
                className="detail-modal__avatar"
                src={details.image}
                alt={details.name || "character image"}
              />
              <p>{details.name}</p>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="detail-modal__item">
              <p className="detail-modal__item__title">Gender:</p>
              <p className="detail-modal__item__value">{details.gender}</p>
            </div>
            <div className="detail-modal__item">
              <p className="detail-modal__item__title">Status:</p>
              <p className="detail-modal__item__value">{details.status}</p>
            </div>
            <div className="detail-modal__item">
              <p className="detail-modal__item__title">Species:</p>
              <p className="detail-modal__item__value">{details.species}</p>
            </div>
            <div className="detail-modal__item">
              <p className="detail-modal__item__title">Origin:</p>
              <p className="detail-modal__item__value">
                {details.origin.name === "unknown" ? (
                  <p>{details.origin.name}</p>
                ) : (
                  <a href={details.origin.url}>{details.origin.name}</a>
                )}
              </p>
            </div>
            <div className="detail-modal__item">
              <p className="detail-modal__item__title">Location:</p>
              <p className="detail-modal__item__value">
                {details.location.name === "unknown" ? (
                  <p>{details.location.name}</p>
                ) : (
                  <a href={details.location.url}>{details.location.name}</a>
                )}
              </p>
            </div>
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>{`Episodes (${details.episode.length})`}</Accordion.Header>
                <Accordion.Body>
                  <div className="detail-modal__item__value episodes">
                    {details.episode.map((ep: string) => {
                      return (
                        <a href={ep} key={ep}>
                          {ep.split("episode/")[1]}
                        </a>
                      );
                    })}
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Modal.Body>
        </>
      )}
    </Modal>
  );
};

export default observer(DetailModal);
