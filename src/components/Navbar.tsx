import React, {useState, useContext} from 'react';
import "../styles/nav.scss";
import { Link, NavLink } from 'react-router-dom';
import { UserContext } from './../global/UserContext';
import logout from './../services/logout';

interface State {
  li1: string
  li2: string
  li3: string
  li4: string
}

const Navbar: React.FC = () => {
  const [active, setActive] = useState<State>({li1:"list-active",li2:"",li3:"",li4:""});

  const {state , setState} = useContext(UserContext);

  const handleClick = (event: React.MouseEvent) => {
    const {id: listId} = event.currentTarget;
    let initialState: State = {li1:"",li2:"",li3:"",li4:""};
    initialState[(listId as "li1"|"li2"|"li3"|"li4")]="list-active";
    setActive(initialState);
  }

  return (
    <nav className="navigation">
      <ul className="nav-ul-1">
        <li onClick={handleClick} id="li1" className={active.li1}>
          <Link style={{textDecoration:'none'}} to="/dashboard/home">
            <i id="icon-size-x" className="fa fa-home" aria-hidden="true"></i>
          </Link>
        </li>
        <li onClick={handleClick} id="li2" className={active.li2}>
          <Link to="/dashboard/profile">
            <i id="icon-size-x" className="fa fa-user-o" aria-hidden="true"></i>
          </Link>
        </li>
        <li onClick={handleClick} id="li3" className={active.li3}>
          <NavLink to="/dashboard/messages">
            <i id="icon-size-x" className="fa fa-envelope-o" aria-hidden="true"></i>
          </NavLink>
        </li>
      </ul>
      <ul className="nav-ul-2">
        {
          state && state._id?
          <Link to="login">
            <li onClick={(e)=>logout(e,setState)} id="li4" className={active.li4}>
              <i id="icon-size-x" className="fa fa-sign-out" aria-hidden="true"></i>
            </li>
          </Link>:
          <Link to="../../login">
            <li onClick={handleClick} id="li4" className={active.li4}>
              <i id="icon-size-x" className="fa fa-sign-in" aria-hidden="true"></i>
            </li>
          </Link>
        }
      </ul>
    </nav>
  )
}

export default Navbar;
