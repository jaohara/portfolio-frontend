const Post = ({
  author = "John",
  date = Date.now().toLocaleString(),
  title = "Post Title",
  body = "Blog post body",
}) => {
  return(
    <div className="blog-post">
      <div className="post-meta">
        <h1>{ title }</h1>
        <span className="post-meta-date">
          { date }
        </span>
        <span className="post-meta-author">
          { author } 
        </span>
      </div>

      <div className="post-body">
        { body }
      </div>
    </div>
  );
}

export default Post;