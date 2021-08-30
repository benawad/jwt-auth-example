import { Request, Response } from "express";
import { User } from "./entity/User";

export interface MyContext {
  req: Request;
  res: Response;
  payload?: User;
}
