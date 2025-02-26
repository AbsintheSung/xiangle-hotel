export type NewsItem = {
  _id: string;
  title: string;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export type ResponseNews = {
  // data: {
  status: boolean;
  result: NewsItem[];
  // };
}

export type Delicacy = {
  _id: string,
  title: string,
  description: string,
  diningTime: string,
  image: string,
  createdAt: string,
  updatedAt: string
}
export type ResponseDelicacy = {
  // data: {
  status: boolean;
  result: Delicacy[];
  // };
}

export type Rooms = {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  imageUrlList: string[];
  areaInfo: string;
  bedInfo: string;
  maxPeople: number;
  price: number;
  status: number;
  layoutInfo: {
    title: string;
    isProvide: boolean;
  }[];
  facilityInfo: {
    title: string;
    isProvide: boolean;
  }[];
  amenityInfo: {
    title: string;
    isProvide: boolean;
  }[];
  createdAt: string;
  updatedAt: string;
}

export type ResponseRooms = {
  // data: {
  status: boolean;
  result: Rooms[];
  // };
}
