import { FC, useEffect, useState } from "react";
import { Link, Route, Switch, useParams } from "react-router-dom";

import JsxParser from "react-jsx-parser";

import { AdminFormRouteParams, ModelAdminProps } from "../PropInterfaces";
import { Post } from "../Types";

import { fetchData, highlightSearchTerms, notNullOrUndefined, unbindFormSubmissionHotkey } 
  from "../common/Helpers";

import AdminControls from "./common/AdminControls";
import AdminDataLength from "./common/AdminDataLength";
import AdminTableDeleteCell from "./common/AdminTableDeleteCell";
import AdminTableTooltipCell from "./common/AdminTableTooltipCell";
import AdminTableVisibleCell from "./common/AdminTableVisibleCell";
import AdminLoading from "./common/AdminLoading";

import PostForm from "./PostForm";

const PostAdmin: FC<ModelAdminProps> = ({ borderChangeCallback }) => {
  // const [ error, setError ]         = useState(null);
  const [ , setError ]              = useState(null);
  const [ filter, setFilter ]       = useState("");
  const [ isLoaded, setIsLoaded ]   = useState(false);
  const [ posts, setPosts ]         = useState([]);

  let { editId } = useParams<AdminFormRouteParams>();

  useEffect(() => {
    unbindFormSubmissionHotkey();
    borderChangeCallback !== undefined && borderChangeCallback("post");
    fetchPosts();
  }, []);

  const fetchPosts = () => fetchData("/posts/all", setIsLoaded, setPosts, setError);

  const createEmptyPost = () => ({
    body: "",
    hidden: true,
    title: "",
  } as Post);

  /* 
    again, a lot of code reuse. Is this as generic as I can make these? There's 
    a lot of hard-coded values based on model. Am I able to make these more 
    reusable in spite of that? 
  */ 
  const getPostIfExists = () => {
    let result = createEmptyPost();

    if (notNullOrUndefined(posts)) {
      let filterResult = posts.filter((post: Post) => post.id === editId);

      result = filterResult.length > 0 ? filterResult[0] : result;
    }

    return result;
  };

  return (
    <div className="admin-panel-posts">
      {
        !isLoaded ? <AdminLoading destination="post"/> : (
          <Switch>
            <Route path="/admin/posts/create">
              <PostForm 
                backCallback={fetchPosts}
                initialData={createEmptyPost() as Post}
              />
            </Route>

            <Route path="/admin/posts/edit/:editId">
              <PostForm
                backCallback={fetchPosts}
                initialData={getPostIfExists() as Post}
              />
            </Route>

            <Route exact={true} path="/admin/posts">
              <AdminControls 
                filterOnChange={setFilter}
                filterValue={filter}
                modelName="Post"
              />

              {
                posts.length > 0 ? (
                <div className="admin-table-wrapper">
                  <AdminDataLength
                    dataLength={posts.length}
                    modelName="Post"
                  />

                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>
                          ID
                        </th>
                        <th>
                          Title
                        </th>
                        <AdminTableTooltipCell 
                          cellContent="Visible?"
                          tooltipText="Whether or not the Post is visible in the Blog index."
                        />
                        <AdminTableTooltipCell 
                          cellContent="Delete?"
                          tooltipText="Permanently deletes the given Post."
                        />
                      </tr>
                    </thead>

                    <tbody>
                      {
                        posts.map((post: any) => (
                          (filter.length === 0 ||
                            post.title.toLowerCase().match(filter.toLowerCase()) !== null) && (
                          <tr key={post.id}>
                            <td>
                              {post.id}
                            </td>
                            <td>
                              <Link
                                className="admin-table-edit-link"
                                to={`/admin/posts/edit/${post.id}`}
                              >
                              {
                                filter.length === 0 ? post.title : 
                                (
                                  <JsxParser
                                    jsx={highlightSearchTerms(post.title, filter)}
                                  />
                                )
                              }
                              </Link>
                            </td>

                            <AdminTableVisibleCell
                              initialVisibility={!post.hidden}
                              invertedModel={true}
                              primaryKey={post.id}
                              toggleKey="hidden"
                              toggleRoute="/posts/update"
                            />

                            <AdminTableDeleteCell
                              deletionKey="id"
                              deletionRoute="/posts/delete"
                              deletionValue={post.id}
                              successCallback={fetchPosts}
                            />
                          </tr>
                        )))
                      }
                    </tbody>
                  </table> 
                </div>) : (
                <p>
                  There are no Posts saved.
                </p>)
              }
            </Route>
          </Switch>
        )
      }
      
    </div>
  );
};

export default PostAdmin;