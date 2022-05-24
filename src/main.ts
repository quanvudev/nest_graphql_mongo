import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { AppModule } from '@/app.module';
import config from '@/configs';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );

  await app.listen(config().port, (err, addr) => {
    if (err) {
      console.error(err);
    }
    console.log(`Server listening on ${addr}`);
  });
}
bootstrap();
