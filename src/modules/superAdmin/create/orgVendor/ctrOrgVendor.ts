import { NextFunction, Request, Response } from "express";
import { Transaction } from "knex";
import knex from "../../../../base/database/knex";
import MessageModel, { MessageWithDataModel } from "../../../shared/models/response/modelRespMessage";
import { FiltersType } from "../../../shared/types/sharedTypes";
import { OrgVendorRegRequestType } from "../../shared/types/OrgTypes";
import OrgVendorService from "./srvOrgVendor";

class OrgVendorCtr {
  // POST:
  static async addOrgVendor(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      await knex.transaction(async (trx: Transaction): Promise<void> => {
        const entityId = await OrgVendorService.addOrgVendor(trx, req.body);
        res.json(new MessageWithDataModel("The organization has been created successfully", { entityId }));
      });
    } catch (e) {
      next(e);
    }
  }

  // POST:EntityId
  static async updateOrgVendor(
    req: Request<{entityId: string}>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      await knex.transaction(async (trx: Transaction): Promise<void> => {
        await OrgVendorService.updateOrgVendor(trx, req.params.entityId, req.body);
        res.json(new MessageModel("The organization has been update successfully"));
      });
    } catch (e) {
      next(e);
    }
  }

  static async getOrgVendors(
    req: Request,
    res: Response<OrgVendorRegRequestType[]>,
    next: NextFunction,
  ): Promise<void> {
    try {
      await knex.transaction(async (trx: Transaction): Promise<void> => {
        res.json(await OrgVendorService.getOrgVendors(trx, req.query as any as FiltersType));
      });
    } catch (e) {
      next(e);
    }
  }

  static async getOrgVendorByEntity(
    req: Request,
    res: Response<OrgVendorRegRequestType>,
    next: NextFunction,
  ): Promise<void> {
    try {
      await knex.transaction(async (trx: Transaction): Promise<void> => {
        res.json(await OrgVendorService.getOrgVendorByEntity(trx, req.params.entityId));
      });
    } catch (e) {
      next(e);
    }
  }

  static async deleteOrgVendor(
    req: Request<{entityId: string}>,
    res: Response<MessageModel>,
    next: NextFunction,
  ): Promise<void> {
    try {
      await knex.transaction(async (trx: Transaction): Promise<void> => {
        await OrgVendorService.deleteOrg(trx, req.params.entityId);
        res.json(new MessageModel("The organization has been deleted"));
      });
    } catch (e) {
      next(e);
    }
  }
}

export default OrgVendorCtr;
