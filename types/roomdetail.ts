type RoomsDetail = {
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

export type RoomDetailResponse = {
  status: boolean,
  result: RoomsDetail
}
