import { FC } from "react";

import ReactMarkdown from "react-markdown";

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import atomDark from '../../style/atom-dark-revised';

import PrettyDate from '../common/PrettyDate';
import ModelTagContainer from '../common/ModelTagContainer';

import { ProjectProps } from '../PropInterfaces';

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

const Project: FC<ProjectProps> = ({ body, date, filter, setFilter, technologies, title }) => {
  return (
    <div>
      <div className="project-content model-content">
        <h1 className="project-title model-title">{ title }</h1>

        <div className="project-meta model-meta">
          <ModelTagContainer
            filter={filter}
            model="Project"
            setFilter={setFilter}
            tags={technologies}
          />

          <PrettyDate date={date} />
        </div>

        <div className="project-body model-body">
          {
            //@ts-ignore
          }<ReactMarkdown components={components}>
            { body }
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default Project;