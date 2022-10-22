import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateUserDto } from '../src/users/dto/create-user.dto';
import { Role } from '../src/users/role.enum';
import { LoginDto } from '../src/auth/auth.controller';
import { CreateTransactionDto } from '../src/transactions/dto/create-transaction.dto';

describe('Application (e2e)', () => {
  let app: INestApplication;
  let adminToken: string;
  let user1Id: string;
  let user2Id: string;
  let teamleaderId: string;
  let teamleaderToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    adminToken = await login({ email: 'admin@local', password: 'admin' });

    user1Id = await createUser(
      {
        email: 'user1@local',
        password: 'user',
        firstname: 'Henry',
        lastname: 'Mills',
        roles: [Role.User],
      },
      adminToken,
    );
    user2Id = await createUser(
      {
        email: 'user2@local',
        password: 'user',
        firstname: 'Todd',
        lastname: 'Graham',
        roles: [Role.User],
      },
      adminToken,
    );

    teamleaderId = await createUser(
      {
        email: 'teamleader@local',
        password: 'teamleader',
        firstname: 'Rabe',
        lastname: 'Bobb',
        roles: [Role.Teamleader],
        assignedUsers: [user1Id],
      },
      adminToken,
    );
    teamleaderToken = await login({
      email: 'teamleader@local',
      password: 'teamleader',
    });
  });

  afterAll(async () => {
    await app.close();
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
      .send({ recipient: user2Id, amount: 5 } as CreateTransactionDto)
      .expect(403);
  });

  it('fails with 409 if amount is higher than creditsToPlace', async () => {
    await request(app.getHttpServer())
      .post('/transactions')
      .auth(teamleaderToken, { type: 'bearer' })
      .send({ recipient: user1Id, amount: 200 } as CreateTransactionDto)
      .expect(409);
  });

  it('creates transaction', async () => {
    await request(app.getHttpServer())
      .post('/transactions')
      .auth(teamleaderToken, { type: 'bearer' })
      .send({ recipient: user1Id, amount: 5 } as CreateTransactionDto)
      .expect(201);

    await request(app.getHttpServer())
      .get(`/transactions?userId=${user1Id}`)
      .auth(teamleaderToken, { type: 'bearer' })
      .expect(200)
      .expect((res) =>
        expect(res.body[0]).toMatchObject({
          recipient: user1Id,
          sender: teamleaderId,
          amount: 5,
        }),
      );

    await request(app.getHttpServer())
      .get(`/users/${user1Id}`)
      .auth(teamleaderToken, { type: 'bearer' })
      .expect(200)
      .expect((res) =>
        expect(res.body).toMatchObject({
          receivedCredits: 5,
        }),
      );
  });

  async function login(data: LoginDto) {
    const { body } = await request(app.getHttpServer())
      .post('/auth/login')
      .send(data)
      .expect(200);
    return body.access_token;
  }

  async function createUser(user: CreateUserDto, token: string) {
    const { body } = await request(app.getHttpServer())
      .post('/users')
      .auth(token, { type: 'bearer' })
      .send(user)
      .expect(201);
    expect(body._id).toBeDefined();
    return body._id;
  }
});
