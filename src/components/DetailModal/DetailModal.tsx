import React from "react";
import "./detailModal.scss";
import { Modal, Accordion } from "react-bootstrap";
import { IDetailModalProps } from "../../models/DetailModalModel";
import { ICharacter } from "../../models/CharacterModel";
import Loader from "../Loader/Loader";
import API from "../../api";

const DetailModal: React.FC<IDetailModalProps> = (props) => {
  const { modal, setModal } = props;
  const [details, setDetails] = React.useState<ICharacter | null>(null);

  React.useEffect(() => {
    if (modal.isShow) {
      API.get(`/character/${modal.id}`).then(({ data }) => {
        setDetails(data);
        setModal({ ...modal, isLoading: false });
      });
    }
  }, [modal.isShow]); // eslint-disable-line

  return (
    <Modal
      className="detail-modal"
      show={modal.isShow}
      onHide={() =>
        setModal({ ...modal, id: null, isShow: false, isLoading: true })
      }
      centered
    >
      {modal.isLoading ? (
        <Loader />
      ) : (
        <>
          <Modal.Header closeButton>
            <Modal.Title>
              <img
                className="detail-modal__avatar"
                src={details?.image}
                alt={details?.name || "character image"}
              />
              <p>{details?.name}</p>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="detail-modal__item">
              <div className="detail-modal__item__title">Gender:</div>
              <div className="detail-modal__item__value">{details?.gender}</div>
            </div>
            <div className="detail-modal__item">
              <div className="detail-modal__item__title">Status:</div>
              <div className="detail-modal__item__value">{details?.status}</div>
            </div>
            <div className="detail-modal__item">
              <div className="detail-modal__item__title">Species:</div>
              <div className="detail-modal__item__value">
                {details?.species}
              </div>
            </div>
            <div className="detail-modal__item">
              <div className="detail-modal__item__title">Origin:</div>
              <div className="detail-modal__item__value">
                {details?.origin.name === "unknown" ? (
                  <p>{details?.origin.name}</p>
                ) : (
                  <a href={details?.origin.url}>{details?.origin.name}</a>
                )}
              </div>
            </div>
            <div className="detail-modal__item">
              <div className="detail-modal__item__title">Location:</div>
              <div className="detail-modal__item__value">
                {details?.location.name === "unknown" ? (
                  <p>{details?.location.name}</p>
                ) : (
                  <a href={details?.location.url}>{details?.location.name}</a>
                )}
              </div>
            </div>
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>{`Episodes (${details?.episode.length})`}</Accordion.Header>
                <Accordion.Body>
                  <div className="detail-modal__item__value episodes">
                    {details?.episode.map((ep: string) => {
                      return <a href={ep}>{ep.split("episode/")[1]}</a>;
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

export default DetailModal;
