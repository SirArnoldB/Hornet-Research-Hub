import supabase from "../../services/supabase/supabaseClient";

const getPostById = async (postId) => {
  try {
    const { data: post, error } = await supabase.rpc("get_post_by_id", {
      post_id: postId,
    });

    if (error) {
      throw error;
    }

    console.log(post[0]);
    return post[0]; // return the first (and only) result
  } catch (error) {
    console.error(`Error fetching post ${postId}:`, error);
    return null;
  }
};

export { getPostById };
