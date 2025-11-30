import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { OrdersModule } from './orders/orders.module';
import { ProductionModule } from './production/production.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AdminModule } from './admin/admin.module';
import { ReportsModule } from './reports/reports.module';
import { ProfileModule } from './profile/profile.module';

import { configModule } from './common/config/config.service';

@Module({
  imports: [configModule, AuthModule, UsersModule, PrismaModule, OrdersModule, ProductionModule, DashboardModule, AdminModule, ReportsModule, ProfileModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
