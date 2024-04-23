import { jwtConfig } from './config/jwt.config';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './tasks/task.entity';
import { Note } from './notes/note.entity';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { NotesModule } from './notes/notes.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { ImpDatesModule } from './imp-dates/imp-dates.module';
import * as dotenv from 'dotenv';
import ImpDate from './imp-dates/impDate.entity';

dotenv.config();

export const DATABASE_USERNAME: string = process.env.DB_USERNAME;
export const DATABASE_PASSWORD: string = process.env.DB_PASSWORD;
export const DATABASE_HOST: string = process.env.DB_HOST;
export const DATABASE_NAME: string = process.env.DB_NAME;
export const DATABASE_PORT: number = Number(process.env.DB_PORT);

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: DATABASE_HOST,
      port: DATABASE_PORT,
      username: DATABASE_USERNAME,
      password: DATABASE_PASSWORD,
      database: DATABASE_NAME,
      options: {
        "encrypt": false, },
      synchronize : false,
      extra: {
        trustedConnection: true,
        trustedServerCertificate: true
        },
        autoLoadEntities: true, 
    }) , TypeOrmModule.forFeature([Task, Note, User, ImpDate]),UsersModule, TasksModule, NotesModule,AuthModule,
    JwtModule.registerAsync(jwtConfig),
    ImpDatesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'Notes/mine', method: RequestMethod.GET })
      consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'Tasks/mine', method: RequestMethod.GET })
    }

}
