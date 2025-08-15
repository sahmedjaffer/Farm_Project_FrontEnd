import Client from "./Api";

export const ProfileData = async () => {
  try {
    const res = await Client.get(`/auth/user/profile`);
    return res.data;
  } catch (error) {
    console.error("Error in ProfileGetter:", error);
    throw error;
  }
};