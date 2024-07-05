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
    return NextResponse.json(
      { message: "An error occurred while fetching documents." },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const {
      descriptionID,
      descriptionEN,
      articeDate,
      category,
      selectType,
      createdAt,
    } = await req.json();
    await connectMongoDB();
    await DocumentModel.create({
      descriptionID,
      descriptionEN,
      articeDate,
      category,
      selectType,
      createdAt,
    });
    return NextResponse.json({ message: "Document Added" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while creating the document." },
      { status: 500 }
    );
  }
}
