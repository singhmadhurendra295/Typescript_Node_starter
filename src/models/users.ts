import * as mongoose from 'mongoose';
import { IUser } from '../interfaces/user';
import * as bcrypt from 'bcrypt';
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  countryCode: String,
  mobile: String,
});
userSchema.methods.comparePassword = function (candidatePassword: string): Promise<boolean> {
  const password = this.password;
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, password, (err, success) => {
      if (err) return reject(err);
      return resolve(success);
    });
  });
};
const userModel = mongoose.model<IUser & mongoose.Document>('User', userSchema);
export default userModel;