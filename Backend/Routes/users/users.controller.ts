import { Request, Response } from "express";
import Users from "../users/users.modal";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { loginInterface, registerInterface } from "../../Interfaces/interfaces";

const UserController = {
  SignUp: async (req: Request, res: Response) => {
    try {
      const { name, email, password }:registerInterface = req.body;
      const isUserExists = await Users.findOne({ email: email }).exec();

      if (isUserExists) {
        return res.status(401).json({
          success: false,
          message: "User Already Exists",
        });
      }

      const encrypt_password = await bcrypt.hash(password, 10);
      const access_token = crypto.randomBytes(30).toString("hex");
      let newUser
      newUser = new Users({
        name: name,
        email: email,
        password: encrypt_password,
        access_token,
      })

      await newUser.save();

      return res.status(200).json({
        success: true,
        message: "User Register successful",
      });
    } catch (err: any) {
      return res.status(500).json({
        success: false,
        message: "network error",
      });
    }
  },

  login: async (req: Request, res: Response) => {
    try {
      const { email, password }:loginInterface = req.body;
      console.log(req.body)

      const user = await Users.findOne({ email: email }).exec();
      
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "email and password are not correct",
        });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: "email and password are not correct",
        });
      }

      const token = crypto.randomBytes(30).toString("hex");

      return res.status(200 ).json({
        success: true,
        message: "user login success",
        token,
      });
    } catch (err: any) {
      return res.status(500).json({
        success: false,
        message: "network error",
      });
    }
  },

  users: async (req:Request, res:Response) => {
    try{
      const user = await Users.find().exec();

      return res.status(200 ).json({
        success: true,
        message: "all users fetched",
        user,
      });

    }
    catch(e){
      console.error(e);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },

  deleteUser:async(req:Request, res:Response)=>{
    try{
      const userId = req.params.id;
      console.log("user id",userId)
      const deletedUser = await Users.findByIdAndDelete(userId).exec();
     
      if (!deletedUser) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }
      return res.status(200).json({
        success: true,
        message: 'User deleted successfully',
        user: deletedUser,
      });
    }
    catch (err) {
      return res.status(500).json({
        success: false,
        message: 'Failed to delete user',
        error: err,
      });
    }
  }
}

export default UserController;
