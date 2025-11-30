import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

dotenv.config();

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('🌱 Starting seed...');

    // 1. Users
    const password = await bcrypt.hash('admin123', 10);

    const admin = await prisma.user.upsert({
        where: { email: 'admin@biogeles.com' },
        update: {},
        create: {
            email: 'admin@biogeles.com',
            name: 'Admin User',
            password,
            role: 'ADMIN',
        },
    });

    const user = await prisma.user.upsert({
        where: { email: 'user@biogeles.com' },
        update: {},
        create: {
            email: 'user@biogeles.com',
            name: 'Regular User',
            password,
            role: 'USER',
        },
    });

    console.log('✅ Users seeded');

    // 2. Species
    const spirulina = await prisma.species.create({
        data: {
            name: 'Spirulina',
            scientificName: 'Arthrospira platensis',
            description: 'Blue-green algae rich in protein and vitamins.',
            cycleDays: 10,
            yieldPercent: 85.5,
            tempRange: '30-35°C',
            phRange: '9.0-10.5',
            usage: 'Dietary supplement, food coloring',
        },
    });

    const chlorella = await prisma.species.create({
        data: {
            name: 'Chlorella',
            scientificName: 'Chlorella vulgaris',
            description: 'Green algae known for detoxification properties.',
            cycleDays: 7,
            yieldPercent: 80.0,
            tempRange: '25-30°C',
            phRange: '6.5-7.5',
            usage: 'Detox supplement, animal feed',
        },
    });

    console.log('✅ Species seeded');

    // 3. Formulas
    await prisma.formula.createMany({
        data: [
            {
                name: 'Standard Growth Mix',
                nutrients: 'Nitrogen, Phosphorus, Potassium',
                dose: '10ml/L',
                frequency: 'Daily',
            },
            {
                name: 'Bloom Booster',
                nutrients: 'High Phosphorus, Potassium',
                dose: '5ml/L',
                frequency: 'Every 3 days',
            },
        ],
    });

    console.log('✅ Formulas seeded');

    // 4. Orders
    await prisma.order.createMany({
        data: [
            {
                clientName: 'Health Foods Inc.',
                product: 'Spirulina Powder',
                quantity: 50.0,
                status: 'PENDING',
                priority: 'HIGH',
                deliveryDate: new Date(new Date().setDate(new Date().getDate() + 7)),
            },
            {
                clientName: 'Green Smoothies Ltd.',
                product: 'Chlorella Tablets',
                quantity: 20.0,
                status: 'PROCESSING',
                priority: 'NORMAL',
                deliveryDate: new Date(new Date().setDate(new Date().getDate() + 14)),
            },
            {
                clientName: 'Eco Feed Co.',
                product: 'Algae Paste',
                quantity: 100.0,
                status: 'COMPLETED',
                priority: 'LOW',
                deliveryDate: new Date(new Date().setDate(new Date().getDate() - 5)),
            },
        ],
    });

    console.log('✅ Orders seeded');

    // 5. Production Events
    await prisma.productionEvent.createMany({
        data: [
            {
                title: 'Tank A Seeding',
                description: 'Initial seeding of Spirulina in Tank A',
                startDate: new Date(),
                endDate: new Date(new Date().setDate(new Date().getDate() + 1)),
                type: 'SEEDING',
                status: 'COMPLETED',
                alertLevel: 'NONE',
            },
            {
                title: 'Weekly Maintenance',
                description: 'Cleaning filters and checking pH levels',
                startDate: new Date(new Date().setDate(new Date().getDate() + 2)),
                endDate: new Date(new Date().setDate(new Date().getDate() + 2)),
                type: 'MAINTENANCE',
                status: 'SCHEDULED',
                alertLevel: 'LOW',
            },
            {
                title: 'Harvest Cycle 1',
                description: 'Harvesting mature Chlorella',
                startDate: new Date(new Date().setDate(new Date().getDate() + 5)),
                endDate: new Date(new Date().setDate(new Date().getDate() + 6)),
                type: 'HARVEST',
                status: 'SCHEDULED',
                alertLevel: 'MEDIUM',
            },
        ],
    });

    console.log('✅ Production Events seeded');

    // 6. System Config
    await prisma.systemConfig.create({
        data: {
            maintenanceMode: false,
            autoBackup: true,
            emailNotifs: true,
            extendedHistory: false,
        },
    });

    console.log('✅ System Config seeded');
    console.log('🚀 Seed completed successfully!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
