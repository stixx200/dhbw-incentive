import * as express from 'express';
import { User } from '../users/user.schema';

export type AuthenticatedRequest = express.Request & { user: User };
