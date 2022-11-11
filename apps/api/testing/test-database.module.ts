import {
  Injectable,
  Module,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import MongoMemoryServer from 'mongodb-memory-server-core';

@Injectable()
export class MongoMemoryServerService implements OnModuleInit, OnModuleDestroy {
  private memoryServer: MongoMemoryServer;

  async onModuleInit() {
    if (!this.memoryServer) {
      this.memoryServer = new MongoMemoryServer();
      await this.memoryServer.start();
    }
  }

  async onModuleDestroy() {
    await this.memoryServer.stop();
  }

  async getUri(): Promise<string> {
    if (!this.memoryServer) {
      await this.onModuleInit();
    }
    return this.memoryServer.getUri();
  }
}

@Module({
  providers: [MongoMemoryServerService],
  exports: [MongoMemoryServerService],
})
class MongoMemoryServerModule {}

@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [MongoMemoryServerService],
      imports: [MongoMemoryServerModule],
      useFactory: async (
        mongoMemoryServerService: MongoMemoryServerService
      ) => {
        return {
          uri: await mongoMemoryServerService.getUri(),
        };
      },
    }),
  ],
})
export class TestDatabaseModule {}
