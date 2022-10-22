import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findOne(email: string): Promise<UserDocument | undefined> {
    return this.userModel.findOne({ email });
  }
  async findOneById(userId: string): Promise<UserDocument | undefined> {
    const user = await this.userModel.findOne({
      _id: this.castToObjectId(userId),
    });
    if (!user) {
      throw new NotFoundException({ userId: userId, error: 'User not found.' });
    }
    return user;
  }

  async hasUser(email: string) {
    return !!(await this.findOne(email));
  }

  async ensureUser(userToCreate: CreateUserDto) {
    if (await this.hasUser(userToCreate.email)) {
      return;
    }
    await this.createUser(userToCreate);
  }

  async findUsers() {
    return this.userModel.find({});
  }

  async createUser(userToCreate: CreateUserDto) {
    const userDocument = new this.userModel(userToCreate);
    await userDocument.save();
    return userDocument;
  }

  async updateUser(userId: string, update: Partial<User>) {
    const user = await this.findOneById(userId);
    Object.assign(user, update);
    await user.save();
    return user;
  }

  async deleteUser(userId: string) {
    await this.userModel.deleteOne({ _id: userId });
  }

  async reduceCredits(userId: string, amount: number) {
    const user = await this.findOneById(userId);
    if (user.creditsToPlace < amount) {
      throw new ConflictException({
        error: 'Sender has not enough credits.',
        amount,
      });
    }
    user.creditsToPlace -= amount;
    await user.save();
  }

  async addCredits(userId: string, amount: number) {
    const user = await this.findOneById(userId);
    user.receivedCredits += amount;
    await user.save();
  }

  castToObjectId(id: string) {
    try {
      return new mongoose.Types.ObjectId(id);
    } catch {
      throw new UnprocessableEntityException({
        id,
        error: 'Given id is not a valid userId',
      });
    }
  }
}
