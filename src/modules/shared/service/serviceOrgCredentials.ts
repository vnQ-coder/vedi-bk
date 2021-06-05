import { Transaction } from "knex";
import CredentialDao from "../dao/daoCredential";
import UnprocessableEntityError from "../errors/UnprocessableEntityError";
import CredentialModel from "../models/modelCredential";
import BcryptHashing from "./Bcrypt";

class OrgCredentialsService {
  static async checkAndUpdateEntityCredentials(
    trx: Transaction,
    userId: string,
    payload: Pick<CredentialModel, "userName"|"password">,
  ):Promise<void> {
    const orgCredentials = await new CredentialDao().findOneByCol(trx, "entityId", userId);

    if (orgCredentials.userName !== payload.userName) {
      if (!await new CredentialDao().existsByPredicate(trx, { userName: payload.userName })) {
        await new CredentialDao()
          .updateOneByColName(trx, { userName: payload.userName }, "entityId", userId);
      } else {
        throw new UnprocessableEntityError("The user with the username is already exists!");
      }
    }
    if (payload.password && payload.password.length) {
      await new CredentialDao()
        .updateOneByColName(trx, { password: await BcryptHashing.bcryptHash(payload.password) },
          "entityId", userId);
    }
  }

  static async checkUserExistsByUsernameAndPassword(
    trx: Transaction, username: string, password: string,
  ):Promise<CredentialModel|null> {
    const credentialModel = await new CredentialDao().getCredentialByUserName(trx, username);
    if (credentialModel) {
      if (!await BcryptHashing.bcryptCompare(password, credentialModel.password)) {
        return null;
      }
    }

    return credentialModel;
  }
}

export default OrgCredentialsService;
