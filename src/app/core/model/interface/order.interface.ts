import { PackageDto } from "./packageDto.interface";

export interface OrderResponse {
    message: string;
    orderDetails: {
      orderId: string;
      packageDetails: PackageDto;
      price: number;
      status: string;
      date: string;
      time: string;
    };
  }