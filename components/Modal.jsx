import "./Modal.css";

const Modal = ({ toggleModal, children }) => {
  return (
    <div className="Modal">
      <button onClick={toggleModal} className="Modal-button">
        ✖
      </button>
      <div className="Modal-content">{children}</div>
    </div>
  );
};

export default Modal;
