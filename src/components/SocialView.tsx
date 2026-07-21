import React from 'react';
// @ts-ignore
import { DiscussionEmbed } from 'disqus-react';

interface Article {
  url: string;
  id: string;
  title: string;
}

// Wrapper component to use the exact requested class-based Disqus code
class DisqusThread extends React.Component<{ article: Article }> {
  declare props: { article: Article };
  render() {
    return (
      <div className="bg-white rounded-2xl p-6 border border-outline-variant shadow-sm" id="disqus-container">
        <DiscussionEmbed
          shortname="explore-sg"
          config={{
            url: this.props.article.url,
            identifier: this.props.article.id,
            title: this.props.article.title,
            language: 'en_SG'
          }}
        />
      </div>
    );
  }
}

export default function SocialView() {
  const activeArticle: Article = {
    url: 'https://cdc-replica.test/social',
    id: 'cdc-social-main',
    title: 'CDC Student Drivers Community Discussion',
  };

  return (
    <div className="max-w-4xl mx-auto py-4 space-y-6" id="social-view-section">
      <div className="bg-white border border-outline-variant rounded-2xl p-6 shadow-sm space-y-2">
        <h2 className="text-xl font-display font-black text-primary leading-tight">
          CDC Driving School Portal Feedback
        </h2>
      </div>

      {/* Embedded Disqus Thread */}
      <DisqusThread article={activeArticle} />
    </div>
  );
}
