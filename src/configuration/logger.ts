import { RequestMethod } from '@nestjs/common';
import { Params } from 'nestjs-pino';

export const pinoLoggerConfigFactory = (): Params => ({
  pinoHttp: {
    level: 'info',
    messageKey: 'message',
    timestamp: () => `,"timestamp":"${new Date(Date.now()).toISOString()}"`,
    formatters: {
      level: (label: string) => ({
        level: label,
      }),
      log: (obj: any) => {
        const { responseTime, ...info } = obj;
        return {
          ...info,
          duration: responseTime ? Number(responseTime) / 1000 : undefined,
        };
      },
    },
    customProps: function (req, res) {
      return {
        customProp: 'I will be duplicated',
      };
    },
    base: {
      environment: 'development',
      service: 'pino-customprops-bug-api',
    },
    redact: {
      paths: ['req.headers', 'res.headers'],
    },
  },

  exclude: [{ method: RequestMethod.ALL, path: '/health' }],
});
