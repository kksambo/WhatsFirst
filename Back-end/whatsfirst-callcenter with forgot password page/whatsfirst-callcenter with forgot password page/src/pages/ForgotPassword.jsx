// src/pages/ForgotPassword.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
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
                      className="flex-grow-1 bg-password-image"
                      style={{
                        height: '582px',
                        background: 'url("/assets/img/dogs/forgotPage.jpg") center / contain no-repeat',
                      }}
                    ></div>
                  </div>
                  <div className="col-lg-6">
                    <div className="p-5">
                      <div className="text-center">
                        <h4 className="text-dark mb-4">Forgot Your Password?</h4>
                        <p className="mb-4">Enter your email to receive a reset link.</p>
                      </div>
                      <form className="user">
                        <div className="mb-3">
                          <input
                            className="form-control form-control-user"
                            type="email"
                            placeholder="Enter Email Address..."
                            name="email"
                            required
                          />
                        </div>
                        <button className="btn btn-primary d-block btn-user w-100" type="submit">
                          Send Reset Link
                        </button>
                      </form>
                      <div className="text-center mt-3">
                        <Link className="small" to="/">Back to Login</Link>
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

export default ForgotPassword;
