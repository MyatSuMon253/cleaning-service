"use client";

import Image from "next/image";
import { useActionState } from "react";
import { ArrowDown, ArrowRight, Check, Clock3, Heart, Leaf, Menu, ShieldCheck, Sparkles, Star } from "lucide-react";
import { createBooking, type BookingState } from "./actions";

const initialState: BookingState = { message: "", success: false };

const services = [
  { number: "01", name: "The regular", text: "A lovely weekly or fortnightly reset. Fresh floors, sparkling surfaces, and a home that feels like yours again.", price: "from $89", image: "photo-1600210492486-724fe5c67fb0", tag: "MOST LOVED" },
  { number: "02", name: "The deep clean", text: "Every nook, every corner. The top-to-bottom refresh for when your home needs a little extra love.", price: "from $169", image: "photo-1600607687939-ce8a6c25118c", tag: "A FRESH START" },
  { number: "03", name: "Moving day", text: "Leave the old place spotless or make the new one feel like home before the boxes arrive.", price: "from $229", image: "photo-1600566753086-00f18fb6b3ea", tag: "MOVE IN / OUT" },
];

const transformations = [
  { title: "The kitchen reset", room: "A little shine goes a long way", before: "photo-1556911220-bff31c812dba", after: "photo-1600607687920-4e2a09cf159d" },
  { title: "The living room lift", room: "Made for slow Sunday mornings", before: "photo-1600210492486-724fe5c67fb0", after: "photo-1600607687939-ce8a6c25118c" },
];

function BookingForm() {
  const [state, formAction, pending] = useActionState(createBooking, initialState);
  const today = new Date().toISOString().slice(0, 10);

  return (
    <form action={formAction} className="booking-form">
      <div className="form-heading"><span className="eyebrow">LET’S GET YOU BOOKED</span><h3>Your home called.</h3><p>We can be there soon.</p></div>
      <label>Your name<input name="name" placeholder="Jamie Taylor" required minLength={2} /></label>
      <div className="form-row">
        <label>Email address<input name="email" type="email" placeholder="you@example.com" required /></label>
        <label>Phone number<input name="phone" type="tel" placeholder="(555) 123-4567" required /></label>
      </div>
      <div className="form-row">
        <label>Choose your clean<select name="service" defaultValue="" required><option value="" disabled>Select a service</option><option value="regular">The regular — from $89</option><option value="deep">The deep clean — from $169</option><option value="move">Moving day — from $229</option><option value="office">Office cleaning — custom quote</option></select></label>
        <label>Home size<select name="homeSize" defaultValue="" required><option value="" disabled>Choose size</option><option value="studio">Studio</option><option value="one">1 bedroom</option><option value="two">2 bedrooms</option><option value="three">3 bedrooms</option><option value="four">4+ bedrooms</option></select></label>
      </div>
      <label>Preferred date<input name="date" type="date" min={today} required /></label>
      <button className="button button-dark submit-button" type="submit" disabled={pending}>{pending ? "Saving your request…" : "Request my clean"}<ArrowRight size={17} /></button>
      <p className="form-note"><ShieldCheck size={14} /> No payment needed to request a booking.</p>
      <div className={`form-status ${state.success ? "is-success" : ""}`} aria-live="polite">{state.message}</div>
    </form>
  );
}

