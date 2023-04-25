import supabase from "../../services/supabase/supabaseClient";

const fetchPosts = async () => {
  try {
    const { data: posts, error } = await supabase.rpc("get_posts");

    if (error) {
      throw error;
    }

    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};

export { fetchPosts };
