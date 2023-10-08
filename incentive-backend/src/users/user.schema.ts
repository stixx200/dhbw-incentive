import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { Role } from './role.enum';
import { UserDto } from './dto/user.dto';

export type UserDocument = User & Document;

@Schema()
export class User extends UserDto {
  _id: ObjectId;

  @Prop({ required: true, unique: true })
  email: string;
  @Prop({ required: true })
  password: string;
  @Prop({})
  firstname: string;
  @Prop({})
  lastname: string;
  @Prop({ default: [Role.User], enum: Role, type: [String] })
  roles: Role[];
  @Prop({ default: 0 })
  receivedCredits: number;
  @Prop({ default: 0 })
  creditsToPlace: number;
  @Prop({ default: [], type: [mongoose.Schema.Types.ObjectId], ref: 'User' })
  assignedUsers: string[];

  // methods
  validatePassword: (passwordEnteredByUser: string) => Promise<boolean>;
  toJSON: () => User;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
  try {
    if (this.isModified('password') || this.isNew) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } else {
      return next();
    }
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.validatePassword = async function (
  passwordEnteredByUser: string,
) {
  return await bcrypt.compare(passwordEnteredByUser, this.password);
};
