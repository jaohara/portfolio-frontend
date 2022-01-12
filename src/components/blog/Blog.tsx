import { FC, useEffect, useState } from "react";
import { Route, useLocation } from 'react-router-dom';
import { CSSTransition } from "react-transition-group";

import NoMatchesMessage from "../common/NoMatchesMessage";
import Post from "./Post";
import PostStub from "./PostStub";

import { PageProps } from '../PropInterfaces';
import { notNullOrUndefined } from "../common/Helpers";

import routes from "../common/Routes";


const Blog: FC<PageProps> = 
({ filter, pagePath, posts, postCategories, postCategoriesLoaded, 
  postsLoaded, setFilter, setInModelView }) => {
  const [ currentPost, setCurrentPost ] = useState<number | null>(null);

  const viewingModel = !routes.map(r => r.path).includes(useLocation().pathname);

  const propsLoaded = postsLoaded && postCategoriesLoaded;

  const noPosts = posts === undefined || posts.length === 0;

  useEffect(() => { setInModelView !== undefined && setInModelView(viewingModel) });

  const handlePostSelection = (post_id: number) => 
    currentPost !== post_id && setCurrentPost(post_id);

  // const handleBackPress = () => setCurrentPost(null);

  const getPostCategories = (id: any) => {
    let categoryArray: any[] | undefined;
    
    if (postCategoriesLoaded && notNullOrUndefined(postCategories) && parseInt(id))  
      categoryArray = postCategories?.filter(category => category.id === parseInt(id));

    return categoryArray === undefined ? [] : categoryArray;
  }

  return (
    noPosts ? 
    (<NoMatchesMessage modelName="project" />) :
    <div className="blog-page page-content-wrapper">
      { 
        propsLoaded &&
        (
          <Route 
            key={`post-stubs`}
            exact 
            path={pagePath}
            children={({ match }) => (
              <CSSTransition 
                classNames="model"
                key={`post-stubs`}
                timeout={1000}
                in={ match !== null }
                unmountOnExit
              >
                <div className="post-stubs-wrapper">
                  { posts!.map((post: any) => (
                  <PostStub
                    body={post.body}
                    categories={getPostCategories(post.id)}
                    date={post.published}
                    filter={filter}
                    key={`post-${post.id}`}
                    // onBack={handleBackPress}
                    onPostSelect={handlePostSelection}
                    postId={post.id} 
                    postRoute={`${pagePath}/${post.slug}`}
                    setFilter={setFilter}
                    title={post.title} />
                  ))}
                </div>
              </CSSTransition>
            )}
          />)
      }

      {
        propsLoaded &&
        posts!.map((post: any) => (
          <Route 
            key={`post-route-${post.id}`} 
            exact={true}
            path={`${pagePath}/${post.slug}`}
            children={({ match }) => (
              <CSSTransition 
                classNames="post"
                key={`post-${post.id}`}
                timeout={1000}
                in={match !== null}
                onEntering={ () => window.scroll(0,0) }
                unmountOnExit
              >
                <Post
                  body={post.body}
                  categories={getPostCategories(post.id)}
                  date={post.published}
                  filter={filter}
                  key={post.id}
                  postId={post.id}
                  postRoute={`${pagePath}/${post.slug}`}
                  setFilter={setFilter}
                  title={post.title} 
                />
              </CSSTransition>
          )}/>
        ))
      }
    </div>
  );
}

export default Blog;
