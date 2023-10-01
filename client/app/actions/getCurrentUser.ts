
import { cookies } from 'next/headers'
export const getCurrentUser = async () => {

    const token =cookies().get("token")?.value

    try {
      const response = await fetch("http://localhost:8080/user", {
        method: "GET",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
  
      });
        const user = await response.json(); // Parse the JSON response
        return user.data.user
    } catch (error) {
      console.error("An error occurred:", error);
    }
  ;
};
    

