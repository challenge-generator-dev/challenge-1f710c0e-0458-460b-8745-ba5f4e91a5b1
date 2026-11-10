import 'dotenv/config';
import { createApp } from './app';
import { DynamoOrderRepository } from './infrastructure/repositories/DynamoOrderRepository';
import { getTableName } from './infrastructure/config/dynamoConfig';

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

async function bootstrap(): Promise<void> {
    try {
        const tableName = getTableName();
        console.log(`[MAIN] Iniciando aplicación con tabla: ${tableName}`);

        const repository = new DynamoOrderRepository();
        const app = createApp(repository);

        const server = app.listen(PORT, () => {
            console.log(`[MAIN] Servidor Express escuchando en puerto ${PORT}`);
            console.log(`[MAIN] Endpoints disponibles:`);
            console.log(`  POST   /api/orders`);
            console.log(`  GET    /api/orders/:id`);
            console.log(`  PUT    /api/orders/:id`);
            console.log(`  DELETE /api/orders/:id`);
            console.log(`  GET    /api/orders`);
        });

        server.on('error', (error: NodeJS.ErrnoException) => {
            if (error.code === 'EADDRINUSE') {
                console.error(`[MAIN] Error: El puerto ${PORT} ya está en uso`);
                process.exit(1);
            }
            throw error;
        });
    } catch (error) {
        console.error('[MAIN] Error crítico al iniciar la aplicación:', error);
        process.exit(1);
    }
}

if (require.main === module) {
    bootstrap();
}

export { bootstrap };