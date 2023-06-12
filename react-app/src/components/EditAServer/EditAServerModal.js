import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditAServer from ".";
import OpenModalButton from "../OpenModalButton";

const EditAServerModal = () => {
  return (
    <>
        <OpenModalButton
        buttonText="Edit Server"
        modalComponent={<EditAServer />}
      />
    </>
  );
};

export default EditAServerModal;
