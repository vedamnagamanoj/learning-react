import { createContext, useContext, useState } from "react";
import { createRandomPost } from "./RandomPost";

// 1. Create a new Context
const PostContext = createContext();

function PostProvider({ children }) {
  const [posts, setPosts] = useState(() =>
    Array.from({ length: 4 }, () => createRandomPost())
  );
  const [searchQuery, setSearchQuery] = useState("");

  // Derived state. These are the posts that will actually be displayed
  const searchedPosts =
    searchQuery.length > 0
      ? posts.filter((post) =>
          `${post.title} ${post.body}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : posts;

  function handleAddPost(post) {
    setPosts((posts) => [post, ...posts]);
  }

  function handleClearPosts() {
    setPosts([]);
  }

  return (
    <PostContext.Provider
      value={{
        posts: searchedPosts,
        onAddPost: handleAddPost,
        onClearPosts: handleClearPosts,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}
function usePosts() {
  const context = useContext(PostContext);
  if (context === undefined)
    throw new Error("Cannot use PostContext outside PostProvider.");
  return context;
}
export { PostProvider, usePosts };
