import * as mongoose from 'mongoose';
const ROLE = ['physician', 'allergist', 'BusinessAssociate', 'AllergyClinic', 'System', 'RegularUser'];
const userSchema = new mongoose.Schema({
  email: { type: String, index: true },
  wikiEmail: { type: String },
  avatar: { type: String },
  group: [{ type: mongoose.Schema.Types.ObjectId }], /*1 user có thể nằm ở nhiều group/clinic khác nhau*/
  role: { type: String, enum: ROLE, default: ROLE[0] },
  userName: { type: String, index: true },
  fullName: { type: String, index: true },
  firstName: { type: String, default: '' },
  lastName: { type: String, default: '' },
  middleName: { type: String, default: '' },
  idWiki: { type: Number },
  phone: { type: String },
  title: { type: String },
  license_number: { type: String },
  dea: { type: String },
  issued_state: { type: String },
  expiration_date: { type: Date },
  taxonomy_code: [],
  npi: { type: String },
  tax_id: { type: String },
  billing_information: { type: String },
  fax: { type: String },
  firstLogin: { type: Date },
});
userSchema.statics.objectId = (id: any) => {
  return mongoose.Types.ObjectId(id);
}

const userModelMongo: any = mongoose.model<mongoose.Document>('im_user', userSchema);
userModelMongo.ROLE_CLINIC = 'AllergyClinic'
userModelMongo.ROLE_GROUP = 'group'
export default userModelMongo;
