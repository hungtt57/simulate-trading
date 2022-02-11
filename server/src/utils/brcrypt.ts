import * as bcrypt from 'bcrypt';

const salt = 10

export default {
  generate: (plainText): string => {
    return  bcrypt.hashSync(plainText, salt);
  },
  compare: async (myPlaintextPassword, hash): Promise<any> => {
    return bcrypt.compareSync(myPlaintextPassword, hash);
  }
}

