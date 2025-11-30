import { Injectable } from '@nestjs/common';
import { OrdersService } from '../orders/orders.service';
import { ProductionService } from '../production/production.service';

@Injectable()
export class DashboardService {
    constructor(
        private ordersService: OrdersService,
        private productionService: ProductionService,
    ) { }

    async getSummary() {
        const ordersStats = await this.ordersService.getStats();
        const productionStats = await this.productionService.getStats();

        return {
            activeOrders: ordersStats.activeOrders,
            totalProduction: productionStats.totalProduction,
            temperature: 18, // Mocked
            activeAlerts: productionStats.maintenanceAlerts,
        };
    }
}
