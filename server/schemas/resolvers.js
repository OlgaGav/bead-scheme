const { User, Draw } = require("../models");
const { ObjectId } = require("mongodb");
const { signToken } = require("../utils/auth");
const { GraphQLError } = require("graphql");
const bcrypt = require("bcrypt");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const resolvers = {
  Query: {
    users: async () => {
      return User.find({});
    },
    draws: async () => {
      return Draw.find({});
    },
    userById: async (parent, args) => {
      const user = await User.find({
        _id: args.id,
      });
      // DEBUG
      console.log(user);
      //return user;
      return user ? user : null;
    },
    drawById: async (parent, args) => {
      const draw = await Draw.find({
        _id: args.id,
      });
      // DEBUG
      console.log(draw);
      //return draw;
      return draw ? draw : null;
    },
    allUserDraws: async (parent, { userId }, context) => {
      // Validate input
      if (!ObjectId.isValid(userId)) {
        throw new Error("Invalid user ID");
      }

      // Query the database for draws associated with the user ID
      const draws = await Draw.find({ user: userId }).populate("author");

      // Return the emails as an array
      return draws ? draws : [];
    },
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new GraphQLError("No user found with this email address", {
          extensions: { code: "NO_USER_FOUND" },
        });
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new GraphQLError(
          "Email/password combination incorrect. Please try again.",
          {
            extensions: { code: "INCORRECT_CREDENTIALS" },
          }
        );
      }

      const token = signToken(user);

      return { token, user: user };
    },

    addUser: async (
      parent,
      { first_name, last_name, phone_number, email, password }
    ) => {
      try {
        const user = await User.create({
          first_name,
          last_name,
          phone_number,
          email,
          password,
        });
        const token = signToken(user);
        return { token: token, user: user };
      } catch (err) {
        // Check for email that's already in use.
        console.log(err.message.includes("duplicate"));
        if (err.message.includes("duplicate")) {
          throw new GraphQLError(
            "Email already in use, please use another email.",
            {
              extensions: { code: "NO_USER_FOUND" },
            }
          );
        }
        console.error(err);
        return err;
      }
    },

    updateUser: async (parent, args, context) => {
      // Extract the ID and fields to update from the input arguments
      const { id, ...fields } = args;

      let updatedSalesPerson;

      if ("password" in args) {
        const saltRounds = 10;
        const newPass = await bcrypt.hash(args.password, saltRounds);
        fields.password = newPass;

        updatedUser = await User.findByIdAndUpdate(
          id,
          fields,
          { new: true } // Return the updated document
        );

        const token = signToken(updatedUser);
        return { token: token, user: updatedUser };
      } else {
        // Update the salesperson in the database
        updatedUser = await User.findByIdAndUpdate(
          id,
          fields,
          { new: true } // Return the updated document,
        );
      }

      const token = signToken(updatedUser);
      return { token: token, user: updatedUser };
    },

    addDraw: async (parent, { name, content, author }) => {
      // DEBUG
      console.log("addDraw: ", name, content, author);
      const draw = new Draw({
        name,
        content,
        author,
      });

      try {
        await draw.save();
        return draw.populate("author");
      } catch (err) {
        console.error(err);
        return null;
      }
    },

    updateDraw: async (parent, args, context) => {
      const { id, ...fields } = args;
      const updatedDraw = findOneAndUpdate(id, fields, { new: true });
      return updatedDraw;
    },

    deleteDraw: async (parent, { drawId }) => {
      // delete draw

      const deletedDraw = await Email.deleteOne({
        id: drawId,
      });
      if (deletedDraw.deletedCount === 1) {
        return {
          success: true,
          message: "Draw deleted successfully",
        };
      } else {
        return {
          success: false,
          message: "Could not delete draw",
        };
      }
    },
  },
};

module.exports = resolvers;
