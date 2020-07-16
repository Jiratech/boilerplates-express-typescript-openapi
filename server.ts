require('dotenv').config()
require("express-async-errors");
import 'source-map-support/register';
import RoleService from './api/services/RoleService';
import { roleNames, adminUser } from './api/utils/constants';
import UserService from './api/services/UserService';
import { RewriteFrames } from '@sentry/integrations';
import { sequelize } from './api/config/database';
import express, { Application, Request, Response, NextFunction } from 'express';
import path from 'path';
import { OpenApiValidator } from 'express-openapi-validator';
import swaggerUI from 'swagger-ui-express';
import jsYaml from 'js-yaml';
import fs from 'fs';
import * as Sentry from '@sentry/node';
import { verifyAccessToken, verifyRefreshToken } from './api/middlewares/jwtController';

class App {
  public app: Application;
  public port: number;
  public schemaPath = './schema.json'
  public schema: any;

  constructor() {
    this.app = express();
    this.port = parseInt(`${process.env.PORT}`, 10) || 3000;
    this.schema = jsYaml.safeLoad(fs.readFileSync(this.schemaPath).toString());
    this.init();
  }

  public init = async () => {
    try {
      console.log('Initialize Sentry')
      if (process.env.SENTRY_DSN) {
        this.initializeSentry();
      }

      await this.initializeDatabase();
      console.log('Initialize Database success')
      console.log('Initialize Middlewares')

      this.initializeMiddlewares();
      console.log('Initialize Middlewares succcess')
      console.log('Initialize Routes')

      await this.initializeRoutes();
      console.log('Initialize Routes success')
      console.log('Opening server')
      this.listen(this.port);

    } catch (e) {
      console.log('Server errored');
      console.log(e);
    }
  }

  public allowCrossDomain = function (request: Request, response: Response, next: NextFunction) {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    response.header('Access-Control-Allow-Headers', 'Content-Type,refreshToken,accessToken');

    next();
  }

  public listen(port: number) {
    this.app.listen(port, () => {
      console.log(`App listening on the port ${port}`);
    });
  }

  public initializeSentry() {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      integrations: [new RewriteFrames({
        root: __dirname || process.cwd(),
      })]
    });
  }

  public async initializeDatabase() {
    await sequelize.sync({ force: true });
    await RoleService.createRoles([roleNames.admin, roleNames.user])
    try {
      await UserService.createUser(adminUser, roleNames.admin);
    } catch (error) {
      console.warn("Warning: Admin user already exists and will not be created again !");
    }
  }

  private initializeMiddlewares() {
    this.app.use(Sentry.Handlers.requestHandler());
    this.app.use(express.json());
    this.app.use(this.allowCrossDomain);
    this.app.use('/swagger-ui.html', swaggerUI.serve, swaggerUI.setup(this.schema));
  }

  private async initializeRoutes() {
    await new OpenApiValidator({
      apiSpec: this.schema,
      validateResponses: true,
      operationHandlers: path.join(__dirname, 'api'),
      validateSecurity: {
        handlers: {
          BearerAuth: (req, scopes, schema) => {
            return new Promise((resolve, reject) => {
              verifyAccessToken(
                req,
                (successBoolean: any) => {
                  resolve(successBoolean);
                },
                (errorMessage: any) => {
                  reject(errorMessage);
                }
              );
            });
          },
          RefreshKeyAuth: async (req, scopes, schema) => {
            return new Promise((resolve, reject) => {
              verifyRefreshToken(
                req,
                (successBoolean: any) => {
                  resolve(successBoolean);
                },
                (errorMessage: any) => {
                  reject(errorMessage);
                }
              );
            });
          },
        }
      },
    })
      .install(this.app)
      .then(() => {
        this.app.use((err: any, req: any, res: any, next: any) => {
          let errors = [];
          if (err.errors) {
            errors = err.errors.map((error: any) => ({
              message: error.message,
            }))
          }

          res.status(err.status || 500).json({
            timestamp: new Date().toUTCString(),
            status: err.status || 500,
            name: err.name,
            message: err.message,
            errors: errors || err.errors,
          });

        });
      })
  }
}

const app = new App();
