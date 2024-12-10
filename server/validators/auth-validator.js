const { z } = require("zod");

const signUpSchema = z.object({
  userName: z
    .string({ required_error: "UserName is Required" })
    .trim()
    .min(3, { message: "UserName must be at least 3 characters" })
    .max(255, { message: "UserName must not be more than 255 characters" }),

  email: z
    .string({ required_error: "Email is Required" })
    .trim()
    .email({ message: "Invalid Email Address" })
    .min(3, { message: "Email must be at least 3 characters" })
    .max(255, { message: "Email must not be more than 255 characters" }),

  password: z
    .string({ required_error: "Password is Required" })
    .trim()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(12, { message: "Password must not be more than 12 characters" }),

  status: z
    .string({ required_error: "Status is Required" })
    .nonempty({ message: "Status cannot be empty" }), 
});

module.exports = { signUpSchema };
