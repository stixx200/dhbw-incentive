import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { MongoMemoryServerService } from '../testing/test-database.module';
import request from 'supertest';
import { Role, ICreateTransactionDto } from '@incentive/api-interfaces';
import { Test, TestingModule } from '@nestjs/testing';
import { createUser, login } from '../testing/utils';

describe('api integrationtest', () => {
  const mongoMemoryServer = new MongoMemoryServerService();
  let app: INestApplication;
  let adminToken: string;
  let user1Id: string;
  let user2Id: string;
  let teamleaderId: string;
  let teamleaderToken: string;

  beforeAll(async () => {
    await mongoMemoryServer.onModuleInit();
    process.env.MONGODB_URI = await mongoMemoryServer.getUri();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    adminToken = await login(app, { email: 'admin@local', password: 'admin' });

    user1Id = await createUser(
      app,
      {
        email: 'user1@local',
        password: 'user',
        firstname: 'Henry',
        lastname: 'Mills',
        roles: [Role.User],
      },
      adminToken
    );
    user2Id = await createUser(
      app,
      {
        email: 'user2@local',
        password: 'user',
        firstname: 'Todd',
        lastname: 'Graham',
        roles: [Role.User],
      },
      adminToken
    );

    teamleaderId = await createUser(
      app,
      {
        email: 'teamleader@local',
        password: 'teamleader',
        firstname: 'Rabe',
        lastname: 'Bobb',
        roles: [Role.Teamleader],
        assignedUsers: [user1Id],
      },
      adminToken
    );
    teamleaderToken = await login(app, {
      email: 'teamleader@local',
      password: 'teamleader',
    });
  });

  afterAll(async () => {
    await app?.close();
    await mongoMemoryServer?.onModuleDestroy();
  });

  beforeEach(async () => {
    await request(app.getHttpServer())
      .patch(`/users/${teamleaderId}`)
      .auth(adminToken, { type: 'bearer' })
      .send({ creditsToPlace: 100 })
      .expect(200);
  });

  it('fails with 409 if user recipient is not allowed', async () => {
    await request(app.getHttpServer())
      .post('/transactions')
      .auth(teamleaderToken, { type: 'bearer' })
      .send({ recipient: user2Id, amount: 5 } as ICreateTransactionDto)
      .expect(403);
  });

  it('fails with 409 if amount is higher than creditsToPlace', async () => {
    await request(app.getHttpServer())
      .post('/transactions')
      .auth(teamleaderToken, { type: 'bearer' })
      .send({ recipient: user1Id, amount: 200 } as ICreateTransactionDto)
      .expect(409);
  });

  it('creates transaction', async () => {
    await request(app.getHttpServer())
      .post('/transactions')
      .auth(teamleaderToken, { type: 'bearer' })
      .send({ recipient: user1Id, amount: 5 } as ICreateTransactionDto)
      .expect(201);

    await request(app.getHttpServer())
      .get(`/transactions?userId=${user1Id}`)
      .auth(teamleaderToken, { type: 'bearer' })
      .expect(200)
      .expect((res) => {
        expect(res.body[0]).toMatchObject({
          recipient: user1Id,
          sender: teamleaderId,
          amount: 5,
        });
      });

    await request(app.getHttpServer())
      .get(`/users/${user1Id}`)
      .auth(teamleaderToken, { type: 'bearer' })
      .expect(200)
      .expect((res) =>
        expect(res.body).toMatchObject({
          receivedCredits: 5,
        })
      );
  });
});
