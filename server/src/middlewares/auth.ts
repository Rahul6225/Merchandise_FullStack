import { NextFunction, Request, Response } from "express";
import { NewUserRequestBody, Params } from "../types/types.js";
import { User } from "../modles/userModel.js";

export const adminOnly = async (
  req: Request<Params, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {

    const {id}=req.query;

    if(!id){
        return next(new Error("Bhai Phle Login Karr le"));
    }

    const user =await User.findById(id);

    if(!user){
        return next(new Error("Id galat hai bhai"));
    }
     if (user.role !=="admin") {
       return next(new Error("Sorry Only Admin has access to this task"));
     }

     next();
  } catch (error) {
      return next(new Error("Error in adminOnly"));

  }
};
