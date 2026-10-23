import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Calendar, ArrowRight, User } from 'lucide-react';
import { MOCK_BLOG_POSTS } from '../data/mockTours';
import { Badge, Card, Button } from '../components/common';

export const Blog = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <Badge variant="primary" size="sm">Field Dispatches</Badge>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-serif text-sand-900 dark:text-sand-50">
          The RoamVista Journal
        </h1>
        <p className="text-xs sm:text-sm text-sand-600 dark:text-sand-300">
          In-depth stories, gear philosophy, and ethical wildlife perspectives directly from our field leaders.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {MOCK_BLOG_POSTS.map((post) => (
          <Card key={post.id} padding="p-0" hoverEffect={true} className="overflow-hidden flex flex-col group">
            <div className="h-56 w-full overflow-hidden bg-sand-200">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between text-[11px] text-sand-500 mb-2">
                  <Badge variant="primary" size="sm">{post.category}</Badge>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readTime}
                  </span>
                </div>
                <h3 className="text-base font-serif font-bold text-sand-950 dark:text-sand-50 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-xs text-sand-600 dark:text-sand-400 mt-2 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-sand-200/80 dark:border-darkSurface-700/80 flex items-center justify-between text-[11px] text-sand-500">
                <span className="font-medium text-sand-800 dark:text-sand-200">{post.author}</span>
                <span>{post.date}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Blog;
