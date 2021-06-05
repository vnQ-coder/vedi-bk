import BaseModel from "../../../../../base/model/BaseModel";

class UserPersonalInformationModel extends BaseModel {
  static TABLE_NAME = "user_personal_information";

  constructor(
    public entityId: string,
    public type: string,
    public birthday: string,
    public notes: string,
    public jobTitle: string,
    public mobilePhone: string,
    public webAddress: string,
    id?: string
  ) {
    super(id);
  }

  static col(k: keyof UserPersonalInformationModel, prefix = true): string {
    return prefix ? `${UserPersonalInformationModel.TABLE_NAME}.${k}` : k;
  }
}

export default UserPersonalInformationModel;
