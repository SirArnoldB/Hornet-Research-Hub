import supabase from "../../services/supabase/supabaseClient";

const fetchComments = async (postId) => {
  try {
    const { data: comments, error } = await supabase.rpc("get_comments", {
      post_id: postId,
    });

    if (error) {
      throw error;
    }

    return comments;
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
};

export { fetchComments };
