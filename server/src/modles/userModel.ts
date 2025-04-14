import mongoose, { Schema } from "mongoose";
import validator from "validator";


interface Iuser extends Document {
  _id: String;
  name: String;
  email: String;
  photo: String;
  role: "user" | "admin";
  gender: "male" | "female";
  dob: Date;
  createdAt: Date;
  updatedAt: Date;

  //Virtual Attribute
  age: number;
}
const userschema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: [true, "Please enter ID"],
    },
    name: {
      type: String,
      required: [true, "Please Enter Name"],
    },
    email: {
      type: String,
      unique: [true, "Email already in use"],
      validate: validator.default.isEmail,
    },
    photo: {
      type: String,
      required: [true, "Please add photo"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: [true, "Enter your Gender"],
    },
    dob: {
      type: Date,
      required: [true, "Enter Your Date Of birth"],
    },
  },
  {
    timestamps: true,
  }
);

userschema.virtual("age").get(function(){
  const today=new Date();
  const dob=this.dob
  let age:number=today.getFullYear()-dob.getFullYear();
  if(today.getMonth()<dob.getMonth() || today.getMonth()===dob.getMonth() && today.getDate()<dob.getDate()){
    age--;
  }

  return age;
})

export const User = mongoose.model<Iuser>("User", userschema);
