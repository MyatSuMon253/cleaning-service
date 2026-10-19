import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminLoginForm } from "../../../components/AdminLoginForm";
import { getAdminSession } from "../../../lib/admin-auth";

export const metadata: Metadata = {
  title: "Admin sign in | Tidy Home",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  if (await getAdminSession()) redirect("/admin");

  return (
    <main className="admin-login">
      <AdminLoginForm />
    </main>
  );
}
