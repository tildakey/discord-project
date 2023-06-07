import "./LeftNav.css";
import Servers from "../Servers";
import { NavLink } from "react-router-dom";
import  CreateNewServerModal from "../CreateNewServer/CreateNewServerModal"
import { useSelector, useDispatch } from "react-redux";
import { getAChannel } from "../../store/channel";

const LeftNav = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user)
  const userServers = useSelector((state) => state.session.user.serverMember)
  const handleHomeClick = async (channelId) => {
    await dispatch(getAChannel(channelId));
  };
  return (
    user && (
      <div className="left" id="left-nav">
        <NavLink
          className="home-button"
          to={`/discovery`}
        >
        </NavLink>
        <span className="home-space" />
        <Servers
          userServers={userServers}
        ></Servers>
        <CreateNewServerModal/>
      </div>
    )
  );
};

export default LeftNav;
