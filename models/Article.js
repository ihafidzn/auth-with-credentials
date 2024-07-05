import mongoose, { Schema, models } from "mongoose";

const ArticleSchema = new Schema({
  titleID: {
    type: String,
    required: true,
  },
  titleEN: {
    type: String,
    required: true,
  },
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
  imageCover: {
    type: String,
    required: true,
  },
});

const ArticleModel =
  models.ArticleModel || mongoose.model("articles", ArticleSchema);
export default ArticleModel;
