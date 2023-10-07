interface Post {
  id: number;
  title: string;
  slug: string;
  imageUrl: string;
  createdTime: string;
  isMyPost: boolean;
  location: Location;
  tags: string[];
  stamps: Stamps;
}

interface Location {
  latitude: number;
  longitude: number;
}

interface Stamps {
  wonderfulStamp: Stamp;
  niceChallengeStamp: Stamp;
}

interface Stamp {
  clicked: boolean;
  count: number;
}
