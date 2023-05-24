import React from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'; 

const ArticleDetail = ({ article }) => {
    return (
        <div className="my-3 py-1 gap-2 sm:max-h-full min-h-fit">
            <ReactMarkdown className="md:p-0 sm:p-2"> 
                { article.content }
            </ReactMarkdown>
        </div>
    )
}

export default ArticleDetail