// pages/api/documents.js
import { connectMongoDB } from "@/lib/mongodb";
import DocumentModel from "@/models/Document";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectMongoDB();
    const documents = await DocumentModel.find({});
    return NextResponse.json(documents, { status: 200 });
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

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("Received Payload:", body);
    const {
      descriptionID,
      descriptionEN,
      articeDate,
      category,
      selectType,
      createdAt,
      fileDocument,
    } = body();
    await connectMongoDB();
    const document = await DocumentModel.create({
      descriptionID,
      descriptionEN,
      articeDate,
      category,
      selectType,
      createdAt,
      fileDocument: {
        data: Buffer.from(await fileDocument.arrayBuffer()),
        contentType: fileDocument.type,
        name: fileDocument.name,
        type: fileDocument.type,
      },
    });

    return NextResponse.json(
      { message: "Article created.", document },
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

export async function DELETE(req) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { message: "ID is required to delete the document." },
        { status: 400 }
      );
    }

    await connectMongoDB();
    const result = await DocumentModel.findByIdAndDelete(id);

    if (!result) {
      return NextResponse.json(
        { message: "Document not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Document deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting document:", error);
    return NextResponse.json(
      { message: "An error occurred while deleting the document." },
      { status: 500 }
    );
  }
}
