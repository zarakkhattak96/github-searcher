import React, { SetStateAction } from 'react';

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
  received_events_url: string;
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
  background?: string;
}

export interface IRepository {
  id: number;
  node_id: string;
  name: string;
  private: boolean;
  owner: IFollower;
  html_url: string;
  description: string | null;
  fork: boolean;
  url: string;
  forks__url: string;
  keys_url: string;
  collaborators_url: string;
  teams_url: string;
  hooks_url: string;
  issues_events_url: string;
  events_url: string;
  assignees_url: string;
  branches_url: string;
  tags_url: string;
  blobs_url: string;
  git_tags_url: string;
  git_refs_url: string;
  trees_url: string;
  statuses_url: string;
  languages_url: string;
  stargazers_url: string;
  contributors_url: string;
  subscribers_url: string;
  subscription_url: string;
  commits_url: string;
  git_commits_url: string;
  comments_url: string;
  issue_comment_url: string;
  contents_url: string;
  compare_url: string;
  merges_url: string;
  archive_url: string;
  downloads_url: string;
  issues_url: string;
  pulls_url: string;
  milestones_url: string;
  notifications_url: string;
  labels_url: string;
  releases_url: string;
  deployments_url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  git_url: string;
  ssh_url: string;
  clone_url: string;
  svn_url: string;
  homepage: string | null;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string;
  has_issues: boolean;
  has_projects: boolean;
  has_downloads: boolean;
  has_wiki: boolean;
  has_pages: boolean;
  has_discussions: boolean;
  forks_count: number;
  mirror_url: string;
  archived: boolean;
  disabled: boolean;
  open_issues_count: number;
  license: string | null;
  allow_forking: boolean;
  is_template: boolean;
  web_commits_signoff_required: boolean;
  topics: string[];
  visibility: string;
  forks: number;
  open_issues: number;
  watchers: number;
  default_branch: string;
}

export interface ISearchInputProps {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  // debouncedProfile: () => void;
}

export interface IContentComponentProps {
  userProfile: IUserProfile[];
  // isRefreshed: boolean;
  // setIsRefreshed: (entityType: entityType) => void;
  // activeColor: string;
  userRepositories: IRepository[];
}

export interface ISelectComponentProps {
  debouncedProfile: () => void;
  debouncedRepos: () => void;
  username: string;
  userRepos: IRepository[];
}

export interface IHomePageComponentProps {
  username: string;
  setUsername: React.Dispatch<SetStateAction<string>>;
  debouncedProfile: () => void;
  debouncedRepos: () => void;
  userProfile: IUserProfile[];
  userRepositories: IRepository[];
  setExpandedUserRepos: React.Dispatch<SetStateAction<IRepository[]>>;
  // activeColor: string;
  // setActiveColor: React.Dispatch<SetStateAction<string>>;
}
