import React, { useState, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import logo from "../loading-buffering.gif";
import { Link } from 'react-router-dom';
import signup from './../services/signup';
import "../styles/signup.scss";

const Signup = () => {
  const [state, setState] = useState({name:"",email:"",password:"",phone:""});

  const [loading, setLoading] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const div1 = useRef<HTMLDivElement|null>(null);
  const div2 = useRef<HTMLDivElement|null>(null);

  const handleSubmit:React.FormEventHandler<HTMLFormElement> = async(event) => {
      event.preventDefault();
      const { name, email, password, phone } = state;
      if(!name || !email || !password || !confirmPassword ||!phone) return setError("One or more Fields Empty");
      if(confirmPassword !== password) return setError("Passwords do not match")
      setLoading(true);
      const {data, error} = await signup(state);
      if(data) setSuccess("You can proceed to login");
      if (error?.message) toast.error(`${error.message}`);
      if(error?.response?.data) setError(error.response.data)
      setLoading(false);
  }

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setState({...state,[event.currentTarget.name]: event.currentTarget.value});
    setError("");
  }

  return (
    <div className="login-container">
      <ToastContainer />
      <form onSubmit={handleSubmit}>
      <div ref={div2} className="field-wrapper">
          <label htmlFor="name">
            <i className="fa fa-user-o" id="icon-size" aria-hidden="true"></i>
          </label>
          <div className="sub-wrapper">
            <input
              placeholder="Name"
              id="name"
              type="name"
              name="name"
              value={state.name}
              onChange={handleChange}
            />
            <div className="bottom-border"></div>
          </div>
        </div>
        <div ref={div1} className="field-wrapper">
          <label htmlFor="email">
            <i id="icon-size" className="fa fa-envelope-o" aria-hidden="true"></i>
          </label>
          <div className="sub-wrapper">
            <input
              placeholder="Email"
              id="email"
              type="email"
              name="email"
              value={state.email}
              onChange={handleChange}
            />
            <div className="bottom-border"></div>
          </div>
        </div>
        <div ref={div2} className="field-wrapper">
          <label htmlFor="password">
            <i id="icon-size" className="fa fa-key" aria-hidden="true"></i>
          </label>
          <div className="sub-wrapper">
            <input
              placeholder="Password"
              id="password"
              type="password"
              name="password"
              value={state.password}
              onChange={handleChange}
            />
            <div className="bottom-border"></div>
          </div>
        </div>
        <div ref={div2} className="field-wrapper">
          <label htmlFor="password">
            <i id="icon-size" className="fa fa-key" aria-hidden="true"></i>
          </label>
          <div className="sub-wrapper">
            <input
              placeholder="Confirm Password"
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.currentTarget.value)}
            />
            <div className="bottom-border"></div>
          </div>
        </div>
        <div ref={div2} className="field-wrapper">
          <label htmlFor="phone">
            <i id="icon-size" className="fa fa-phone" aria-hidden="true"></i>
          </label>
          <div className="sub-wrapper">
            <input
              placeholder="Phone"
              id="phone"
              type="phone"
              name="phone"
              value={state.phone}
              onChange={handleChange}
            />
            <div className="bottom-border"></div>
          </div>
        </div>
        {error?<div className="error-wrapper">{error}</div>:null}
        {success?<div className="success-wrapper">{success}</div>:null}
        <div className="button-wrapper">
          <button type="submit">
            SignUp
            {loading ? <img src={logo} alt="loading" /> : null}
            {}
          </button>
          <Link to="/login">Login
            <i style={{marginLeft:5}} className="fa fa-arrow-right" aria-hidden="true"></i>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
