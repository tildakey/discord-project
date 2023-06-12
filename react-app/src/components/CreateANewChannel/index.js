import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addChannel, postChannel } from "../../store/channel";
import { useModal } from "../../context/Modal";
import "../EditAChannelModal/EditAChannelModal.css"

const CreateANewChannel = () => {
  const [name, setName] = useState("");
  const [errors, setErrors] = useState([]);
  const [activeCreate, setActiveCreate] = useState(false);
  const { closeModal } = useModal();

  const dispatch = useDispatch();
  let history = useHistory();

  const server = useSelector((state) => state.serversReducer.currentServer);
  const watchChannel = useSelector((state) => state.channelsReducer.channels);
  useEffect(() => {
    if (name.length > 0) {
      setActiveCreate(true);
    } else {
      setActiveCreate(false);
    }
  }, [name, errors]);
  const validate = () => {
    let errors = [];
    let valid = 0;
    if (name.length < 1) {
      valid = -1;
      errors.push("You must include a Channel Name.");
      setActiveCreate(false);
    } else {
      valid = 1;
    }
    let nameArr = name.split("-");

    for (let i = 0; i < nameArr.length; i++) {
      let ind = nameArr[i];
      if (ind.length > 15) {
        valid = -1;
        setActiveCreate(false);
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
      dispatch(
        postChannel({
          serverId: server.id,
          name: name
        })
      )
        .then((response) =>
          history.push(`/channels/${response.server_id}/${response.id}`)
        ).then(()=> closeModal())
    }

    return;
  };

  return (
    <div className="modal-edit">
      <div>
        <h1 className="create-a-channel-title">Create Text Channel</h1>
      </div>
      <div className="inputs-container">
        <label className="inputs" htmlFor="text_chan">
          <div className="label-inputs-contain">
            <div className="label-messages">
            </div>
          </div>
        </label>
      </div>
      <div className="channel-name-container">
        <label className="channel-name-label" htmlFor="channel-name">
          CHANNEL NAME
        </label>
        <input
          className="channel-name-input"
          id="channel-name"
          onChange={(e) => setName(e.target.value.replace(" ", "-"))}
          placeholder="new-channel"
          value={name}
        />
      </div>
      {errors.length > 0 && (
        <div className="create-chan-errors">
          {errors.map((error, ind) => (
            <div key={ind || error}>{error}</div>
          ))}
        </div>
      )}
      <div className="add-channel-buttons-contain">
        <div className="add-channel-buttons">
          <h5 style={{ cursor: "pointer" }} className={ "button-like-text button-container"} onClick={() => closeModal()}>
            Cancel
          </h5>

          <h5
            style={{ cursor: "pointer" }}
            className={ "button-like-text button-container"}
            onClick={activeCreate ? handleSubmit : () => validate()}
          >
            Create Channel
          </h5>
        </div>
      </div>
    </div>
  );
};

export default CreateANewChannel;
