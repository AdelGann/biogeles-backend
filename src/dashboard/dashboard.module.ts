import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { OrdersModule } from '../orders/orders.module';
import { ProductionModule } from '../production/production.module';

@Module({
  imports: [OrdersModule, ProductionModule],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule { }
