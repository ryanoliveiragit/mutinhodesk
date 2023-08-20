import "./styles.css";
import { Link } from "react-router-dom";

export const Header = () => {
  const user = localStorage.getItem("user");

  const username = user.split("@")[0];

  const cleanUsername = username.replace(/"/g, "");

  return (
    <div className="headerUser">
      <h3>MutinhoDesk</h3>
      <ul>
        <div className="flex">
          <li>#{cleanUsername}</li>
          <li><Link to="/user/meusChamados">meus chamados</Link></li>
        </div>
      </ul>
    </div>
  );
};
