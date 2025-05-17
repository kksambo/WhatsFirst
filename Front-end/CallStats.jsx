// src/components/CallStats.jsx
import React, { useEffect, useState } from 'react';

const API_URL = 'http://localhost:8080/api/calls/stats';

const CallStats = () => {
  const [stats, setStats] = useState({
    totalCalls: 0,
    whatsappCalls: 0,
    gsmCalls: 0,
    missedCalls: 0,
  });

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error("❌ Failed to load stats:", err));
  }, []);

  return (
    <div className="row mb-4">
      <div className="col">
        <div className="card text-white bg-dark">
          <div className="card-body">
            <h5 className="card-title">📞 Total Calls</h5>
            <p className="card-text fs-4">{stats.totalCalls}</p>
          </div>
        </div>
      </div>
      <div className="col">
        <div className="card text-white bg-success">
          <div className="card-body">
            <h5 className="card-title">🟢 WhatsApp Calls</h5>
            <p className="card-text fs-4">{stats.whatsappCalls}</p>
          </div>
        </div>
      </div>
      <div className="col">
        <div className="card text-white bg-primary">
          <div className="card-body">
            <h5 className="card-title">📶 GSM Calls</h5>
            <p className="card-text fs-4">{stats.gsmCalls}</p>
          </div>
        </div>
      </div>
      <div className="col">
        <div className="card text-white bg-danger">
          <div className="card-body">
            <h5 className="card-title">❌ Missed Calls</h5>
            <p className="card-text fs-4">{stats.missedCalls}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallStats;
