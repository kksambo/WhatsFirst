import React from 'react';

const ProfileForm = () => {
  return (
    <>
      <div className="card shadow mb-3">
        <div className="card-header py-3">
          <p className="text-primary m-0 fw-bold">User Settings</p>
        </div>
        <div className="card-body">
          <form>
            <div className="row">
              <div className="col">
                <div className="mb-3">
                  <label className="form-label" htmlFor="username"><strong>Username</strong></label>
                  <input className="form-control" type="text" id="username" placeholder="user.name" name="username" />
                </div>
              </div>
              <div className="col">
                <div className="mb-3">
                  <label className="form-label" htmlFor="email"><strong>Email Address</strong></label>
                  <input className="form-control" type="email" id="email" placeholder="user@example.com" name="email" />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="mb-3">
                  <label className="form-label" htmlFor="first_name"><strong>First Name</strong></label>
                  <input className="form-control" type="text" id="first_name" placeholder="John" name="first_name" />
                </div>
              </div>
              <div className="col">
                <div className="mb-3">
                  <label className="form-label" htmlFor="last_name"><strong>Last Name</strong></label>
                  <input className="form-control" type="text" id="last_name" placeholder="Doe" name="last_name" />
                </div>
              </div>
            </div>
            <div className="mb-3">
              <button className="btn btn-primary btn-sm" type="submit">Save Settings</button>
            </div>
          </form>
        </div>
      </div>
      <div className="card shadow">
        <div className="card-header py-3">
          <p className="text-primary m-0 fw-bold">Contact Settings</p>
        </div>
        <div className="card-body">
          <form>
            <div className="mb-3">
              <label className="form-label" htmlFor="address"><strong>Address</strong></label>
              <input className="form-control" type="text" id="address" placeholder="Sunset Blvd, 38" name="address" />
            </div>
            <div className="row">
              <div className="col">
                <div className="mb-3">
                  <label className="form-label" htmlFor="city"><strong>City</strong></label>
                  <input className="form-control" type="text" id="city" placeholder="Los Angeles" name="city" />
                </div>
              </div>
              <div className="col">
                <div className="mb-3">
                  <label className="form-label" htmlFor="country"><strong>Country</strong></label>
                  <input className="form-control" type="text" id="country" placeholder="USA" name="country" />
                </div>
              </div>
            </div>
            <div className="mb-3">
              <button className="btn btn-primary btn-sm" type="submit">Save&nbsp;Settings</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProfileForm;