import { BasicPageParams } from '@/api/model/baseModel';

export type PageParams = BasicPageParams;

export interface UrbanAreaModel {
  urbanAreaCode: string;
  urbanAreaName: string;
  status: number;
}

export interface UrbanAreaParams {
  urbanAreaId: number;
  urbanAreaCode: string;
  urbanAreaName: string;
  owner: string;
  region: string;
  district: string;
  township: string;
  street: string;
  buildingDensity: number;
  totalAreaOfLand: number;
  description: string;
  status: number;
  username: string;
}

export interface AreaParams {
  parentCode: string;
}
