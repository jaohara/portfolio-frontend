import { FC } from 'react';
import { useHistory } from 'react-router-dom';

import Post from './Post';

import { PostProps } from '../PropInterfaces';

const PostStub: FC<PostProps> = 
({ body, categories, date, filter, isStub = true, onBack, 
  onPostSelect, postRoute, postId, setFilter, title }) => {
  const history = useHistory();

  const navigateToPost = (e: React.MouseEvent) => 
    postRoute !== undefined && history.push(postRoute);
  
  return (
    <div 
      className="post-stub entry-stub"
      onClick={(e) => navigateToPost(e)}
    >
      <Post 
        body={body}
        categories={categories}
        date={date}
        filter={filter}
        onBack={onBack}
        isStub={true}
        postId={postId}
        setFilter={setFilter}
        title={title}
      />
    </div>
  );
};

export default PostStub;