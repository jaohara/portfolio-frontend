import { FC } from 'react';

import ReactMarkdown from 'react-markdown';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import atomDark from 'react-syntax-highlighter/dist/esm/styles/prism/atom-dark';
import atomDark from '../../style/atom-dark-revised';

import PrettyDate from '../common/PrettyDate';
import ModelTagContainer from '../common/ModelTagContainer';

import { PostProps } from '../PropInterfaces';

// Right now this is lifted from the react-markdown README on github.
// I'm going to work with this until I understand enough to make my own version.

/*
  I don't really know how typescript works with this, either. 
*/
const components = {
  // @ts-ignore
  code({node, inline, className, children, ...props}) {
    const match = /language-(\w+)/.exec(className || '');

    return !inline && match ? (
      <SyntaxHighlighter style={atomDark} language={match[1]} PreTag="div" 
        children={String(children).replace(/\n$/, '')} {...props} />
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    )
  }
};

const Post: FC<PostProps> = ({ body, categories, date, filter, isStub = false, setFilter, title }) => {
  return (
    <div className={`${ !isStub ? "selected-post" : ""}`}>
      <div className="post-content model-content">
        <h1 className="post-title model-title">{ title }</h1>
        
        <div className="post-meta model-meta">
          <ModelTagContainer
            filter={filter}
            model="Post"
            setFilter={setFilter}
            tags={categories}
          />

          <PrettyDate date={date} />
        </div>

        {!isStub && (
        <div className="post-body model-body">
          {
            // @ts-ignore
          }<ReactMarkdown components={components}>
            { body }
          </ReactMarkdown>
        </div>
        )}

      </div>
    </div>
  );
}

export default Post;