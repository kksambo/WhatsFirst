import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="bg-gradient-primary" style={{ minHeight: '100vh' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-9 col-lg-12 col-xl-10">
            <div className="card shadow-lg o-hidden border-0 my-5">
              <div className="card-body p-0">
                <div className="row">
                  <div className="col-lg-6 d-none d-lg-flex">
                    <div 
                      className="flex-grow-1 bg-login-image" 
                      style={{ 
                        height: '582px',
                        background: 'url("/assets/img/forgotPage.jpg") center / contain no-repeat' 
                      }}
                    ></div>
                  </div>
                  <div className="col-lg-6">
                    <div className="p-5">
                      <div className="text-center">
                        <h4 className="text-dark mb-4">Welcome Back Agent!</h4>
                      </div>
                      <form className="user">
                        <div className="mb-3">
                          <input 
                            className="form-control form-control-user" 
                            type="email" 
                            id="exampleInputEmail" 
                            aria-describedby="emailHelp" 
                            placeholder="Enter Email Address..." 
                            name="email" 
                          />
                        </div>
                        <div className="mb-3">
                          <input 
                            className="form-control form-control-user" 
                            type="password" 
                            id="exampleInputPassword" 
                            placeholder="Password" 
                            name="password" 
                          />
                        </div>
                        <div className="mb-3">
                          <div className="custom-checkbox small">
                            <div className="form-check">
                              <input className="form-check-input" type="checkbox" id="formCheck-1" />
                              <label className="form-check-label" htmlFor="formCheck-1">Remember Me</label>
                            </div>
                          </div>
                        </div>
                        <Link to="/dashboard" className="btn btn-primary d-block btn-user w-100">
                          Login
                        </Link>
                        <hr />
                      </form>
                      <div className="text-center">
                        <Link className="small" to="/forgot-password">Forgot Password?</Link>

                      </div>
                      <div className="text-center">
                        <Link className="small" to="/register">Create an Account!</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;