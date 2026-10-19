import type { Metadata } from "next";
import Link from "next/link";
import { LogOut, RotateCcw } from "lucide-react";
import { AdminBookingRow } from "../../components/AdminBookingRow";
import { dictionaries } from "../../content/dictionaries";
import { BOOKING_STATUSES, STATUS_LABELS } from "../../lib/admin";
import { requireAdmin } from "../../lib/admin-auth";
import { applyFilters, hasActiveFilters, parseFilters, totals } from "../../lib/admin-filters";
import { readBookings } from "../../lib/bookings-store";
import { formatMmk, yangonToday } from "../../lib/format";
import { SERVICES } from "../../lib/services";
import { signOutAdmin } from "./actions";

export const metadata: Metadata = {
  title: "Bookings | Tidy Home admin",
  robots: { index: false, follow: false },
};

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const session = await requireAdmin();

  // The dashboard is staff-facing; English only, so the public locale cookie is ignored.
  const t = dictionaries.en;
  const filters = parseFilters(await searchParams);
  const bookings = await readBookings();
  const visible = applyFilters(bookings, filters);
  const today = yangonToday();
  const summary = totals(bookings, today);

  return (
    <div className="admin-shell">
      <header className="admin-header">
        <div className="container admin-header-inner">
          <div>
            <span className="eyebrow">Tidy Home admin</span>
            <h1>Bookings</h1>
          </div>
          <div className="admin-header-actions">
            <span className="admin-user">{session.email}</span>
            <Link className="btn btn-ghost btn-sm" href="/">
              View site
            </Link>
            <form action={signOutAdmin}>
              <button type="submit" className="btn btn-ghost btn-sm">
                <LogOut size={16} aria-hidden="true" />
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="container admin-main">
        <section className="admin-stats" aria-label="Summary">
          <div className="admin-stat">
            <span className="admin-stat-value">{summary.all}</span>
            <span className="admin-stat-label">All bookings</span>
          </div>
          {BOOKING_STATUSES.map((status) => (
            <div className="admin-stat" key={status}>
              <span className="admin-stat-value">{summary.byStatus[status]}</span>
              <span className="admin-stat-label">{STATUS_LABELS[status]}</span>
            </div>
          ))}
          <div className="admin-stat">
            <span className="admin-stat-value">{summary.upcoming}</span>
            <span className="admin-stat-label">Today or later</span>
          </div>
          <div className="admin-stat">
            <span className="admin-stat-value">{formatMmk(summary.quotedMmk)}</span>
            <span className="admin-stat-label">Quoted MMK</span>
          </div>
        </section>

        <form className="admin-filters" action="/admin" method="get">
          <div className="field">
            <label className="field-label" htmlFor="q">
              Search
            </label>
            <input
              id="q"
              name="q"
              className="field-input"
              defaultValue={filters.q}
              placeholder="Name, phone or TH-reference"
              maxLength={80}
            />
          </div>

          <div className="field">
            <label className="field-label" htmlFor="status">
              Status
            </label>
            <select id="status" name="status" className="field-input" defaultValue={filters.status}>
              <option value="all">All</option>
              {BOOKING_STATUSES.map((status) => (
                <option value={status} key={status}>
                  {STATUS_LABELS[status]}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label className="field-label" htmlFor="service">
              Service
            </label>
            <select id="service" name="service" className="field-input" defaultValue={filters.service}>
              <option value="all">All</option>
              {SERVICES.map((service) => (
                <option value={service.id} key={service.id}>
                  {t.services[service.id].name}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label className="field-label" htmlFor="from">
              Job date from
            </label>
            <input id="from" name="from" type="date" className="field-input" defaultValue={filters.from} />
          </div>

          <div className="field">
            <label className="field-label" htmlFor="to">
              to
            </label>
            <input id="to" name="to" type="date" className="field-input" defaultValue={filters.to} />
          </div>

          <div className="admin-filter-actions">
            <button type="submit" className="btn btn-primary btn-sm">
              Apply
            </button>
            {hasActiveFilters(filters) ? (
              <Link className="btn btn-ghost btn-sm" href="/admin">
                <RotateCcw size={16} aria-hidden="true" />
                Clear
              </Link>
            ) : null}
          </div>
        </form>

        <p className="admin-count">
          Showing {visible.length} of {bookings.length} {bookings.length === 1 ? "booking" : "bookings"}
        </p>

        {visible.length === 0 ? (
          <p className="admin-empty">
            {bookings.length === 0
              ? "No bookings yet. Requests from the public form appear here."
              : "No bookings match these filters."}
          </p>
        ) : (
          <div className="admin-list">
            {visible.map((booking) => (
              <AdminBookingRow booking={booking} t={t} key={booking.id} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
