import { Request, RequestHandler } from "express";
import { User } from "@prisma/client";

export type AuthorizedRequest = Request & { user: User };

const isAuthenticated: RequestHandler = async (req, res, next) => {
  try {
    assertUser(req);
    next();
  } catch (error: any) { 
    res.status(401).send(error.message);
  }
};

function assertUser(req: Request): asserts req is AuthorizedRequest {
  if (!req.user) throw new Error("Unauthorized");
}

export default isAuthenticated;