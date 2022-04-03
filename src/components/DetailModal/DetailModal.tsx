import React from "react";
import "./detailModal.scss";
import { Modal, Accordion, OverlayTrigger } from "react-bootstrap";
import { ICharacter } from "../../models/CharacterModel";
import Loader from "../Loader/Loader";
import API from "../../api";
import modals, { ModalTypes } from "../../store/modals";
import { observer } from "mobx-react-lite";
import LocationPopover from "../Popovers/LocationPopover";
import EpisodePopover from "../Popovers/EpisodePopover";

const DetailModal: React.FC = () => {
  const [isLoading, setLoading] = React.useState(true);
  const [details, setDetails] = React.useState<ICharacter | null>(null);

  React.useEffect(() => {
    if (modals.values.detail) {
      API.get(`/character/${modals.id}`).then(({ data }) => {
        setDetails(data);
        setLoading(false);
      });
    }
  }, [modals.values.detail]); // eslint-disable-line

  return (
    <Modal
      className="detail-modal"
      show={modals.values.detail}
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
                  <text>{details.origin.name}</text>
                ) : (
                  <OverlayTrigger
                    trigger="click"
                    placement="right"
                    overlay={<LocationPopover url={details.origin.url} />}
                  >
                    <p>{details.origin.name}</p>
                  </OverlayTrigger>
                )}
              </p>
            </div>
            <div className="detail-modal__item">
              <p className="detail-modal__item__title">Location:</p>
              <div className="detail-modal__item__value">
                {details.location.name === "unknown" ? (
                  <text>{details.location.name}</text>
                ) : (
                  <OverlayTrigger
                    trigger="click"
                    placement="right"
                    overlay={<LocationPopover url={details.location.url} />}
                  >
                    <p>{details.location.name}</p>
                  </OverlayTrigger>
                )}
              </div>
            </div>
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>{`Episodes (${details.episode.length})`}</Accordion.Header>
                <Accordion.Body>
                  <div className="detail-modal__item__value episodes">
                    {details.episode.map((ep: string) => {
                      return (
                        <OverlayTrigger
                          trigger="click"
                          placement="right"
                          overlay={<EpisodePopover url={ep} />}
                        >
                          <p>{ep.split("episode/")[1]}</p>
                        </OverlayTrigger>
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
