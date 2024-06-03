import { Environments } from './enviroments';

export type EnvironmentVariable = { [key: string]: string | undefined };

export type ConfigurationType = ReturnType<typeof getConfig>;

const getConfig = (
  environmentVariables: EnvironmentVariable,
  currentEnvironment: Environments,
) => {
  return {
    apiSettings: {
      PORT: Number.parseInt(environmentVariables.PORT || '9000'),
      LOCAL_HOST: environmentVariables.LOCAL_HOST || 'http://localhost:9000',
      PUBLIC_FRIEND_FRONT_URL: environmentVariables.PUBLIC_FRIEND_FRONT_URL,
    },

    databaseSettings: {
      host: environmentVariables.DB_HOST,
      port: Number(environmentVariables.DB_PORT),
      username: environmentVariables.DB_USER,
      password: environmentVariables.DB_PASSWORD,
      database: environmentVariables.DB_NAME,
    },

    environmentSettings: {
      currentEnv: currentEnvironment,
      isProduction: currentEnvironment === Environments.PRODUCTION,
      isStaging: currentEnvironment === Environments.STAGING,
      isTesting: currentEnvironment === Environments.TEST,
      isDevelopment: currentEnvironment === Environments.DEVELOPMENT,
    },
  };
};

export default () => {
  const environmentVariables = process.env;

  console.log('process.env.ENV =', environmentVariables.ENV);
  const currentEnvironment: Environments =
    environmentVariables.ENV as Environments;

  return getConfig(environmentVariables, currentEnvironment);
};
