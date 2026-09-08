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
    <div className="flex flex-col h-full w-full">
      <h3 className="font-serif text-[11px] font-bold uppercase tracking-widest text-silk mb-2 text-center">Customer Reviews</h3>

      <div className="grid grid-cols-1 gap-3">
        {/* Write a Review Form */}
        <div className="bg-noir-950 p-2 sm:p-3 border border-gold/10 shadow-md">
          <h4 className="font-serif text-[10px] text-gold mb-2 text-center">Write a Review</h4>
          <form onSubmit={handleReviewSubmit} className="space-y-3">
            <div className="space-y-1 flex flex-col items-center">
              <label className="text-xs uppercase tracking-widest text-silk/60">Rating</label>
              {renderStars(newReview.rating, true)}
            </div>

            <div className="space-y-1">
              <input
                type="text"
                required
                value={newReview.name}
                onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                className="w-full bg-noir-900 border border-gold/20 text-silk p-1.5 text-[10px] focus:outline-none focus:border-gold/60 transition-colors"
                placeholder="Enter your name"
              />
            </div>

            <div className="space-y-1">
              <textarea
                required
                value={newReview.text}
                onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                className="w-full bg-noir-900 border border-gold/20 text-silk p-1.5 text-[10px] h-12 resize-none focus:outline-none focus:border-gold/60 transition-colors"
                placeholder="Review"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-gold-gradient text-noir font-bold uppercase tracking-widest text-[9px] hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all"
            >
              Post Review
            </button>
          </form>
        </div>

        {/* Display Reviews */}
        <div className="space-y-2 max-h-[150px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gold/20">
          {reviews.length === 0 ? (
            <p className="text-silk/60 italic font-serif text-[10px] text-center">No reviews yet.</p>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="bg-noir-950 p-2 border border-gold/10 text-left">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h5 className="font-semibold text-[10px] text-silk leading-none">{review.name}</h5>
                    <span className="text-[8px] text-silk/40">{review.date}</span>
                  </div>
                  <div className="scale-75 origin-top-right">
                    {renderStars(review.rating)}
                  </div>
                </div>
                <p className="text-silk/70 text-[9px] leading-relaxed line-clamp-2">{review.text}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
