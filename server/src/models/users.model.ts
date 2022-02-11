import * as mongoose from 'mongoose';
const ROLE = ['physician', 'allergist', 'BusinessAssociate', 'AllergyClinic', 'System', 'RegularUser'];
const userSchema = new mongoose.Schema({
  email: { type: String, index: true },
  password: { type: String },
});
userSchema.statics.objectId = (id: any) => {
  return mongoose.Types.ObjectId(id);
}

const userModel: any = mongoose.model<mongoose.Document>('redoak_user', userSchema);
export default userModel;
