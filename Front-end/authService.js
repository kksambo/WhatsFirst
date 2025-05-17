const API_BASE = "http://localhost:8080/api/auth";

// ✅ Helper to safely parse JSON, handling unexpected responses
const safeJson = async (res) => {
  try {
    return await res.json();
  } catch {
    return null;
  }
};

// 🔹 REGISTER USER
export const registerUser = async (username, password, role) => {
  const formattedRole = role.toUpperCase(); // Ensure it matches Java enum

  try {
    const res = await fetch(`${API_BASE}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, role: formattedRole }),
      mode: "cors", // ✅ Ensure CORS compliance
    });

    const data = await safeJson(res);
    if (!res.ok) throw new Error(data?.error || "Registration failed");

    return { success: true };
  } catch (error) {
    console.error("Register error:", error.message);
    return { success: false, error: error.message };
  }
};

// 🔹 LOGIN USER
export const login = async (username, password) => {
  try {
    const res = await fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
      mode: "cors", // ✅ CORS enabled
    });

    const data = await safeJson(res);
    if (!res.ok || !data?.token) throw new Error(data?.error || "Login failed");

    localStorage.setItem("user", JSON.stringify({ ...data.user, token: data.token }));
    return true;
  } catch (error) {
    console.error("Login error:", error.message);
    return false;
  }
};

// 🔹 GET CURRENT USER
export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  return userStr ? JSON.parse(userStr) : null;
};

// 🔹 LOGOUT USER
export const logout = () => {
  localStorage.removeItem("user");
};

// 🔹 RESET PASSWORD
export const resetPassword = async (username) => {
  try {
    const res = await fetch(`${API_BASE}/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
      mode: "cors", // ✅ CORS enabled
    });

    const data = await safeJson(res);
    if (!res.ok) throw new Error(data?.error || "Reset failed");

    return { success: true, message: data?.message || "Password reset email sent." };
  } catch (error) {
    console.error("Reset password error:", error.message);
    return { success: false, error: error.message };
  }
};

