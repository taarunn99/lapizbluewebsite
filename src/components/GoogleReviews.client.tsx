// src/components/GoogleReviews.client.tsx
'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

interface Review {
  author_name: string;
  rating: number;
  text: string;
  time: number;
  profile_photo_url: string;
  relative_time_description: string;
}

interface ReviewsData {
  reviews: Review[];
  rating: number;
  totalReviews: number;
}

export default function GoogleReviews() {
  const [reviewsData, setReviewsData] = useState<ReviewsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch('/api/reviews');
        const data = await res.json();

        if (res.ok) {
          setReviewsData(data);
          setError(null);
        } else {
          setError(data.message || 'Failed to fetch reviews');
        }
      } catch (err) {
        setError('Failed to connect to reviews service');
        console.error('Failed to fetch reviews:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();

    // Auto-refresh every 5 minutes for "live replay"
    const interval = setInterval(fetchReviews, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <section ref={sectionRef} className="relative w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="relative w-16 h-16">
              <div className="absolute top-0 left-0 w-full h-full border-4 border-[#23395B]/20 rounded-full"></div>
              <div className="absolute top-0 left-0 w-full h-full border-4 border-[#23395B] border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !reviewsData) {
    return (
      <section ref={sectionRef} className="relative w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-[#23395B]/60 text-lg">
            {error || 'Unable to load reviews at this time.'}
          </p>
        </div>
      </section>
    );
  }

  const { reviews, rating, totalReviews } = reviewsData;

  return (
    <section ref={sectionRef} className="relative w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-[#F8FAFC] to-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#23395B] font-outfit mb-4">
            What Our Clients Say
          </h2>
          <p className="text-base sm:text-lg text-[#23395B]/70 font-outfit max-w-2xl mx-auto">
            Real experiences from our valued customers in Dubai
          </p>

          {/* Rating Summary */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center justify-center gap-3 mt-6"
          >
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-6 h-6 ${
                    i < Math.floor(rating)
                      ? 'fill-[#FDB022] text-[#FDB022]'
                      : 'text-slate-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-2xl font-semibold text-[#23395B] font-outfit">
              {rating.toFixed(1)}
            </span>
            <span className="text-[#23395B]/60 text-sm">
              ({totalReviews} reviews)
            </span>
          </motion.div>
        </motion.div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {reviews.slice(0, 6).map((review, index) => (
            <motion.div
              key={`${review.author_name}-${review.time}`}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{
                duration: 0.5,
                delay: 0.1 * index,
                ease: [0.25, 0.4, 0.25, 1]
              }}
              className="group relative bg-white rounded-2xl p-6 lg:p-7 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-[#23395B]/20"
            >
              {/* Quote Icon */}
              <div className="absolute top-5 right-5 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote className="w-12 h-12 text-[#23395B]" />
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3 mb-4 relative z-10">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-slate-100 flex-shrink-0">
                  <img
                    src={review.profile_photo_url}
                    alt={review.author_name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      if (target.parentElement) {
                        target.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-[#23395B] text-white font-semibold text-lg">${review.author_name.charAt(0)}</div>`;
                      }
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-[#23395B] font-outfit text-base truncate">
                    {review.author_name}
                  </h3>
                  <p className="text-sm text-[#23395B]/60 font-outfit">
                    {review.relative_time_description}
                  </p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < review.rating
                        ? 'fill-[#FDB022] text-[#FDB022]'
                        : 'text-slate-300'
                    }`}
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-[#23395B]/80 text-sm sm:text-base leading-relaxed font-outfit line-clamp-5">
                {review.text}
              </p>

              {/* Google Badge */}
              <div className="mt-4 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2 text-xs text-[#23395B]/40">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <span>Google Review</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View More Link */}
        {totalReviews > 6 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-center mt-10"
          >
            <a
              href={`https://search.google.com/local/reviews?placeid=${process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID || ''}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#23395B] text-white rounded-lg font-outfit font-medium hover:bg-[#23395B]/90 transition-colors duration-300"
            >
              View All {totalReviews} Reviews
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
}
