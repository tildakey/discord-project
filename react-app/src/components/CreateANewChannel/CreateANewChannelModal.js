import React, { useState } from "react";
import CreateANewChannel from ".";
import OpenModalButton from "../OpenModalButton";

const CreateChannelModal = () => {

  return (
    <>
         <>
        <OpenModalButton
        buttonText="Create a Channel"
        modalComponent={<CreateANewChannel />}
      />
    </>
    </>
  );
};

export default CreateChannelModal;
