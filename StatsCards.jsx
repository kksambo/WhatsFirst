// src/components/StatsCards.jsx
import React from 'react';

const StatsCards = () => {
  const stats = {
    total: 120,
    whatsapp: 90,
    gsm: 30,
    missed: 5
  };

  return (
    <div className="row mb-4">
      {Object.entries(stats).map(([key, value], i) => (
        <div className="col-md-3" key={i}>
          <div className="card text-white bg-primary mb-3">
            <div className="card-body">
              <h5 className="card-title text-capitalize">{key} Calls</h5>
              <p className="card-text fs-4">{value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
