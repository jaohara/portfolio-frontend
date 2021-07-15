import { useState, useEffect } from "react";
import { isTemplateSpan } from "typescript";
import Post from "./Post";

const Blog = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(res => res.json())
      .then((json) => {
        setIsLoaded(true);
        setPosts(json);
      },
      (error) => {
        setIsLoaded(true);
        setError(error);
      })       
  }, []);

  /*
    Alright, going to leave off here. There are a few things to note about what's
    going on here:

    Because I'm using TypeScript, I wasn't able to access any of the properties
    of the posts until I explicitly used any - see "(post: any)" in the map()
    call. Is this the best way to handle this? I was getting an error before that
    said something about these specific properties not existing on type
    "never", which is some strange TypeScript type that post was being 
    assigned to.

    I don't know if the loading or error parts were displaying properly.

    Should I also make have more components? Like this passes the posts state
    into a "PostList" component or something?
  */
  return (
    <div className="blog">
      <h1>Blog</h1>

      <p>
        Here are some placeholder posts from JSONPlaceholder.
      </p>

      { !isLoaded ? <div>Loading...</div> :
        posts.map((post: any) => (
          <Post author={post.userId} title={post.title} body={post.body} />
        )) 
      }
    </div>
  );
}

export default Blog;

/*
        posts.map(post => (
          <div className="post" key={ post.id }>
            <h1 className="post-title">{ post.title }</h1>
            
            <p>
              {
                `${post.body.slice(0,100)}${
                  post.body.length > 100 ? "..." : ""
                }`
              }
            </p>
          </div>
          )
*/