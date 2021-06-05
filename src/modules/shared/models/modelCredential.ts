import BaseModel from "../../../base/model/BaseModel";

class CredentialModel extends BaseModel {
  static TABLE_NAME = "credentials";

  constructor(
    public entityId: string,
    public password: string,
    public userName: string,
    id?: string,
  ) {
    super(id);
  }

  static col(k: keyof CredentialModel, prefix = true): string {
    return prefix ? `${CredentialModel.TABLE_NAME}.${k}` : k;
  }
}

export default CredentialModel;
