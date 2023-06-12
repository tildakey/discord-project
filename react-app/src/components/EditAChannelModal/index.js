import "./EditAChannelModal.css"
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { deleteChannel, putChannel } from "../../store/channel";
import { getAChannel } from "../../store/channel";
import { getAServer } from "../../store/servers";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";

const EditAChannel = ({ user, setShowModal }) => {
  const dispatch = useDispatch();
  let history = useHistory();
  const channel = useSelector((state) => state.channelsReducer.currentChannel);
  const server = useSelector((state) => state.serversReducer.currentServer)
  const [selected, setSelected] = useState("Overview");
  const [name, setName] = useState(channel.name);
  const [errors, setErrors] = useState([]);
  const [activeEdit, setActiveEdit] = useState(false);
  const { closeModal } = useModal();

  const [requireSave, setRequireSave] = useState(false);

  useEffect(() => {
    if (name !== channel.name) {
      setRequireSave(true);
    } else {
      setRequireSave(false);
    }
  }, [name, channel.name]);

  useEffect(() => {
    if (name.length > 0) {
      setActiveEdit(true);
    } else {
      setActiveEdit(false);
    }
  }, [name, errors]);
  const validate = () => {
    let errors = [];
    let valid = 0;
    if (name.length < 1) {
      valid = -1;
      errors.push("You must include a Channel Name.");
      setActiveEdit(false);
    } else {
      valid = 1;
    }
    let nameArr = name.split("-");

    for (let i = 0; i < nameArr.length; i++) {
      let ind = nameArr[i];
      if (ind.length > 15) {
        valid = -1;
        setActiveEdit(false);
        errors.push(
          "Each word in your channel name must be 15 or less characters."
        );
        setErrors(errors);
        return false;
      } else {
        valid = 1;
      }
    }

    if (valid > 0) {
      return true;
    } else {
      setErrors(errors);
      return false;
    }
  };



  const handleSubmit = async () => {
    if (validate()) {
      setErrors([]);
      await dispatch(
        putChannel({ id: channel.id, name: name, serverId: channel.serverId })
      ).then(() => dispatch(getAServer(channel.serverId)))
        .then(() => dispatch(getAChannel(channel.id)))
        .then(() => setRequireSave(false))
        .then(() => closeModal());
    }
  };

  const handleDelete = async () => {
    await dispatch(deleteChannel(channel.serverId, channel.id)).then(() =>
      closeModal()
    );

    if (server.generalChatId) {

      history.push(`/channels/${channel.serverId}/${server.generalChatId}`);
      await dispatch(getAChannel(server.generalChatId))
        .then(() => dispatch(getAServer(channel.serverId)))
    }
  };

  const checkChanges = () => {
    if (name !== channel.name) {
      setRequireSave(true);
    } else {
      closeModal()
    }
  };

  const reset = () => {
    setName(channel.name);

    setRequireSave(false);
  };
  return (
    <div className="modal-edit">
      <div className="options-container">
        <div className="edit-options">
          {name ? <h5>{name.toUpperCase()}</h5> : <h5>Channel Settings</h5>}


        </div>
      </div>
      <div className="info">
        {selected === "Overview" && (
          <div className="container-overview">
            <h3 className="overview-title" id="channelidtag">
              Channel Overview
            </h3>
            <div className="Overview">
              <div className="channel-edit-name">
                <label htmlFor="channel-name">CHANNEL NAME: </label>

                <input
                  id="name-channel"
                  className="channel-name"
                  placeholder={channel.name}
                  value={name}
                  onChange={(e) => setName(e.target.value.replace(" ", "-"))}
                ></input>
                <div
                  className="button-like-text button-container"
                  onClick={handleDelete}
                  style={{ cursor: "pointer", gap: "10px" }}
                >
                  <h3>Delete Channel</h3>
                </div>

              </div>
            </div>
            {errors.length > 0 && (
              <div className="errors-create-chan">
                {errors.map((error, ind) => (
                  <div key={ind || error}>{error}</div>
                ))}
              </div>
            )}
            {requireSave && (
              <div className="require-save-container">
                <div className="require-save-message">
                  <h4>Remember to save your changes!</h4>
                </div>
                <div className="reset-buttons">
                  <h5 className="button-like-text button-container" onClick={reset} style={{ cursor: "pointer" }}>
                    Reset
                  </h5>
                  <h5
                    className={"button-like-text button-container"}
                    onClick={activeEdit ? handleSubmit : () => validate}
                    style={
                      activeEdit ? { cursor: "pointer" } : { cursor: "default" }
                    }
                  >
                    Save Changes
                  </h5>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {/* <div onClick={checkChanges} className="button-like-text button-container" style={{ cursor: "pointer" }}>
        <h5 className="esc">Cancel</h5>
      </div> */}
    </div>
  );
};

export default EditAChannel;
