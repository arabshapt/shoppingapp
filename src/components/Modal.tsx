import React from "react";
// import Button from "@material-ui/core/Button";
import Modal from '@material-ui/core/Modal';

interface CustomModalProps {
  modalState: [boolean, (value: boolean) => void];
  children: any;
}

const CustomModal = ({ modalState, children }: CustomModalProps) => {
  const [open, setOpen] = modalState;

  return (
    <Modal
      open={open}
      onClose={() => {
        console.log("onClose modal", open);
        setOpen(false);
      }}
    >
      {children}
    </Modal>
  );
};

export default CustomModal;
