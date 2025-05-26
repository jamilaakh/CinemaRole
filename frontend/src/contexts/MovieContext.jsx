import { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

// Removed TypeScript interface and types
const MovieContext = createContext(undefined);

export const useMovies = () => {
  const context = useContext(MovieContext);
  if (context === undefined) {
    throw new Error('useMovies must be used within a MovieProvider');
  }
  return context;
};

export const MovieProvider = ({ children }) => {
  // Initialize with empty arrays or load from localStorage if you want persistence
  const [movies, setMovies] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [genres] = useState([]);
  const { currentUser } = useAuth();

  // Example: Load movies, reviews, genres from localStorage on mount (optional)
  useEffect(() => {
    const storedMovies = JSON.parse(localStorage.getItem('movies') || '[]');
    const storedReviews = JSON.parse(localStorage.getItem('reviews') || '[]');
    const storedGenres = JSON.parse(localStorage.getItem('genres') || '[]');
    setMovies(storedMovies);
    setReviews(storedReviews);
    // If you want to allow genres to be dynamic, use setGenres(storedGenres);
    // Otherwise, keep genres as an empty array or hardcode them here
  }, []);

  // Select featured movies (high ratings)
  const featuredMovies = movies
    .filter(movie => movie.rating >= 4.0)
    .sort(() => Math.random() - 0.5)
    .slice(0, 5);

  // Select popular movies (most reviews)
  const popularMovies = [...movies]
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 10);

  // Select new releases (by release year, descending)
  const newReleases = [...movies]
    .sort((a, b) => b.releaseYear - a.releaseYear)
    .slice(0, 10);

  useEffect(() => {
    // Load favorites from localStorage
    const loadFavorites = () => {
      if (currentUser) {
        const savedFavorites = localStorage.getItem(`favorites_${currentUser.id}`);
        if (savedFavorites) {
          setFavorites(JSON.parse(savedFavorites));
        }
      } else {
        setFavorites([]);
      }
    };

    loadFavorites();
  }, [currentUser]);

  const getMovieById = (id) => {
    return movies.find(movie => movie.id === id);
  };

  const getReviewsByMovieId = (movieId) => {
    return reviews.filter(review => review.movieId === movieId);
  };

  const getUserReviewForMovie = (movieId) => {
    if (!currentUser) return undefined;
    return reviews.find(
      review => review.movieId === movieId && review.userId === currentUser.id
    );
  };

  const addReview = async (movieId, rating, content) => {
    if (!currentUser) return false;

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newReview = {
        id: reviews.length + 1,
        userId: currentUser.id,
        userName: currentUser.name,
        userAvatar: currentUser.avatar,
        movieId,
        rating,
        content,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      setReviews([...reviews, newReview]);
      
      // Update movie rating average and count
      const movieReviews = [...getReviewsByMovieId(movieId), newReview];
      const averageRating = movieReviews.reduce((sum, r) => sum + r.rating, 0) / movieReviews.length;
      
      setMovies(movies.map(movie => 
        movie.id === movieId 
          ? { 
              ...movie, 
              rating: Number(averageRating.toFixed(1)), 
              reviewCount: movie.reviewCount + 1 
            } 
          : movie
      ));
      
      return true;
    } catch (error) {
      console.error('Add review error:', error);
      return false;
    }
  };

  const updateReview = async (reviewId, rating, content) => {
    if (!currentUser) return false;

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const reviewIndex = reviews.findIndex(r => r.id === reviewId);
      
      if (reviewIndex === -1 || reviews[reviewIndex].userId !== currentUser.id) {
        return false;
      }
      
      const updatedReview = {
        ...reviews[reviewIndex],
        rating,
        content,
        updatedAt: new Date().toISOString(),
      };
      
      const newReviews = [...reviews];
      newReviews[reviewIndex] = updatedReview;
      setReviews(newReviews);
      
      // Update movie rating average
      const movieId = updatedReview.movieId;
      const movieReviews = getReviewsByMovieId(movieId);
      const averageRating = movieReviews.reduce((sum, r) => sum + r.rating, 0) / movieReviews.length;
      
      setMovies(movies.map(movie => 
        movie.id === movieId 
          ? { ...movie, rating: Number(averageRating.toFixed(1)) } 
          : movie
      ));
      
      return true;
    } catch (error) {
      console.error('Update review error:', error);
      return false;
    }
  };

  const deleteReview = async (reviewId) => {
    if (!currentUser) return false;

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const reviewIndex = reviews.findIndex(r => r.id === reviewId);
      
      if (reviewIndex === -1 || 
         (reviews[reviewIndex].userId !== currentUser.id && currentUser.role !== 'admin')) {
        return false;
      }
      
      const deletedReview = reviews[reviewIndex];
      const movieId = deletedReview.movieId;
      
      const newReviews = reviews.filter(r => r.id !== reviewId);
      setReviews(newReviews);
      
      // Update movie rating average and count
      const movieReviews = getReviewsByMovieId(movieId).filter(r => r.id !== reviewId);
      const averageRating = movieReviews.length 
        ? movieReviews.reduce((sum, r) => sum + r.rating, 0) / movieReviews.length 
        : 0;
      
      setMovies(movies.map(movie => 
        movie.id === movieId 
          ? { 
              ...movie, 
              rating: movieReviews.length ? Number(averageRating.toFixed(1)) : 0, 
              reviewCount: movie.reviewCount - 1 
            } 
          : movie
      ));
      
      return true;
    } catch (error) {
      console.error('Delete review error:', error);
      return false;
    }
  };

  const toggleFavorite = async (movieId) => {
    if (!currentUser) return false;

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const isFav = favorites.some(fav => 
        fav.userId === currentUser.id && fav.movieId === movieId
      );
      
      let newFavorites;
      
      if (isFav) {
        // Remove from favorites
        newFavorites = favorites.filter(
          fav => !(fav.userId === currentUser.id && fav.movieId === movieId)
        );
      } else {
        // Add to favorites
        const movie = getMovieById(movieId);
        if (!movie) return false;
        
        const newFavorite = {
          id: favorites.length + 1,
          userId: currentUser.id,
          movieId,
          movie,
          addedAt: new Date().toISOString(),
        };
        
        newFavorites = [...favorites, newFavorite];
      }
      
      setFavorites(newFavorites);
      
      // Save to localStorage
      localStorage.setItem(`favorites_${currentUser.id}`, JSON.stringify(newFavorites));
      
      return true;
    } catch (error) {
      console.error('Toggle favorite error:', error);
      return false;
    }
  };

  const isFavorite = (movieId) => {
    if (!currentUser) return false;
    return favorites.some(
      fav => fav.userId === currentUser.id && fav.movieId === movieId
    );
  };

  const searchMovies = (query, filters = {}) => {
    let filteredMovies = [...movies];
    
    // Text search
    if (query) {
      const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0);
      filteredMovies = filteredMovies.filter(movie => {
        const movieText = `${movie.title} ${movie.director} ${movie.cast.join(' ')}`.toLowerCase();
        return searchTerms.every(term => movieText.includes(term));
      });
    }
    
    // Genre filter
    if (filters.genre) {
      filteredMovies = filteredMovies.filter(movie => 
        movie.genres.includes(filters.genre)
      );
    }
    
    // Type filter (movie/series)
    if (filters.type) {
      filteredMovies = filteredMovies.filter(movie => 
        movie.type === filters.type
      );
    }
    
    // Rating filter
    if (filters.minRating) {
      filteredMovies = filteredMovies.filter(movie => 
        movie.rating >= filters.minRating
      );
    }
    
    // Year filter
    if (filters.year) {
      filteredMovies = filteredMovies.filter(movie => 
        movie.releaseYear === filters.year
      );
    }
    
    // Sort options
    if (filters.sort) {
      switch (filters.sort) {
        case 'rating':
          filteredMovies.sort((a, b) => b.rating - a.rating);
          break;
        case 'latest':
          filteredMovies.sort((a, b) => b.releaseYear - a.releaseYear);
          break;
        case 'popular':
          filteredMovies.sort((a, b) => b.reviewCount - a.reviewCount);
          break;
        case 'title':
          filteredMovies.sort((a, b) => a.title.localeCompare(b.title));
          break;
        default:
          break;
      }
    }
    
    return filteredMovies;
  };

  const value = {
    movies,
    featuredMovies,
    popularMovies,
    newReleases,
    genres,
    reviews,
    favorites,
    getMovieById,
    getReviewsByMovieId,
    getUserReviewForMovie,
    addReview,
    updateReview,
    deleteReview,
    toggleFavorite,
    isFavorite,
    searchMovies,
  };

  return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>;
};