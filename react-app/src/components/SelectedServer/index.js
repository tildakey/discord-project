import "./SelectedServer.css"
import Members from "../Members";
import SelectedChannel from '../SelectedChannel'
import Channels from "../Channels";
import EditAServerModal from "../EditAServer/EditAServerModal";
import { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useLocation, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { getAServer } from "../../store/servers";

const SelectedServer = () => {
    const [loaded, setLoaded] = useState(false);
    const [validated, setValidated] = useState(true);
    const { serverId, channelId} = useParams();
    const [channelLoaded, setChannelLoaded] = useState(false);

    const dispatch = useDispatch();
    const currentUserId = useSelector((state) => state.session.user.id)
    const currentServerOwnerId = useSelector((state) => state.serversReducer?.currentServer?.ownerId?.id)
    const serversObj = useSelector((state) => state.serversReducer);
    const user = useSelector((state) => state.session.user);
    const membersObj = useSelector((state) => state.serversReducer.currentServer.members)
    const channelsObj = useSelector((state) => state.serversReducer.currentServer.channels)
    const isServerOwner = currentUserId === currentServerOwnerId

    let history = useHistory();
    const [member, setMember] = useState(false);

    useEffect(() => {
        let membersArr;
        if (membersObj) membersArr = Object.values(membersObj);
        if (membersArr)
          setMember(membersArr.find((member) => member.userId === user.id));

          
        
        setLoaded(true);
        setChannelLoaded(true)
      }, [membersObj, user.id, history, serverId]);
      return (
        loaded && (
          <div>
            <div className="move-it-over">
            {isServerOwner && (
              <EditAServerModal/>
        )}
              
            </div>
            {/* <div className="server-channel-container">
            {channelLoaded && (
              <Channels channels={channelsObj} className="channels" />
              )}
          </div> */}
          <div className="channel">
          {channelLoaded && (
            <SelectedChannel channelsObj={channelsObj} className="one_channel" />
          )}
        </div>
                {channelLoaded && (
                  <Members
                    serversObj={serversObj}
                    channelsObj={channelsObj}
                    className="members"
                  />
                )}
             
          </div>
        )
      );
    };
    
    export default SelectedServer;
