"use client";

import { CheckCircle2, Phone } from "lucide-react";
import { useActionState, useState } from "react";
import { createBooking } from "../app/actions";
import { initialBookingState } from "../lib/booking";
import type { Dictionary } from "../content/dictionaries";
import { durationKey, earliestBookableDate, formatMmk } from "../lib/format";
import type { Locale } from "../lib/locale";
import { SERVICES, SHIFTS, formatStartHour, getService, isFixed } from "../lib/services";

export function BookingForm({ t, locale }: { t: Dictionary; locale: Locale }) {
  const [state, formAction, pending] = useActionState(createBooking, initialBookingState);

  const [serviceId, setServiceId] = useState<string>("general");
  const [duration, setDuration] = useState<string>("3");
  const [shift, setShift] = useState<string>("morning");
  // Derived, not synced in an effect: the confirmation shows after a successful
  // submit until the customer asks for a fresh form, which clears this flag.
  const [dismissed, setDismissed] = useState(false);
  const showConfirmation = state.status === "success" && !dismissed;

  const service = getService(serviceId) ?? SERVICES[0];
  const fixed = isFixed(service);
  const tiers = fixed ? service.pricing.tiers : null;
  const minDate = earliestBookableDate();
  const errors = state.fieldErrors ?? {};

  // A 7-hour job always starts at 9:00, so the two constrain each other.
  const eveningBlocked = duration === "7";
  const sevenHourBlocked = shift === "evening";

  if (showConfirmation) {
    const summary = state.summary;
    return (
      <div className="booking-panel confirmation">
        <span className="eyebrow">{t.booking.success.heading}</span>
        <h2>
          <CheckCircle2 size={32} aria-hidden="true" /> {t.booking.success.heading}
        </h2>

        <dl className="confirmation-list">
          <div className="confirmation-row">
            <dt>{t.booking.success.reference}</dt>
            <dd>{state.reference}</dd>
          </div>
          {summary ? (
            <>
              <div className="confirmation-row">
                <dt>{t.booking.success.service}</dt>
                <dd>{summary.serviceName}</dd>
              </div>
              <div className="confirmation-row">
                <dt>{t.booking.success.when}</dt>
                <dd>{summary.date}</dd>
              </div>
              <div className="confirmation-row">
                <dt>{t.booking.success.shift}</dt>
                <dd>{summary.shift}</dd>
              </div>
              {summary.duration ? (
                <div className="confirmation-row">
                  <dt>{t.booking.success.duration}</dt>
                  <dd>{summary.duration}</dd>
                </div>
              ) : null}
              {summary.surveyFee ? (
                <div className="confirmation-row">
                  <dt>{t.booking.success.survey}</dt>
                  <dd>{summary.surveyFee}</dd>
                </div>
              ) : null}
            </>
          ) : null}
        </dl>

        <p>
          {t.booking.success.phone} <strong>{state.summary?.phone}</strong>.
        </p>
        <p className="form-note">{t.booking.success.callNote}</p>

        <div className="form-actions">
          <a className="btn btn-primary" href="tel:+959264853450">
            <Phone size={18} aria-hidden="true" />
            {t.booking.success.close}
          </a>
          <button type="button" className="btn btn-ghost" onClick={() => setDismissed(true)}>
            {t.booking.success.another}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="booking-panel form-grid"
      noValidate
      onSubmit={() => setDismissed(false)}
    >
      <input type="hidden" name="locale" value={locale} />

      <div className="field">
        <label className="field-label" htmlFor="name">
          {t.booking.labels.name}
          <span className="req" aria-hidden="true">
            *
          </span>
        </label>
        <input
          id="name"
          name="name"
          className="field-input"
          placeholder={t.booking.placeholders.name}
          required
          minLength={2}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name ? (
          <p className="field-error" id="name-error">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div className="field">
        <label className="field-label" htmlFor="phone">
          {t.booking.labels.phone}
          <span className="req" aria-hidden="true">
            *
          </span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          inputMode="tel"
          className="field-input"
          placeholder={t.booking.placeholders.phone}
          required
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? "phone-error" : undefined}
        />
        {errors.phone ? (
          <p className="field-error" id="phone-error">
            {errors.phone}
          </p>
        ) : null}
      </div>

      <div className="field field-full">
        <label className="field-label" htmlFor="address">
          {t.booking.labels.address}
          <span className="req" aria-hidden="true">
            *
          </span>
        </label>
        <textarea
          id="address"
          name="address"
          className="field-input"
          rows={3}
          placeholder={t.booking.placeholders.address}
          required
          aria-invalid={Boolean(errors.address)}
          aria-describedby={errors.address ? "address-error" : "address-hint"}
        />
        {errors.address ? (
          <p className="field-error" id="address-error">
            {errors.address}
          </p>
        ) : (
          <p className="field-hint" id="address-hint">
            {t.booking.placeholders.address}
          </p>
        )}
      </div>

      <div className="field">
        <label className="field-label" htmlFor="serviceId">
          {t.booking.labels.service}
          <span className="req" aria-hidden="true">
            *
          </span>
        </label>
        <select
          id="serviceId"
          name="serviceId"
          className="field-input"
          value={serviceId}
          onChange={(event) => setServiceId(event.target.value)}
          required
        >
          {SERVICES.map((option) => (
            <option key={option.id} value={option.id}>
              {t.services[option.id].name}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label className="field-label" htmlFor="date">
          {t.booking.labels.date}
          <span className="req" aria-hidden="true">
            *
          </span>
        </label>
        <input
          id="date"
          name="date"
          type="date"
          className="field-input"
          min={minDate}
          required
          aria-invalid={Boolean(errors.date)}
          aria-describedby={errors.date ? "date-error" : undefined}
        />
        {errors.date ? (
          <p className="field-error" id="date-error">
            {errors.date}
          </p>
        ) : null}
      </div>

      {fixed && tiers ? (
        <div className="field">
          <label className="field-label" htmlFor="durationHours">
            {t.booking.labels.duration}
            <span className="req" aria-hidden="true">
              *
            </span>
          </label>
          <select
            id="durationHours"
            name="durationHours"
            className="field-input"
            value={duration}
            onChange={(event) => setDuration(event.target.value)}
            required
            aria-invalid={Boolean(errors.durationHours)}
            aria-describedby={errors.durationHours ? "duration-error" : undefined}
          >
            {tiers.map((tier) => (
              <option
                key={tier.hours}
                value={tier.hours}
                disabled={tier.hours === 7 && sevenHourBlocked}
              >
                {t.pricing.duration[durationKey(tier.hours)]} — {formatMmk(tier.mmk)}{" "}
                {t.pricing.currency}
              </option>
            ))}
          </select>
          {errors.durationHours ? (
            <p className="field-error" id="duration-error">
              {errors.durationHours}
            </p>
          ) : null}
        </div>
      ) : null}

      <fieldset className="field field-full">
        <legend className="field-label">
          {t.booking.labels.shift}
          <span className="req" aria-hidden="true">
            *
          </span>
        </legend>
        <div className="choice-group">
          {SHIFTS.map((option) => {
            const blocked = option.id === "evening" && eveningBlocked;
            return (
              <label key={option.id} className="choice">
                <input
                  type="radio"
                  name="shift"
                  value={option.id}
                  checked={shift === option.id}
                  disabled={blocked}
                  onChange={() => setShift(option.id)}
                />
                {option.id === "morning" ? t.shifts.morning : t.shifts.evening} ·{" "}
                {formatStartHour(option.startHour)}
              </label>
            );
          })}
        </div>
        {eveningBlocked ? (
          <p className="field-hint">{t.shifts.sevenHourOnlyMorning}</p>
        ) : (
          <p className="field-hint">{t.shifts.eveningEnds}</p>
        )}
        {errors.shift ? <p className="field-error">{errors.shift}</p> : null}
      </fieldset>

      {!fixed ? <p className="notice">{t.booking.surveyNotice}</p> : null}

      <div className="field field-full">
        <label className="field-label" htmlFor="notes">
          {t.booking.labels.notes}
        </label>
        <textarea
          id="notes"
          name="notes"
          className="field-input"
          rows={2}
          placeholder={t.booking.placeholders.notes}
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={pending}>
          {pending ? t.booking.submitting : t.booking.submit}
        </button>
        <p className="form-note">{t.booking.formNote}</p>
      </div>

      {state.status === "error" ? (
        <p className="field-error form-status" role="alert">
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
