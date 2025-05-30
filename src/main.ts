import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

const start = async () => {
    try {
        const PORT = process.env.PORT || 5000;
        const app = await NestFactory.create(AppModule);

        app.enableCors({
            origin: '*',
            methods: ['GET', 'POST'],
        });

        await app.listen(PORT, '0.0.0.0', () => console.log(`Server started on PORT ${PORT}`));
    } catch (e) {
        console.error('Server failed to start:', e);
    }
};

start();