import { STATUS_LABELS, STATUS_TRANSITIONS, type Booking } from "../lib/admin";
import { updateBookingStatus } from "../app/admin/actions";
import type { Dictionary } from "../content/dictionaries";
import { formatMmk } from "../lib/format";
import { SHIFTS, formatEndHour, formatStartHour } from "../lib/services";

function shiftLabel(booking: Booking, t: Dictionary): string {
  const shift = SHIFTS.find((s) => s.id === booking.shift);
  if (!shift) return booking.shift;

  const name = booking.shift === "morning" ? t.shifts.morning : t.shifts.evening;
  const window = booking.durationHours
    ? `${formatStartHour(shift.startHour)}–${formatEndHour(shift.startHour, booking.durationHours)}`
    : formatStartHour(shift.startHour);
  return `${name} · ${window}`;
}

function priceLabel(booking: Booking, t: Dictionary): string {
  if (booking.quotedPriceMmk !== null) return `${formatMmk(booking.quotedPriceMmk)} ${t.pricing.currency}`;
  if (booking.surveyFeeMmk !== null) {
    return `${t.pricing.surveyFee}: ${formatMmk(booking.surveyFeeMmk)} ${t.pricing.currency}`;
  }
  return "—";
}

export function AdminBookingRow({ booking, t }: { booking: Booking; t: Dictionary }) {
  return (
    <article className={`admin-booking status-${booking.status}`}>
      <header className="admin-booking-head">
        <div>
          <span className="admin-ref">{booking.reference}</span>
          <h3>{booking.name}</h3>
          <a className="admin-phone" href={`tel:${booking.phone}`}>
            {booking.phone}
          </a>
        </div>
        <span className={`admin-status admin-status-${booking.status}`}>
          {STATUS_LABELS[booking.status]}
        </span>
      </header>

      <dl className="admin-booking-grid">
        <div>
          <dt>Service</dt>
          <dd>{t.services[booking.serviceId].name}</dd>
        </div>
        <div>
          <dt>Date</dt>
          <dd>{booking.date}</dd>
        </div>
        <div>
          <dt>Shift</dt>
          <dd>{shiftLabel(booking, t)}</dd>
        </div>
        <div>
          <dt>Duration</dt>
          <dd>{booking.durationHours ? `${booking.durationHours}h` : "Survey first"}</dd>
        </div>
        <div>
          <dt>Price</dt>
          <dd>{priceLabel(booking, t)}</dd>
        </div>
        <div>
          <dt>Booked</dt>
          <dd>{booking.createdAt.slice(0, 16).replace("T", " ")}</dd>
        </div>
        <div className="admin-booking-wide">
          <dt>Address</dt>
          <dd>{booking.address}</dd>
        </div>
        {booking.busStop || booking.busLines ? (
          <div className="admin-booking-wide">
            <dt>Bus</dt>
            <dd>{[booking.busStop, booking.busLines].filter(Boolean).join(" · ")}</dd>
          </div>
        ) : null}
        {booking.notes ? (
          <div className="admin-booking-wide">
            <dt>Notes</dt>
            <dd>{booking.notes}</dd>
          </div>
        ) : null}
      </dl>

      <footer className="admin-booking-actions">
        {STATUS_TRANSITIONS[booking.status].map((next) => (
          <form action={updateBookingStatus} key={next}>
            <input type="hidden" name="id" value={booking.id} />
            <input type="hidden" name="status" value={next} />
            <button
              type="submit"
              className={`btn btn-sm ${next === "cancelled" ? "btn-danger" : "btn-ghost"}`}
            >
              Mark {STATUS_LABELS[next].toLowerCase()}
            </button>
          </form>
        ))}
        {booking.statusUpdatedAt ? (
          <span className="admin-updated">
            updated {booking.statusUpdatedAt.slice(0, 16).replace("T", " ")}
          </span>
        ) : null}
      </footer>
    </article>
  );
}
