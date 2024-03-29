import { DogTag } from "./sign";

export type UpdateProfileInputType = {
  login: string;
  password: string;
  birth: string;
  mainAddress: string;
  subAddress: string;
  gender: boolean;
};

export type UpdateDogProfileInputType = {
  name: string;
  registerNum: string;
  image: string;
  type: string;
  gender: boolean;
  neuter: boolean;
  tags: DogTag[];
};
