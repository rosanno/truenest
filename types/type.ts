export type AuthUser = {
  sub: string;
  username: string;
  iat: number;
  exp: number;
  user: {
    profileId: {
      _id: string;
      firstName: string;
      lastName: string;
      birthDate: string;
      phone: string;
      address: string;
      __v: number;
    };
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
};

export type Aminity = {
  _id?: string;
  name: string;
  description: string;
  __v?: number;
};

export type Aminities = {
  success: boolean;
  aminities: Aminity[];
};

export interface Properties {
  success: boolean;
  properties: PropertyForm[]
}

export interface PropertyForm {
  name: string;
  type: "apartment" | "house" | "condo" | "land" | "commercial";
  status: "For Rent" | "For Sale";
  price: number;
  rooms: number;
  beds: number;
  baths: number;
  area: number;
  description: string;
  address: string;
  zipCode: string;
  country: string;
  city: string;
  landmark: string;
  photos?: { url: string }[];
  features: string[];
}
