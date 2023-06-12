import "./LeftNav.css";
import Servers from "../Servers";
import Channels from "../Channels";
import { NavLink } from "react-router-dom";
import  CreateNewServerModal from "../CreateNewServer/CreateNewServerModal"
import CreateChannelModal from "../CreateANewChannel/CreateANewChannelModal"
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { useHistory } from "react-router-dom";
import { getAChannel } from "../../store/channel";
import { useEffect } from "react";
import { getAllServers } from "../../store/servers";

const LeftNav = ({userServers}) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user)
  // const userServers = useSelector((state) => state.serversReducer?.userServers)
  let history = useHistory()
  const currentChannels = useSelector((state) => state.serversReducer?.currentServer?.channels)

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push('/')
  };

  return (
    user && (
      <div className="left" id="left-nav">
        <NavLink
          className="home-button"
          to={`/discovery`}
        >
           <div className="icon_container">
            <img
              className="left_side_icon"
              src="https://res.cloudinary.com/dhruiovd0/image/upload/v1686429916/152428905-house-icon-home-icon-house-icon-isolated-on-white-background_qh5drx.jpg"
              alt="home"
            ></img>
          </div>
        </NavLink>
        <p>{user.username}</p>
            <button onClick={handleLogout}>Log Out</button>
        <span className="home-space" />
        <Servers
          userServers={userServers}
        ></Servers>
         <span className="home-space" />
        <CreateNewServerModal/>
        <span className="home-space" />
        <Channels currentChannels={currentChannels} />
        <span className="home-space" />
        <CreateChannelModal />
      </div>
    )
  );
};

export default LeftNav;
