import mongoose, { Schema, models } from "mongoose";

const DocumentSchema = new mongoose.Schema(
  {
    descriptionID: String,
    descriptionEN: String,
    fileDocument: {
      data: Buffer,
      contentType: String,
      name: String,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
    articleDate: String,
    category: String,
    selectType: String,
  },
  {
    timestamps: true,
  }
);

const DocumentModel =
  models.DocumentModel || mongoose.model("document", DocumentSchema);
module.exports = DocumentModel;
