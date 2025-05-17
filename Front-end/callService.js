const API_BASE = 'http://localhost:8080/api/calls';

export const saveCallLog = async (log) => {
  const res = await fetch(`${API_BASE}/log`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(log),
  });

  if (!res.ok) {
    throw new Error("Failed to save call log");
  }

  return res.json();
};
 

export const getCallLogs = async () => {
  const res = await fetch(`${API_BASE}/all`);
  if (!res.ok) {
    throw new Error("Failed to fetch call logs");
  }
  return res.json();
};


