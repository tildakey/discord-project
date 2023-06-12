import "./Channels.css";
import { NavLink } from "react-router-dom";
import { getAChannel } from "../../store/channel";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import CreateChannelModal from "../CreateANewChannel/CreateANewChannelModal"
import EditAChannel from "../EditAChannelModal";
import OpenModalButton from "../OpenModalButton";


const Channels = ({currentChannels}) => {
    const { channelId } = useParams();
    const [ownerId, setOwnerId] = useState();
    const [currentChannelId, setCurrentChannelId] = useState(channelId);
    const [hoverId, setHoverId] = useState(null);
    const [channels, setChannels] = useState();
    // const [showServerOptions, setShowServerOptions] = useState(false)
    const user = useSelector((state) => state.session.user);
    const currentServer = useSelector((state) => state.serversReducer.currentServer);
    const channelsObj = useSelector((state) => state.serversReducer.currentServer.channels);
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        if (channelsObj) {
            setOwnerId(currentServer.ownerId.id);
            setChannels(Object.values(channelsObj))
            setLoaded(true)
        }
    }, [
        dispatch,
        currentServer,
        setOwnerId,
        channelsObj,
        channelId,
    ]);

    const handleChannelChange = async (channelId) => {
        await dispatch(getAChannel(channelId)).then(() =>
            setCurrentChannelId(channelId)
        );
    };
    return (
        loaded && (
            <div className="">
                <div className="">
                    {/* <h1>ALL CHANNELS</h1> */}
                </div>

                {/* <div className="">
                    <CreateChannelModal />
                </div> */}
                {channels?.map((channel) => (
                    <NavLink
                        key={channel.id}
                        to={
                            `/channels/${channel.serverId}/${channel.id}`
                        }
                        onClick={() => handleChannelChange(channel.id)}
                    >
                        <div
                            className=""
                            onMouseEnter={() => setHoverId(channel.id)}
                            onMouseLeave={() => setHoverId(null)}
                        >
                            <p>{channel.name}</p>
                            {/* {((ownerId === user.id && currentChannelId * 1 === channel.id) ||
                                (ownerId === user.id && hoverId === channel.id)) &&
                                channel.name !== "General Chat" && (
                                    <div className="">
                                            <OpenModalButton
                                            buttonText="Edit a Channel"
                                            modalComponent={<EditAChannel />}
                                        />
                                    </div>
                                )} */}
                        </div>
                    </NavLink>
                ))}
            </div>
        )
    );
};

export default Channels;
