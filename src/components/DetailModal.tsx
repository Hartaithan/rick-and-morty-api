import React from "react";
import axios from "axios";
import "../styles/modal.scss";
import { Modal, Spinner } from "react-bootstrap";

function DetailModal(props: any) {
  const { modal, setModal } = props;
  const [details, setDetails] = React.useState<any>({});

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
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <>
          <Modal.Header closeButton>
            <Modal.Title>{details.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        </>
      )}
    </Modal>
  );
}

export default DetailModal;
