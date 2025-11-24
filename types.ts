export interface LinkItem {
  id: string;
  title: string;
  url: string;
  visible: boolean;
}

export interface SocialItem {
  id: string;
  type: 'users' | 'email' | 'shop' | 'briefcase' | 'instagram' | 'twitter';
  url: string;
}

export interface ProfileData {
  username: string;
  role: string;
  avatarUrl: string;
}

export interface AppState {
  profile: ProfileData;
  links: LinkItem[];
  socials: SocialItem[];
}
