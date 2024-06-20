export interface ITemplatesColumn {
  id: string;
  title: string;
  tasks: Array<string>;
}

export interface IBoard {
  _id: string;
  type: "template" | "board";
  name: string;
  background: string;
  columns: ITemplatesColumn[];
  user: string;
}

export interface IPhoto {
  alt_description: string | null;
  alternative_slugs: {
    [key: string]: string;
  };
  asset_type: string;
  blur_hash: string;
  breadcrumbs: any[];
  color: string;
  created_at: string;
  current_user_collections: any[];
  description: string | null;
  height: number;
  id: string;
  liked_by_user: boolean;
  likes: number;
  links: {
    self: string;
    html: string;
    download: string;
    download_location: string;
  };
  promoted_at: string | null;
  slug: string;
  sponsorship: any | null;
  topic_submissions: {
    [key: string]: any;
  };
  updated_at: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  user: {
    id: string;
    updated_at: string;
    username: string;
    name: string;
    first_name: string;
    last_name: string;
    twitter_username: string | null;
    portfolio_url: string | null;
    bio: string | null;
    location: string | null;
    links: {
      self: string;
      html: string;
      photos: string;
      likes: string;
      portfolio: string;
      following: string;
      followers: string;
    };
    profile_image: {
      small: string;
      medium: string;
      large: string;
    };
    instagram_username: string | null;
    total_collections: number;
    total_likes: number;
    total_photos: number;
    accepted_tos: boolean;
  };
  width: number;
}
