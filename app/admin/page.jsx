import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import AdminList from "@/components/AdminList";

export default async function Register() {
  return <AdminList />;
}
