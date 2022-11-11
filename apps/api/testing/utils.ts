import { ICreateUserDto, ILoginDto } from '@incentive/api-interfaces';
import request from 'supertest';
import { expect } from '@jest/globals';
import { INestApplication } from '@nestjs/common';

export async function login(app: INestApplication | string, data: ILoginDto) {
  const { body } = await request(
    typeof app === 'string' ? app : app.getHttpServer()
  )
    .post('/auth/login')
    .send(data)
    .expect(200);
  return body.access_token;
}

export async function createUser(
  app: INestApplication,
  user: ICreateUserDto,
  token: string
) {
  const { body } = await request(app.getHttpServer())
    .post('/users')
    .auth(token, { type: 'bearer' })
    .send(user)
    .expect(201);
  expect(body._id).toBeDefined();
  return body._id;
}
