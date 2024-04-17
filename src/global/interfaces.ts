export interface IFollower {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_url: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscription_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events: string;
  type: string;
  site_admin: boolean;
}

export interface IUserProfile {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscription_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events: string;
  type: string;
  site_admin: boolean;
  score: number;
  followers?: IFollower[];
}
