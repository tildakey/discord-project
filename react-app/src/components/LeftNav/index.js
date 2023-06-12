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

const LeftNav = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user)
  const userServers = useSelector((state) => state.session.user?.serverMember)
  let history = useHistory()
  const currentChannels = useSelector((state) => state.serversReducer?.currentServer?.channels)
  const handleHomeClick = async (channelId) => {
    await dispatch(getAChannel(channelId));
  };

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
        <img className="left_side_icon" src={`${user.profilePic}`} alt="user pic"></img>
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
