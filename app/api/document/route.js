// pages/api/documents.js
import { connectMongoDB } from "@/lib/mongodb";
import DocumentModel from "@/models/Document";
import { NextResponse } from "next/server";

// Handler for GET requests to retrieve documents
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

// Handler for POST requests to create a new document
export async function POST(req) {
  try {
    const data = await req.json();
    await connectMongoDB();
    const newDocument = await DocumentModel.create(data);
    return NextResponse.json(newDocument, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while creating the document." },
      { status: 500 }
    );
  }
}
