import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const ProductReviews = ({ productId }) => {
  const { getReviews, addReview } = useCart();
  const reviews = getReviews(productId);
  const [newReview, setNewReview] = useState({ name: '', text: '', rating: 5 });

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newReview.name.trim() || !newReview.text.trim()) return;

    addReview(productId, newReview);

    // Reset form
    setNewReview({ name: '', text: '', rating: 5 });
  };


  const renderStars = (rating, interactive = false) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => interactive && setNewReview({ ...newReview, rating: star })}
            disabled={!interactive}
            className={`${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : ''}`}
          >
            <Star
              className={`w-5 h-5 ${
                star <= rating ? 'fill-gold text-gold' : 'text-gold/20'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="mt-8 pt-6 border-t border-gold/10">
      <h3 className="font-serif text-2xl text-silk mb-4">Customer Reviews</h3>

      <div className="grid grid-cols-1 gap-6">
        {/* Write a Review Form */}
        <div className="bg-noir-950 p-4 sm:p-5 border border-gold/10 shadow-lg">
          <h4 className="font-serif text-lg text-gold mb-4">Write a Review</h4>
          <form onSubmit={handleReviewSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-silk/60">Rating</label>
              {renderStars(newReview.rating, true)}
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-silk/60">Your Name</label>
              <input
                type="text"
                required
                value={newReview.name}
                onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                className="w-full bg-noir-900 border border-gold/20 text-silk p-3 focus:outline-none focus:border-gold/60 transition-colors"
                placeholder="Enter your name"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-silk/60">Your Review</label>
              <textarea
                required
                value={newReview.text}
                onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                className="w-full bg-noir-900 border border-gold/20 text-silk p-3 h-20 resize-none focus:outline-none focus:border-gold/60 transition-colors"
                placeholder="What did you like or dislike?"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gold-gradient text-noir font-bold uppercase tracking-widest text-sm hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all"
            >
              Post Review
            </button>
          </form>
        </div>

        {/* Display Reviews */}
        <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gold/20">
          {reviews.length === 0 ? (
            <p className="text-silk/60 italic font-serif">No reviews yet. Be the first to review!</p>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="bg-noir-950 p-4 border border-gold/10">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h5 className="font-semibold text-silk">{review.name}</h5>
                    <span className="text-xs text-silk/40">{review.date}</span>
                  </div>
                  {renderStars(review.rating)}
                </div>
                <p className="text-silk/70 text-sm leading-relaxed">{review.text}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
