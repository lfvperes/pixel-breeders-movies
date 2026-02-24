export interface Movie {
    id: number;
    title: string;
    poster_path: string | null;
    overview: string;
    release_date: string;
  }
  
  export interface CastMember {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
  }
  
  export interface MovieDetail extends Movie {
    credits: {
      cast: CastMember[];
    };
  }
  
  export interface Rating {
    id: number;
    movie_id: number;
    title: string;
    poster_path: string | null;
    rating: number;
    created_at: string;
    updated_at: string;
  }