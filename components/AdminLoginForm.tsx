"use client";

import { LogIn } from "lucide-react";
import { useActionState } from "react";
import { signInAdmin } from "../app/admin/actions";
import { initialAdminLoginState } from "../lib/admin";

export function AdminLoginForm() {
  const [state, formAction, pending] = useActionState(signInAdmin, initialAdminLoginState);

  return (
    <form action={formAction} className="admin-login-card" noValidate>
      <span className="eyebrow">Tidy Home</span>
      <h1>Admin sign in</h1>
      <p className="admin-login-lede">Bookings are staff-only. Customers never need an account.</p>

      {state.status === "error" ? (
        <p className="admin-alert" role="alert">
          {state.message}
        </p>
      ) : null}

      <div className="field field-full">
        <label className="field-label" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          className="field-input"
          placeholder="admin@example.com"
          required
        />
      </div>

      <div className="field field-full">
        <label className="field-label" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          className="field-input"
          required
        />
      </div>

      <button type="submit" className="btn btn-primary" disabled={pending}>
        <LogIn size={18} aria-hidden="true" />
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
