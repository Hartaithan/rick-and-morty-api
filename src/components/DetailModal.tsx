import React from "react";
import axios from "axios";
import "../styles/modal.scss";
import { Modal, Spinner, Accordion } from "react-bootstrap";

type modalTypes = {
  id: number | null;
  isShow: boolean;
  isLoading: boolean;
};

type detailsReponse = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
};

export interface DetailModalProps {
  modal: modalTypes;
  setModal: React.Dispatch<React.SetStateAction<modalTypes>>;
}

function DetailModal({ modal, setModal }: DetailModalProps) {
  const [details, setDetails] = React.useState<detailsReponse | null>(null);

  React.useEffect(() => {
    if (modal.isShow) {
      axios
        .get(`https://rickandmortyapi.com/api/character/${modal.id}`)
        .then(({ data }) => {
          setDetails(data);
          setModal({ ...modal, isLoading: false });
        });
    }
  }, [modal.isShow]); // eslint-disable-line

  return (
    <Modal
      className="detailModal"
      show={modal.isShow}
      onHide={() =>
        setModal({ ...modal, id: null, isShow: false, isLoading: true })
      }
      centered
    >
      {modal.isLoading ? (
        <div className="detailModal_loader">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <>
          <Modal.Header closeButton>
            <Modal.Title>
              <img
                className="card_img"
                src={details?.image}
                alt={details?.name || "character image"}
              />
              <p>{details?.name}</p>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="detailModal_item">
              <div className="detailModal_item_title">Gender:</div>
              <div className="detailModal_item_value">{details?.gender}</div>
            </div>
            <div className="detailModal_item">
              <div className="detailModal_item_title">Status:</div>
              <div className="detailModal_item_value">{details?.status}</div>
            </div>
            <div className="detailModal_item">
              <div className="detailModal_item_title">Species:</div>
              <div className="detailModal_item_value">{details?.species}</div>
            </div>
            <div className="detailModal_item">
              <div className="detailModal_item_title">Origin:</div>
              <div className="detailModal_item_value">
                {details?.origin.name === "unknown" ? (
                  <p>{details?.origin.name}</p>
                ) : (
                  <a href={details?.origin.url}>{details?.origin.name}</a>
                )}
              </div>
            </div>
            <div className="detailModal_item">
              <div className="detailModal_item_title">Location:</div>
              <div className="detailModal_item_value">
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
                  <div className="detailModal_item_value episodes">
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
}

export default DetailModal;
