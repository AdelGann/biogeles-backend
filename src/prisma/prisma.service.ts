import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from "@prisma/client"
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

/**
 * @description Servicio que maneja la conexión a la base de datos
 */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    /**
     * @description Constructor de la clase DbService que inicializa la conexión a la base de datos 
     * 
     * @param configService 
     */
    constructor(private configService: ConfigService) {
        const connectionString = configService.get<string>('DATABASE_URL');
        const pool = new Pool({ connectionString });
        const adapter = new PrismaPg(pool);
        super({ adapter });
    }
    /**
     * @description Método que se ejecuta cuando se inicializa el módulo
     * 
     * @returns Promise<void>
     */
    async onModuleInit() {
        await this.$connect();
    }
}
