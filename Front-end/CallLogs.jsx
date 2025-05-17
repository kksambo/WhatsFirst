import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_BASE = 'http://localhost:8080/api/calls';

const CallLogs = () => {
  const [logs, setLogs] = useState([]);
  const [type, setType] = useState('');
  const [date, setDate] = useState('');
  const navigate = useNavigate();

  const fetchLogs = async () => {
    let url = `${API_BASE}/search`;
    const params = new URLSearchParams();
    if (type) params.append('type', type);
    if (date) params.append('date', date);
    if (params.toString()) url += `?${params.toString()}`;

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch call logs');
      const data = await res.json();
      setLogs(data);
    } catch (err) {
      console.error('Error fetching call logs:', err.message);
    }
  };

  useEffect(() => {
    fetchLogs(); // Load all initially
  }, []);

  return (
    <div className="container mt-4">
      <button className="btn btn-secondary mb-3" onClick={() => navigate('/dashboard')}>
        ← Back to Dashboard
      </button>

      <h2 className="mb-3">Call Logs</h2>

      <div className="row mb-4">
        <div className="col-md-3">
          <label>Filter by Call Type</label>
          <select className="form-select" value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">All</option>
            <option value="GSM">GSM</option>
            <option value="WhatsApp">WhatsApp</option>
          </select>
        </div>

        <div className="col-md-3">
          <label>Filter by Date</label>
          <input
            type="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="col-md-3 d-flex align-items-end">
          <button className="btn btn-primary" onClick={fetchLogs}>Search</button>
        </div>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Number</th>
            <th>Type</th>
            <th>Duration (sec)</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => (
            <tr key={index}>
              <td>{log.number}</td>
              <td>{log.type}</td>
              <td>{log.duration}</td>
              <td>{new Date(log.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CallLogs;



