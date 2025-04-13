import { NextFunction, Request, Response } from "express";
import { User } from "../modles/userModel.js";
import { NewUserRequestBody, Params } from "../types/types.js";
import { invalidateCache } from "../utils/Revalidate.js";

export const newUser = async (
  req: Request<{}, {}, NewUserRequestBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, photo, gender, _id, dob, role } = req.body;
    let user = await User.findById(_id);
    if (user) {
      return res.status(200).json({
        success: true,
        message: `Welcome back ${user.name}`,
      });
    }

    if (!name || !email || !photo || !gender || !_id || !dob) {
      return next(new Error("Please Fill all fields"));
    }
    user = await User.create({
      name,
      email,
      photo,
      gender,
      _id,
      dob,
      role,
    });
    await invalidateCache({ admin: true });

    res.status(201).json({
      success: true,
      message: `Welcome ${user.name}`,
    });
  } catch (error) {
    return next(new Error("Meri error"));
  }
};

export const getAllUsers = async (
  req: Request<{}, {}, NewUserRequestBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find({});
    // console.log(users);
    return res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    return next(new Error("Error in getAllUser"));
  }
};

export const getUser = async (
  req: Request<Params, {}, NewUserRequestBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    const user = await User.findById(id);

    if (!user) {
      return res.status(200).json({
        success: false,
        message: "NO USER FOUND",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new Error("Error in getUser"));
  }
};

export const deleteUser = async (
  req: Request<Params, {}, NewUserRequestBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    const user = await User.findById(id);

    if (!user) {
      return res.status(200).json({
        success: false,
        message: "NO USER FOUND",
      });
    }
    await user.deleteOne();
    await invalidateCache({ admin: true });

    return res.status(200).json({
      success: true,
      message: "User Deleted Successfully",
    });
  } catch (error) {
    return next(new Error("Error in getUser"));
  }
};
