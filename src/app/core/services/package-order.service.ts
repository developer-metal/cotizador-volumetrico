import { Injectable } from '@angular/core';
import { Constants } from '../const/constants';
import { PackageDto } from '../model/interface/packageDto.interface';
import { OrderResponse } from '../model/interface/order.interface';
import { delay, Observable, of } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
@Injectable({
  providedIn: 'root'
})
export class PackageOrderService {
  private readonly MAX_VOLUME = Constants.MAX_VOLUME; 
  private readonly PRICE_PER_20CM3 = Constants.PRICE_PER_20CM3;
  createPackage(packageData: PackageDto): Observable<OrderResponse> {
    try {
      const volume = this.calculateVolume(packageData);
      if (volume >= this.MAX_VOLUME) {
        const responseError: any = { message: 'El volumen excede el límite máximo. Por favor contacte a un ejecutivo.', code: 'WARNING' };
        throw { responseError };
      }
      const response: OrderResponse = {
        message: 'Paquete registrado exitosamente',
        orderDetails: {
          orderId: this.generateOrderId(),
          packageDetails: {
            ...packageData,
            volume
          } as any,
          price: this.calculatePrice(volume),
          status: 'SUCCESS',
          date: new Date().toLocaleDateString('es-CL'),
          time: new Date().toLocaleTimeString('es-CL')
        }
      };
      return of(response).pipe(delay(800));
  } catch (error) {
      throw (error);
  }
  }
  private calculateVolume(dimensions: PackageDto): number {
    return dimensions.length * dimensions.width * dimensions.height;
  }
  private calculatePrice(volume: number): number {
    return Math.ceil(volume / 20) * this.PRICE_PER_20CM3;
  }
  private generateOrderId(): string {
    return `OR-${uuidv4().substr(0, 8).toUpperCase()}`;
  }
}