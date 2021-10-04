import React, { useState, useContext } from "react";
import "../styles/login.scss";
import logo from "../loading-buffering.gif";
import { Link, useHistory } from "react-router-dom";
import login from "../services/login";
import { toast, ToastContainer } from "react-toastify";
import { UserContext } from './../global/UserContext';
import FullScreenLoader from './../components/FullScreenLoader';

interface State {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [state, setState] = useState<State>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [err, setErr] = useState<string>("");

  const {setState: contextUpdate} = useContext(UserContext);

  const history = useHistory();

  const handleSubmit: React.FormEventHandler = async (event) => {
    event.preventDefault();
    if(!state.email || !state.password) return setErr("Empty Fields");
    setLoading(true);
    const { data, error } = await login(state);
    if(data) {
      contextUpdate(data);
      return history.push("/dashboard/profile");
    }
    if(error) setErr(`${error.response?.data || error.message}`);
    else if (error?.message) toast.error(`${error.message}`);
    setLoading(false);
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setState({...state,[event.currentTarget.name]: event.currentTarget.value})
    setErr("");
  }

  if(loading) return <FullScreenLoader />
  return (
    <div className="login-container">
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <div className="field-wrapper">
          <label htmlFor="email">
            <i id="icon-size" className="fa fa-envelope-o" aria-hidden="true"></i>
          </label>
          <div className="sub-wrapper">
            <input
              placeholder="Email or Mobile"
              id="email"
              type="email"
              name="email"
              value={state.email}
              onChange={handleChange}
            />
            <div className="bottom-border"></div>
          </div>
        </div>
        <div className="field-wrapper">
          <label htmlFor="password">
            <i id="icon-size" className="fa fa-key" aria-hidden="true"></i>
          </label>
          <div className="sub-wrapper">
            <input
              placeholder="password"
              id="password"
              type="password"
              name="password"
              value={state.password}
              onChange={handleChange}
            />
            <div className="bottom-border"></div>
          </div>
        </div>
        {err?<div className="error-wrapper">{err}</div>:null}
        <div className="button-wrapper">
          <button type="submit">
            Login
            {loading ? <img src={logo} alt="loading" /> : null}
          </button>
          <Link to="/signup">Create an Account 
            <i style={{marginLeft:5}} className="fa fa-arrow-right" aria-hidden="true"></i>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
