import mongoose from "mongoose";
import validator from "validator";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [3, "Name must be at least 3 characters long"],
      maxlength: [50, "Name must be at most 50 characters long"],
    },
    username: {
      type: String,
      unique: true,
      required: [true, "Username is required"],
      minlength: [3, "Username must be at least 3 characters long"],
      maxlength: [30, "Username must be at most 30 characters long"],
      validate: {
        validator: function (v) {
          // Allow only alphanumeric and underscores
          return /^[a-zA-Z0-9_]+$/.test(v);
        },
        message: (props) =>
          `${props.value} is not a valid username! Only letters, numbers, and underscores are allowed.`,
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [5, "Password must be at least 5 characters long"],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
