interface ModalProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onClose: () => void;
}

const Modal = ({ title, message, onConfirm, onClose }: ModalProps) => {
  return (
    <dialog
      id="my_modal_5"
      open={true}
      className="modal modal-middle modal-open"
    >
      <div className="modal-box w-80 md:w-96 lg:w-full">
        <h3 className="font-bold text-primary text-lg pb-1">{title}</h3>
        <p>{message}</p>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn" onClick={onClose}>
              Close
            </button>
          </form>
          <button className="btn btn-outline btn-primary" onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
