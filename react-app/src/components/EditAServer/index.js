import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { deleteServer, getAServer } from "../../store/servers";
import { getAChannel } from "../../store/channel";
import { useDispatch, useSelector } from "react-redux";
import { putCurrentServer } from "../../store/servers";
import { useModal } from "../../context/Modal";
import "../EditAChannelModal/EditAChannelModal.css"

const EditAServer = () => {
    const dispatch = useDispatch();
    let history = useHistory();

    const server = useSelector((state) => state.serversReducer.currentServer);
    const currentChannel = useSelector((state) => state.channelsReducer.currentChannel);

    const [selected, setSelected] = useState("Overview");
    const [name, setName] = useState(server.name);
    const [errors, setErrors] = useState([]);
    const [activeSave, setActiveSave] = useState(false);
    const [requireSave, setRequireSave] = useState(false);
    const { closeModal } = useModal()

    useEffect(() => {
        if (name !== server.name) {
            setRequireSave(true);
        } else {
            setRequireSave(false);
        }
        if (name.length < 20) {
            setErrors([]);
        }
    }, [name, server.name]);

    useEffect(() => {
        if (name.length > 0) {
            setActiveSave(true);
        } else {
            setActiveSave(false);
        }
    }, [name, errors]);

    const validate = () => {
        let errors = [];
        let valid = 0;
        if (name.trim().length < 1) {
            valid -= 1;
            errors.push("You must include a Server Name.");
            setActiveSave(false);
            setName("");
        } else {
            valid += 1;
        }
        if (name.length > 15) {
            valid -= 1;
            errors.push("Your Server Name must be 15 or less characters.");
            setActiveSave(false);
        } else {
            valid += 1;
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
            const formData = new FormData();
            formData.append("name", name);
            await dispatch(putCurrentServer(server.id, formData))
            if (currentChannel.id === server.generalChatId) {
                await dispatch(getAChannel(server.generalChatId))
                    .then(() => closeModal())
            }
        }
    };

    const handleDelete = async () => {
        await dispatch(deleteServer(server.id))
            .then(() => closeModal())
            .then(() =>
                history.push(
                    `/discovery`
                )
            )

    };

    const checkChanges = () => {
        if (name !== server.name) {
            setRequireSave(true);
        }
    };

    const reset = () => {
        setName(server.name);
        setRequireSave(false);
    };
    return (
        <div className="modal-edit">
            <div className="options-container">
                <div className="edit-options">
                    {name ? <h5>{name.toUpperCase()}</h5> : <h5>Server Settings</h5>}
                    {/* <h4 onClick={() => setSelected("Overview")}>Overview</h4> */}
                </div>
            </div>
            <div className="info">
                {selected === "Overview" && (
                    <div className="container-overview">
                        <h3 className="overview-title" id="serveridtag">
                            Server Overview
                        </h3>
                        <div className="Overview">
                            <div className="channel-edit-name">
                                <label htmlFor="server_name">SERVER NAME</label>

                                <input
                                    id="name-server"
                                    className="server-name"
                                    placeholder={server.name}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                ></input>
                            </div>
                            <div
                        className="button-container button-like-text"
                        onClick={handleDelete}
                        style={{ cursor: "pointer", gap: "10px" }}
                    >
                        <h3>Delete Server</h3>
                    </div>
                        </div>
                        {errors.length > 0 && (
                            <div className="errors_edit">
                                {errors.map((error, ind) => (
                                    <div key={ind || error}>{error}</div>
                                ))}
                            </div>
                        )}
                        {requireSave && (
                            <div className="require_save_container">
                                <div className="require_save_message">
                                    <h4>Careful</h4>
                                    <h4>you have unsaved changes!</h4>
                                </div>
                                <div className="">
                                    <h5
                                        className="button-container button-like-text"
                                        onClick={reset}
                                        style={{ cursor: "pointer" }}
                                    >
                                        Reset
                                    </h5>
                                    <h5
                                        // className={activeSave ? "save active_save" : "save"}
                                        className="button-container button-like-text"
                                        onClick={activeSave ? handleSubmit : () => validate}
                                        style={
                                            activeSave ? { cursor: "pointer" } : { cursor: "default" }
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
            {/* <div
                onClick={checkChanges}
                className="escape-container"
                style={{ cursor: "pointer" }}
            >
                <h5 className="esc">ESC</h5>
            </div> */}
        </div>
    );
};

export default EditAServer;
