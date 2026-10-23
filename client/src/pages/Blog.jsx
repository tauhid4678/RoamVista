import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Calendar, ArrowRight, User, BookOpen, Sparkles, Share2, Compass } from 'lucide-react';
import { MOCK_BLOG_POSTS } from '../data/mockTours';
import { Badge, Card, Button, Modal } from '../components/common';

export const Blog = () => {
  const [selectedPost, setSelectedPost] = useState(null);

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
          <div
            key={post.id}
            onClick={() => setSelectedPost(post)}
            className="cursor-pointer"
          >
            <Card padding="p-0" hoverEffect={true} className="overflow-hidden flex flex-col group h-full">
              <div className="h-56 w-full overflow-hidden bg-sand-200 relative">
                <img
                  src={post.image}
                  alt={post.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-primary-950/80 backdrop-blur-md text-sand-50 px-2.5 py-1 rounded-full text-[10px] font-semibold flex items-center gap-1">
                  <BookOpen className="w-3 h-3 text-accent-400" />
                  <span>Read Article</span>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-sand-500 mb-2">
                    <Badge variant="primary" size="sm">{post.category}</Badge>
                    <span className="flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-base font-serif font-bold text-sand-950 dark:text-sand-50 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-sand-600 dark:text-sand-400 mt-2 line-clamp-3 leading-relaxed font-light">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-sand-200/80 dark:border-darkSurface-700/80 flex items-center justify-between text-[11px] text-sand-500">
                  <span className="font-semibold text-sand-800 dark:text-sand-200">{post.author}</span>
                  <span>{post.date}</span>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* Full Article Reading Modal */}
      {selectedPost && (
        <Modal
          isOpen={!!selectedPost}
          onClose={() => setSelectedPost(null)}
          title={selectedPost.title}
          description={`${selectedPost.category} · ${selectedPost.readTime} · By ${selectedPost.author}`}
          size="lg"
        >
          <div className="space-y-6 text-sand-900 dark:text-sand-100 max-h-[75vh] overflow-y-auto pr-1">
            {/* Cover Image */}
            <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden bg-sand-200 shadow-md">
              <img
                src={selectedPost.image}
                alt={selectedPost.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-sand-50 text-xs">
                <span className="font-semibold text-accent-300">{selectedPost.author}</span>
                <span>{selectedPost.date}</span>
              </div>
            </div>

            {/* Article Content */}
            <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-sand-700 dark:text-sand-300 font-light">
              {selectedPost.content ? (
                selectedPost.content.map((paragraph, idx) => (
                  <p key={idx} className="first:text-sm sm:first:text-base first:font-normal first:text-sand-900 dark:first:text-sand-100">
                    {paragraph}
                  </p>
                ))
              ) : (
                <p>{selectedPost.excerpt}</p>
              )}
            </div>

            {/* Field Pro Tip Box */}
            {selectedPost.proTip && (
              <div className="p-4 sm:p-5 rounded-2xl bg-sand-100/80 dark:bg-darkSurface-900 border border-accent-400/40 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent-700 dark:text-accent-400">
                  <Sparkles className="w-4 h-4 text-accent-500" />
                  <span>Field Leader Dispatch Note</span>
                </div>
                <p className="text-xs text-sand-700 dark:text-sand-300 italic leading-relaxed font-serif">
                  "{selectedPost.proTip}"
                </p>
              </div>
            )}

            {/* Modal Actions */}
            <div className="pt-4 border-t border-sand-200/80 dark:border-darkSurface-700/80 flex flex-wrap items-center justify-between gap-3">
              <Link to="/explore" onClick={() => setSelectedPost(null)}>
                <Button variant="primary" size="sm" icon={<Compass className="w-4 h-4" />}>
                  Explore Expeditions
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={() => setSelectedPost(null)}>
                Close Dispatch
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Blog;

