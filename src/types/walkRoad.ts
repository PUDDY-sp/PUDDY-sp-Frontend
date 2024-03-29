export interface WalkRoadType {
  id: number;
  name: string;
  startLat: number;
  startLong: number;
  endLat: number;
  endLong: number;
}

export interface UserAddress {
  mainAddress: string;
}

export interface UserLocation {
  lat: number;
  long: number;
}
