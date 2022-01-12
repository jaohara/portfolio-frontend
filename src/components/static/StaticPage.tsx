import { FC } from 'react';

import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import atomDark from '../../style/atom-dark-revised';

import { StaticPageProps } from '../PropInterfaces';

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

const StaticPage: FC<StaticPageProps> = ({ content, pagePath, title }) => {
  return (
    <div className="page-content-wrapper">
      <div className="page-content">
        {
          //@ts-ignore
        }<ReactMarkdown components={components} rehypePlugins={[rehypeRaw]}>
          { content }
        </ReactMarkdown>
      </div>
    </div>
  )
};

export default StaticPage;