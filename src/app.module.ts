import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { PrismaModule } from './prisma/prisma.module';
import { CoreModule } from './core/core.module';
import { ConfigModule } from '@nestjs/config';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: process.env.NODE_ENV === 'development',
      autoSchemaFile: true,
      playground: false,
      sortSchema: true,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    PrismaModule,
    CoreModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PostsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
