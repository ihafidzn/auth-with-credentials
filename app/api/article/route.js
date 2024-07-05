import { connectMongoDB } from "@/lib/mongodb";
import ArticleModel from "@/models/Article";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const {
      titleID,
      titleEN,
      descriptionID,
      descriptionEN,
      articleDate,
      category,
      imageCover,
    } = await req.json();
    await connectMongoDB();
    await ArticleModel.create({
      titleID,
      titleEN,
      descriptionID,
      descriptionEN,
      articleDate,
      category,
      imageCover,
    });

    return NextResponse.json({ message: "Article created." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while creating the article." },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    await connectMongoDB();
    const articles = await ArticleModel.find({});
    return NextResponse.json(articles, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while fetching articles." },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const { id } = await req.json();
    await connectMongoDB();
    const article = await ArticleModel.findByIdAndDelete(id);

    if (!article) {
      return NextResponse.json(
        { message: "Article not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Article deleted." }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while deleting the article." },
      { status: 500 }
    );
  }
}
