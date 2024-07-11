import mongoose, { Schema, models } from "mongoose";

const DocumentSchema = new Schema(
  {
    descriptionID: {
      type: String,
      required: true,
    },
    descriptionEN: {
      type: String,
      required: true,
    },
    articleDate: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    selectType: {
      type: String,
      required: true,
    },
    fileDocument: {
      data: Buffer,
      contentType: String,
      name: String,
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const DocumentModel =
  mongoose.models.documents || mongoose.model("documents", DocumentSchema);
export default DocumentModel;
