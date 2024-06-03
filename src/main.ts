import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { appSettings } from './settings/app.settings';
import * as dotenv from 'dotenv';
import { useContainer } from 'class-validator';
import { ConfigService } from '@nestjs/config';
import { ConfigurationType } from './settings/configuration';

dotenv.config();

const PORT = process.env.PORT || 9000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  appSettings(app);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  const configService = app.get(ConfigService<ConfigurationType, true>);
  const environmentSettings = configService.get('environmentSettings', {
    infer: true,
  });

  await app.listen(PORT, () => {
    console.log(`listening on port = ${PORT}`);
    console.log('ENV: ', environmentSettings.currentEnv);
  });
}
bootstrap();
