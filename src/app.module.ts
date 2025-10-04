import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserOrmEntity from './core/user/infrastructure/persistence/entity/user-orm.entyti';
import { UserModule } from './core/user/infrastructure/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [UserOrmEntity],
      synchronize: true,
    }),
    UserModule,
  ],
})
export class AppModule {}
