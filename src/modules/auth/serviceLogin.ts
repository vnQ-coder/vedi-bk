import { Transaction } from "knex";
import EntityDao from "../shared/dao/daoEntity";
import OrgCredentialsService from "../shared/service/serviceOrgCredentials";
import { LoginAuthenticationType, LoginBodyType } from "../shared/types/authTypes";

const login = async (
  trx: Transaction,
  body: LoginBodyType,
): Promise<LoginAuthenticationType> => {
  let isAuthenticated = false;
  let entityId = "";
  let entityType = "";

  const credentialExists = await OrgCredentialsService.checkUserExistsByUsernameAndPassword(
    trx,
    body.userName,
    body.password,
  );

  if (credentialExists) {
    isAuthenticated = true;
    entityId = credentialExists.entityId;
    const type = await new EntityDao().findOneByCol(
      trx,
      "id",
      entityId,
      "type",
    );
    entityType = type.type;
  }

  return { isAuthenticated, entityId, entityType };
};

export default login;
