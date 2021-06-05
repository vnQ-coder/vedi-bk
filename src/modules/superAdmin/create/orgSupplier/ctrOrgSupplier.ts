import { NextFunction, Request, Response } from "express";
import { Transaction } from "knex";
import knex from "../../../../base/database/knex";
import MessageModel, { MessageWithDataModel } from "../../../shared/models/response/modelRespMessage";
import { FiltersType } from "../../../shared/types/sharedTypes";
import { OrgSupplierRegRequestType } from "../../shared/types/OrgTypes";
import OrgSupplierService from "./srvOrgSupplier";

class OrgSupplierCtr {
  // POST:
  static async addOrgSupplier(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      await knex.transaction(async (trx: Transaction): Promise<void> => {
        const payload = req.body as OrgSupplierRegRequestType;
        const data = await OrgSupplierService.addOrgSupplier(trx, payload);
        res.json(new MessageWithDataModel("The organization has been created successfully", data));
      });
    } catch (e) {
      next(e);
    }
  }

  // GET
  static async getOrgSuppliers(
    req: Request,
    res: Response<OrgSupplierRegRequestType[]>,
    next: NextFunction,
  ): Promise<void> {
    try {
      await knex.transaction(async (trx: Transaction): Promise<void> => {
        res.json(await OrgSupplierService.getOrgSuppliers(trx, req.query as any as FiltersType));
      });
    } catch (e) {
      next(e);
    }
  }

  // POST:EntityId
  static async updateOrgSupplier(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const params = req.params as {entityId: string, userId: string};
      await knex.transaction(async (trx: Transaction): Promise<void> => {
        await OrgSupplierService.updateOrgSupplier(trx, params.entityId, req.body);
        res.json(new MessageModel("The organization has been updated successfully"));
      });
    } catch (e) {
      next(e);
    }
  }

  static async deleteOrgSupplier(
    req: Request<{entityId: string}>,
    res: Response<MessageModel>,
    next: NextFunction,
  ): Promise<void> {
    try {
      await knex.transaction(async (trx: Transaction): Promise<void> => {
        await OrgSupplierService.deleteOrg(trx, req.params.entityId);
        res.json(new MessageModel("The organization has been deleted"));
      });
    } catch (e) {
      next(e);
    }
  }

  static async getOrgSupplierByEntity(
    req: Request<{entityId: string}>,
    res: Response<OrgSupplierRegRequestType>,
    next: NextFunction,
  ): Promise<void> {
    try {
      await knex.transaction(async (trx: Transaction): Promise<void> => {
        res.json(await OrgSupplierService.getOrgSupplierByEntity(trx, req.params.entityId));
      });
    } catch (e) {
      next(e);
    }
  }
}

export default OrgSupplierCtr;
