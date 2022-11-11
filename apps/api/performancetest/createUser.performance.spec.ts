import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { MongoMemoryServerService } from '../testing/test-database.module';
import { Test, TestingModule } from '@nestjs/testing';
import { benchmark } from 'kelonio';
import axios from 'axios';
import { login } from '../testing/utils';

describe('api performance test createUser', () => {
  const port = 4568;
  const mongoMemoryServer = new MongoMemoryServerService();
  let app: INestApplication;
  let adminToken: string;

  beforeAll(async () => {
    await mongoMemoryServer.onModuleInit();
    process.env.MONGODB_URI = await mongoMemoryServer.getUri();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    await app.listen(port, '127.0.0.1');
    adminToken = await login(await app.getUrl(), {
      email: 'admin@local',
      password: 'admin',
    });
  });

  afterAll(async () => {
    await app?.close();
    await mongoMemoryServer?.onModuleDestroy();
  });

  it('can send POST users', async () => {
    const url = `${await app.getUrl()}/users`;
    let i = 0;
    await benchmark.record(
      ['HTTP client', 'POST', 'user'],
      async () => {
        await axios.post(
          url,
          {
            email: `user${i++}@local`,
            password: 'user',
          },
          { headers: { authorization: `Bearer ${adminToken}` } }
        );
      },
      {
        iterations: 100,
        meanUnder: 100,
      }
    );
  }, 30_000);
});
