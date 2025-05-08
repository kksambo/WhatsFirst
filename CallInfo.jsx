// src/components/CallInfo.jsx
import React, { useEffect, useRef, useState } from 'react';
import { saveCallLog } from '../services/callService';


const CallInfo = () => {
  const [number, setNumber] = useState('');
  const [status, setStatus] = useState('');
  const [callType, setCallType] = useState('');
  const [checked, setChecked] = useState(false);
  const [callActive, setCallActive] = useState(false);
  const [onHold, setOnHold] = useState(false);
  const [duration, setDuration] = useState(0); // duration in seconds
  const intervalRef = useRef(null); // store timer reference

  // Format seconds into HH:MM:SS
  const formatTime = (secs) => {
    const h = String(Math.floor(secs / 3600)).padStart(2, '0');
    const m = String(Math.floor((secs % 3600) / 60)).padStart(2, '0');
    const s = String(secs % 60).padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  // Start call
  const handleStartCall = () => {
    setCallActive(true);
    setOnHold(false);
    setStatus('In Call...');
    setDuration(0);

    // Start the timer
    intervalRef.current = setInterval(() => {
      setDuration((prev) => prev + 1);
    }, 1000);
  };

  // End call
 const handleEndCall = async () => {
  setStatus('Call Ended');
  setCallActive(false);
  setOnHold(false);

  const callLog = {
    number,
    type: callType,
    duration: duration, // duration state must be tracked
    timestamp: new Date().toISOString()
  };

  console.log("📤 Sending log to backend:", callLog); // ✅ Now callLog is defined

  try {
    await saveCallLog(callLog);
    console.log("✅ Call log saved.");
  } catch (err) {
    console.error("❌ Error saving call log:", err.message);
    alert("⚠️ Error connecting to backend.");
  }
};

  

  // Hold/Resume call
  const handleHold = () => {
    if (onHold) {
      // Resume
      intervalRef.current = setInterval(() => {
        setDuration((prev) => prev + 1);
      }, 1000);
      setStatus('Resumed Call');
    } else {
      // Pause
      clearInterval(intervalRef.current);
      setStatus('Call on Hold');
    }
    setOnHold(!onHold);
  };

  const handleCheck = () => {
    setStatus('Checking...');
    setChecked(false);
    setTimeout(() => {
      const isWhatsApp = number.endsWith('8'); // Simulated logic
      setCallType(isWhatsApp ? 'WhatsApp' : 'GSM');
      setStatus(isWhatsApp ? 'Available on WhatsApp' : 'Not on WhatsApp');
      setChecked(true);
    }, 2000);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div className="card border-secondary">
      <div className="card-header">Call Setup & Controls</div>
      <div className="card-body">
        {/* Input */}
        <div className="mb-3">
          <label className="form-label">Enter Number to Call</label>
          <input
            type="tel"
            className="form-control"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            placeholder="+27712345678"
          />
        </div>

        {/* WhatsApp Check */}
        <button className="btn btn-info mb-3" onClick={handleCheck} disabled={!number || callActive}>
          Check WhatsApp Availability
        </button>

        {/* Call Status */}
        {status && (
          <div className="mb-3">
            <p><strong>Status:</strong> {status}</p>
            {checked && (
              <p>
                <strong>Preferred Route:</strong>
                <span className={`badge bg-${callType === 'WhatsApp' ? 'success' : 'primary'} ms-2`}>
                  {callType}
                </span>
              </p>
            )}
          </div>
        )}

        {/* Live Duration Display */}
        {callActive && (
          <p className="text-center fw-bold">
            ⏱ Duration: {formatTime(duration)}
          </p>
        )}

        {/* Call Controls */}
        <div className="d-flex gap-3 justify-content-center mt-4">
          <button
            className="btn btn-success rounded-circle d-flex align-items-center justify-content-center"
            style={{ width: '60px', height: '60px' }}
            onClick={handleStartCall}
            disabled={!checked || callActive}
          >
            <i className="bi bi-telephone-fill fs-4 text-white"></i>
          </button>

          <button
            className="btn btn-warning"
            onClick={handleHold}
            disabled={!callActive}
          >
            {onHold ? 'Resume' : 'Hold'}
          </button>

          <button
            className="btn btn-danger rounded-circle d-flex align-items-center justify-content-center"
            style={{ width: '60px', height: '60px' }}
            onClick={handleEndCall}
            disabled={!callActive}
          >
            <i className="bi bi-telephone-x-fill fs-4 text-white"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CallInfo;


