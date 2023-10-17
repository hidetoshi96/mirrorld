export type Post = {
  id: number;
  title: string;
  slug: string;
  imageUrl: string;
  createdTime: string;
  isMyPost: boolean;
  location: Location;
  tags: string[];
  stamps: Stamps;
};

export type Location = {
  latitude: number;
  longitude: number;
};

export type Stamps = {
  wonderfulStamp: Stamp;
  niceChallengeStamp: Stamp;
};

export type Stamp = {
  clicked: boolean;
  count: number;
};
