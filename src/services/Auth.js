import Client from "./Api";

export const RegisterUser = async (data) => {
  try {
    const res = await Client.post("/auth/register", data);
    return res.data; // <-- return API response (e.g., { message: "User created successfully" })
  } catch (error) {
    console.error("RegisterUser error:", error);
    // Extract error message from response if exists
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
};



export const SignInUser = async (data, setAppUser) => {
  const formData = new URLSearchParams();
  formData.append("username", data.username);
  formData.append("password", data.password);

  const res = await Client.post("/auth/login", formData, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" }
  });

  localStorage.setItem("token", res.data.access_token);

  // Get current user info
  const user = await CheckSession();
  
  // Store in localStorage
  StoreUserSession(user);

  // Update app state immediately
  if (setAppUser) setAppUser(user);

  return user;
};




export const UpdateUserAuth = async (data) => {
  try {
    // Make sure this endpoint matches your FastAPI route for updating user info
    const res = await Client.patch("/auth/user/update", data);
    return res.data;
  } catch (error) {
    console.error("UpdateUserAuth error:", error);
    throw error;
  }
};



export const CheckSession = async () => {
  try {
    const res = await Client.get("/auth/session");
    return res.data.user; // gets the logged-in user
  } catch (error) {
    console.error("CheckSession error:", error);
    throw error;
  }
};



export const StoreUserSession = (userData) => {
  localStorage.setItem("user", JSON.stringify(userData));
};

export const ClearUserSession = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const GetCurrentUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const GetAuthToken = () => {
  return localStorage.getItem("token");
};

export const AuthHeader = () => {
  const token = GetAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};