export default function Home() {
  return (
    <main>
      <div className="announcement"><Sparkles size={14} /> A brighter home is just around the corner <a href="#booking">Get 15% off your first clean <ArrowRight size={13} /></a></div>
      <header className="site-header"><a className="brand" href="#top" aria-label="Tidy Home home"><span className="brand-mark"><Sparkles size={17} /></span>tidy<span>home</span></a><nav className="desktop-nav"><a href="#services">Our services</a><a href="#difference">Why Tidy</a><a href="#results">The results</a><a href="#pricing">Pricing</a></nav><a className="header-cta" href="#booking">Book a clean <ArrowRight size={15} /></a><button className="mobile-menu" aria-label="Open menu"><Menu size={22} /></button></header>

      <section className="hero" id="top"><div className="hero-copy"><div className="eyebrow"><span className="eyebrow-line" /> YOUR HOME, A LITTLE HAPPIER</div><h1>A little lighter.<br /><em>A lot brighter.</em></h1><p className="hero-lede">Thoughtful home cleaning for the life you actually live. Come home to the good feeling.</p><div className="hero-actions"><a href="#booking" className="button button-dark">Find your clean <ArrowRight size={16} /></a><a href="#services" className="text-link">See what we do <ArrowDown size={15} /></a></div><div className="hero-proof"><div className="avatar-stack"><span>J</span><span>M</span><span>A</span><span>+</span></div><div><div className="stars"><Star /><Star /><Star /><Star /><Star /></div><small>Loved by 2,400+ happy homes</small></div></div></div><div className="hero-visual"><Image src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85" alt="Sunlit, freshly cleaned living room" fill priority unoptimized sizes="(max-width: 800px) 100vw, 55vw" /><div className="image-caption"><span className="caption-sparkle"><Sparkles size={15} /></span><div><strong>That just-cleaned feeling</strong><small>We know it. We love it.</small></div></div><div className="hero-note"><span>01</span><span>GOOD THINGS<br />HAPPEN HERE</span></div></div></section>

      <div className="trust-strip"><span>GOOD PEOPLE. GOOD CLEAN.</span><div><ShieldCheck /> Vetted & insured</div><div><Leaf /> Thoughtful products</div><div><Clock3 /> On your time</div><div><Heart /> Made for real life</div></div>

      <section className="section services-section" id="services"><div className="section-heading"><div><div className="eyebrow">A CLEAN FOR EVERY KIND OF DAY</div><h2>What does your home<br />need <em>today?</em></h2></div><p>From the everyday tidy-up to the once-in-a-while deep breath. We’ll meet your home where it is.</p></div><div className="service-grid">{services.map((service) => <article className="service-card" key={service.number}><div className="service-image"><Image src={`https://images.unsplash.com/${service.image}?auto=format&fit=crop&w=900&q=80`} alt={service.name} fill unoptimized sizes="(max-width: 700px) 100vw, 33vw" /><span className="service-tag">{service.tag}</span><span className="service-number">{service.number}</span></div><div className="service-body"><div className="service-title-row"><h3>{service.name}</h3><span>{service.price}</span></div><p>{service.text}</p><a href="#booking" className="card-link">Let’s talk about it <ArrowRight size={15} /></a></div></article>)}</div><div className="service-footnote">Looking after a workspace? <a href="#booking">Ask us about office cleaning <ArrowRight size={14} /></a></div></section>

      <section className="offer-band"><div className="offer-icon"><Sparkles size={24} /></div><div><span>GOOD THINGS START HERE</span><h2>A little welcome gift, on us.</h2><p>Take 15% off your very first clean. Use <strong>HELLOTIDY</strong> when you book.</p></div><a href="#booking" className="button button-light">Claim your 15% <ArrowRight size={16} /></a><div className="offer-orbit orbit-one" /><div className="offer-orbit orbit-two" /></section>

      <section className="section difference-section" id="difference"><div className="difference-image"><Image src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85" alt="Warm, calm living room after a tidy home clean" fill unoptimized sizes="(max-width: 800px) 100vw, 48vw" /><div className="round-stamp"><span>GOOD FOR<br />YOUR HOME</span><Leaf size={20} /><span>GENTLER BY<br />NATURE</span></div></div><div className="difference-copy"><div className="eyebrow">MORE THAN JUST A TIDY ROOM</div><h2>Care is in<br /><em>the details.</em></h2><p className="difference-intro">We believe a clean home should feel good in every sense. That means lovely people, considered products, and little things done right.</p><div className="promise-list"><div><span><Check size={15} /></span><p><strong>People you can feel good about</strong>Every cleaner is carefully vetted, fairly paid, and covered.</p></div><div><span><Check size={15} /></span><p><strong>Gentler by nature</strong>Thoughtful products chosen with your home and the planet in mind.</p></div><div><span><Check size={15} /></span><p><strong>Your time, treated with care</strong>Easy online booking, clear arrival windows, no guesswork.</p></div></div><a href="#booking" className="text-link">Meet your new favorite cleaners <ArrowRight size={15} /></a></div></section>

      <section className="results-section" id="results"><div className="section results-inner"><div className="section-heading results-heading"><div><div className="eyebrow">A LITTLE LOOK AT THE MAGIC</div><h2>Same home.<br /><em>New feeling.</em></h2></div><p>We take care of the little things, so you can get back to the big ones. Here’s what a little Tidy love looks like.</p></div><div className="transform-grid">{transformations.map((item, index) => <article className="transform-card" key={item.title}><div className="transform-images"><div><Image src={`https://images.unsplash.com/${item.before}?auto=format&fit=crop&w=750&q=80`} alt={`${item.title} before cleaning`} fill unoptimized sizes="(max-width: 700px) 50vw, 25vw" /><span className="before-label">BEFORE</span></div><div><Image src={`https://images.unsplash.com/${item.after}?auto=format&fit=crop&w=750&q=80`} alt={`${item.title} after cleaning`} fill unoptimized sizes="(max-width: 700px) 50vw, 25vw" /><span className="after-label">AFTER</span></div><span className="transform-arrow"><ArrowRight size={17} /></span></div><div className="transform-caption"><span>0{index + 1}</span><div><strong>{item.title}</strong><small>{item.room}</small></div><Sparkles size={16} /></div></article>)}</div><p className="results-note">A little note: every home is its own story. Results depend on the space, starting condition, and service booked.</p></div></section>

      <section className="section pricing-section" id="pricing"><div className="pricing-heading"><div className="eyebrow">NO MYSTERY. NO SURPRISES.</div><h2>Good clean.<br /><em>Clear price.</em></h2><p>Every home’s a little different. Here’s a starting point — we’ll confirm your exact quote before we book.</p><span className="pricing-note"><Check size={14} /> No hidden fees, ever.</span></div><div className="price-list"><div className="price-row"><span className="price-icon"><Sparkles size={18} /></span><div><strong>The regular</strong><small>Weekly / fortnightly · up to 2 bed</small></div><b>from $89</b></div><div className="price-row"><span className="price-icon"><Leaf size={18} /></span><div><strong>The deep clean</strong><small>One-time reset · up to 2 bed</small></div><b>from $169</b></div><div className="price-row"><span className="price-icon"><Heart size={18} /></span><div><strong>Moving day</strong><small>Move-in / move-out · up to 2 bed</small></div><b>from $229</b></div><div className="price-row"><span className="price-icon"><Clock3 size={18} /></span><div><strong>Office cleaning</strong><small>Tailored to your workspace</small></div><b>Let’s chat</b></div><a href="#booking" className="button button-dark price-cta">Get my exact quote <ArrowRight size={16} /></a></div></section>

      <section className="booking-section" id="booking"><div className="booking-background"><Image src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=80" alt="" fill unoptimized sizes="100vw" /></div><div className="booking-overlay" /><div className="booking-content"><div className="booking-copy"><div className="eyebrow"><span className="eyebrow-line" /> YOUR SOFTER SUNDAY STARTS HERE</div><h2>Let’s make<br />home feel like <em>home.</em></h2><p>Tell us a little about your place. We’ll be in touch to find a time that feels just right.</p><div className="booking-small"><ShieldCheck size={18} /><span><strong>Good hands. Good heart.</strong><br />Every clean is backed by our Tidy Promise.</span></div><a href="#terms" className="terms-jump">A little about how we work <ArrowRight size={14} /></a></div><BookingForm /></div></section>

      <section className="terms-section" id="terms"><div className="section terms-inner"><div><div className="eyebrow">THE LITTLE DETAILS</div><h2>Good to <em>know.</em></h2><p>We like to keep things clear and kind. Here are the basics of how our Tidy Promise works.</p></div><div className="terms-grid"><article><span>01</span><h3>Easy changes</h3><p>Plans change. Let us know at least 24 hours ahead to reschedule or cancel without a fee.</p></article><article><span>02</span><h3>Our best work</h3><p>If something isn’t quite right, tell us within 24 hours. We’ll come back and make it right.</p></article><article><span>03</span><h3>Clear pricing</h3><p>Your quote is confirmed before we begin. Additional requests are discussed first — never a surprise.</p></article><article><span>04</span><h3>Safe & sound</h3><p>Our team is vetted and insured. We treat your home, belongings, and privacy with care.</p></article></div></div><p className="terms-disclaimer">These are example terms for this demo service. Final policies, service areas, and prices should be confirmed before launch.</p></section>

      <footer className="site-footer"><a className="brand footer-brand" href="#top"><span className="brand-mark"><Sparkles size={17} /></span>tidy<span>home</span></a><p>A little lighter. A lot brighter.<br />Thoughtful cleaning for the life you live.</p><div className="footer-links"><a href="#services">Services</a><a href="#pricing">Pricing</a><a href="#terms">Terms</a><a href="#booking">Book a clean</a></div><small>© 2025 Tidy Home. Made with a little care.</small></footer>
    </main>
  );
}
