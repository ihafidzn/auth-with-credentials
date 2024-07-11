import { connectMongoDB } from "@/lib/mongodb";
import ArticleModel from "@/models/Article";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("Received Payload:", body);
    const {
      titleID,
      titleEN,
      descriptionID,
      descriptionEN,
      articleDate,
      category,
      imageCover,
    } = body;
    await connectMongoDB();
    const article = await ArticleModel.create({
      titleID,
      titleEN,
      descriptionID,
      descriptionEN,
      articleDate,
      category,
      imageCover,
    });

    return NextResponse.json(
      { message: "Article created.", article },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating article:", error);
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
    console.error("Error fetching articles:", error.message);
    return NextResponse.json(
      {
        message: "An error occurred while fetching articles.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { message: "ID is required to delete the article." },
        { status: 400 }
      );
    }

    await connectMongoDB();
    const result = await ArticleModel.findByIdAndDelete(id);

    if (!result) {
      return NextResponse.json(
        { message: "Article not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Article deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting article:", error);
    return NextResponse.json(
      { message: "An error occurred while deleting the article." },
      { status: 500 }
    );
  }
}
