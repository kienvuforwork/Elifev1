export async function getPostWithCeleb() {
    try {
      const res = await fetch("http://localhost:8080/post/celeb");
      const posts = await res.json();
  
      // Log the fetched data to verify it
      console.log("Fetched posts:", posts);
  
      return {
        props: { posts },
      };
    } catch (error) {
      console.error("Error fetching data:", error);
      return {
        props: { posts: [] }, // Return an empty array or handle the error as needed
      };
    }
  }