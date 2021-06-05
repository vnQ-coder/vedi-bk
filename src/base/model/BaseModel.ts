abstract class BaseModel {
  created_at?: string;

  protected constructor(public id?: string) {}
}

export default BaseModel;
