import { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { assets, catalogue, evRange, sparePartsRange } from "./data";
import "./styles.css";

function Icon({ name, size = 20 }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.9,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };
  const icons = {
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),
    phone: (
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.34 1.77.65 2.61a2 2 0 0 1-.45 2.11L8.04 9.71a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.84.31 1.71.53 2.61.65A2 2 0 0 1 22 16.92Z" />
    ),
    message: (
      <>
        <path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 20.5l1.7-5A8.4 8.4 0 1 1 21 11.5Z" />
        <path d="M8 11.5h.01M12 11.5h.01M16 11.5h.01" />
      </>
    ),
    menu: (
      <>
        <path d="M4 7h16" />
        <path d="M4 12h16" />
        <path d="M4 17h16" />
      </>
    ),
    close: (
      <>
        <path d="m6 6 12 12" />
        <path d="m18 6-12 12" />
      </>
    ),
    chevron: <path d="m8 10 4 4 4-4" />,
    bolt: <path d="m13 2-9 12h7l-1 8 10-13h-7l0-7Z" />,
    wrench: (
      <path d="m14.7 6.3a5 5 0 0 0-6.8 6.8L2 19l3 3 5.9-5.9a5 5 0 0 0 6.8-6.8l-3.1 3.1-2.8-2.8 2.9-3.3Z" />
    ),
    parts: (
      <>
        <path d="M21 8 12 3 3 8l9 5 9-5Z" />
        <path d="M3 8v8l9 5 9-5V8" />
        <path d="M12 13v8" />
      </>
    ),
    calculator: (
      <>
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <path d="M8 6h8M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15h.01M8 19h.01M12 19h4" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 10h18" />
      </>
    ),
    truck: (
      <>
        <path d="M3 6h11v10H3z" />
        <path d="M14 10h4l3 3v3h-7z" />
        <circle cx="7" cy="18" r="2" />
        <circle cx="18" cy="18" r="2" />
      </>
    ),
    leaf: (
      <>
        <path d="M20 3C11 3 5 7 5 14c0 3 2 5 5 5 7 0 10-7 10-16Z" />
        <path d="M4 21c3-5 7-8 12-11" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    external: (
      <>
        <path d="M14 4h6v6" />
        <path d="m20 4-9 9" />
        <path d="M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" />
      </>
    ),
  };
  return <svg {...common}>{icons[name] || icons.arrow}</svg>;
}

const whatsappUrl = (vehicle) =>
  `https://wa.me/919422393288?text=${encodeURIComponent(`Hello Gemini Motors, I am interested in ${vehicle || "your commercial vehicle range"}. Please share price and availability details.`)}`;

const whatsappDraftUrl = (message) =>
  `https://wa.me/919422393288?text=${encodeURIComponent(message)}`;

function SiteLogo() {
  return (
    <a className="site-logo" href="#home" aria-label="Gemini Motors home">
      <img src={assets.logo} alt="Gemini Motors Logo" />
    </a>
  );
}

function Button({
  children,
  tone = "blue",
  href,
  onClick,
  icon = "arrow",
  className = "",
}) {
  const content = (
    <>
      {children}
      {icon && <Icon name={icon} size={17} />}
    </>
  );
  return href ? (
    <a className={`primary-button ${tone} ${className}`} href={href}>
      {content}
    </a>
  ) : (
    <button className={`primary-button ${tone} ${className}`} onClick={onClick}>
      {content}
    </button>
  );
}

function ProductCard({ product, index, onQuote }) {
  const productUrl = product.url || `https://geminimotorsgoa.in${product.path}`;
  const detailsLabel = product.url ? "Official details" : "View details";
  return (
    <article className="product-card">
      <a
        className="product-visual"
        href={productUrl}
        target="_blank"
        rel="noreferrer"
        aria-label={`View ${product.name} details`}
      >
        <img
          src={product.image}
          alt={product.name}
          loading={index > 5 ? "lazy" : "eager"}
        />
        <span className={`product-brand ${product.type === "EV" ? "ev" : ""}`}>
          {product.type === "EV" && <Icon name="bolt" size={12} />}{" "}
          {product.brand}
        </span>
        <span className="product-type">{product.type}</span>
      </a>
      <div className="product-copy">
        {product.source && <span className="product-source">{product.source}</span>}
        <p>{product.use}</p>
        <h3>{product.name}</h3>
        <div className="product-actions">
          <a href={productUrl} target="_blank" rel="noreferrer">
            {detailsLabel} <Icon name="external" size={14} />
          </a>
          <button onClick={() => onQuote(product)}>
            Get quote <Icon name="arrow" size={15} />
          </button>
        </div>
      </div>
    </article>
  );
}

function EmiPlanner({ onEnquire }) {
  const [price, setPrice] = useState(1800000);
  const [downPayment, setDownPayment] = useState(300000);
  const [rate, setRate] = useState(10.5);
  const [months, setMonths] = useState(48);
  const loan = Math.max(price - downPayment, 0);
  const monthlyRate = rate / 1200;
  const emi =
    loan && monthlyRate
      ? Math.round(
          (loan * monthlyRate * Math.pow(1 + monthlyRate, months)) /
            (Math.pow(1 + monthlyRate, months) - 1),
        )
      : Math.round(loan / months || 0);
  const money = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  return (
    <section className="finance-section" id="finance">
      <div className="page-shell finance-grid">
        <div className="finance-copy">
          <p className="eyebrow">
            <Icon name="calculator" size={14} /> FINANCE
          </p>
          <h2>
            Plan a fleet that
            <br />
            <span>moves forward.</span>
          </h2>
          <p>
            Use the planner for a quick estimate, then speak with the Gemini
            Motors team for finance options that suit your business.
          </p>
          <ul>
            <li>
              <Icon name="check" size={16} /> Flexible finance guidance
            </li>
            <li>
              <Icon name="check" size={16} /> Lender coordination
            </li>
            <li>
              <Icon name="check" size={16} /> Documentation assistance
            </li>
          </ul>
          <Button
            tone="outline-light"
            onClick={() => onEnquire(null, "Finance enquiry")}
          >
            Talk to finance team
          </Button>
        </div>
        <div className="emi-card">
          <div className="emi-heading">
            <div>
              <strong>EMI CALCULATOR</strong>
              <small>Indicative monthly finance planning</small>
            </div>
            <Icon name="calculator" size={22} />
          </div>
          <label>
            Vehicle price <b>{money(price)}</b>
            <input
              aria-label="Vehicle price"
              type="range"
              min="500000"
              max="5000000"
              step="50000"
              value={price}
              onChange={(event) => setPrice(Number(event.target.value))}
            />
          </label>
          <label>
            Down payment <b>{money(downPayment)}</b>
            <input
              aria-label="Down payment"
              type="range"
              min="50000"
              max={Math.max(price - 50000, 50000)}
              step="25000"
              value={Math.min(downPayment, price - 50000)}
              onChange={(event) => setDownPayment(Number(event.target.value))}
            />
          </label>
          <div className="emi-inputs">
            <label>
              Interest rate{" "}
              <span>
                <input
                  aria-label="Interest rate"
                  type="number"
                  min="1"
                  max="30"
                  step=".1"
                  value={rate}
                  onChange={(event) => setRate(Number(event.target.value) || 0)}
                />
                %
              </span>
            </label>
            <label>
              Loan tenure{" "}
              <span>
                <input
                  aria-label="Loan tenure"
                  type="number"
                  min="12"
                  max="84"
                  step="6"
                  value={months}
                  onChange={(event) =>
                    setMonths(Number(event.target.value) || 12)
                  }
                />{" "}
                months
              </span>
            </label>
          </div>
          <div className="emi-result">
            <span>Estimated EMI</span>
            <strong>
              {money(emi)} <small>/ month</small>
            </strong>
            <p>Loan amount: {money(loan)}</p>
          </div>
          <p className="emi-note">
            This is a planning estimate only. Rates, tenure and approval are
            decided by the finance provider.
          </p>
        </div>
      </div>
    </section>
  );
}

function EnquiryDialog({ product, type, prefill = {}, onClose, onSubmit }) {
  const isPartsEnquiry = type === "Parts enquiry";
  const initialPartsBrand = prefill.brand || product?.brand || "Ashok Leyland";
  const [partsBrand, setPartsBrand] = useState(initialPartsBrand);
  const [partsClass, setPartsClass] = useState(
    prefill.vehicleClass ||
      product?.type ||
      (initialPartsBrand === "SWITCH Mobility" ? "EV" : ""),
  );
  const [partsProductId, setPartsProductId] = useState(
    prefill.productId || product?.id || "",
  );
  const [formError, setFormError] = useState("");
  const partsProducts = useMemo(
    () =>
      catalogue.filter(
        (item) =>
          item.brand === partsBrand &&
          Boolean(partsClass) &&
          (partsClass === "All" || item.type === partsClass),
      ),
    [partsBrand, partsClass],
  );
  const selectedPartsProduct =
    partsProducts.find((item) => item.id === partsProductId) || null;
  const submit = (event) => {
    event.preventDefault();
    const fields = Object.fromEntries(new FormData(event.currentTarget).entries());
    const payload = Object.fromEntries(
      Object.entries(fields).map(([key, value]) => [
        key,
        typeof value === "string" ? value.trim() : value,
      ]),
    );
    const phoneDigits = (payload.phone || "").replace(/\D/g, "");

    if (!payload.name || payload.name.length < 2) {
      setFormError("Please enter a name with at least two characters.");
      return;
    }
    if (phoneDigits.length < 10 || phoneDigits.length > 13) {
      setFormError("Please enter a valid mobile number.");
      return;
    }
    if (isPartsEnquiry && !partsClass) {
      setFormError("Please choose the vehicle class for this parts request.");
      return;
    }
    if (isPartsEnquiry && !selectedPartsProduct) {
      setFormError("Please choose the vehicle model for this parts request.");
      return;
    }
    if (isPartsEnquiry && (!payload.partQuery || payload.partQuery.length < 2)) {
      setFormError("Please tell us the part name, number or description.");
      return;
    }

    setFormError("");
    onSubmit(isPartsEnquiry ? selectedPartsProduct : product, type, payload);
  };
  const headline =
    product && !isPartsEnquiry
      ? `Enquire about ${product.name}`
      : type || "Enquire now";

  return (
    <div className="dialog-backdrop" onMouseDown={onClose}>
      <section
        className="enquiry-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="enquiry-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          className="dialog-close"
          onClick={onClose}
          aria-label="Close enquiry form"
        >
          <Icon name="close" size={20} />
        </button>
        <div className="dialog-aside">
          <p className="eyebrow light">
            <Icon name="truck" size={15} /> GEMINI MOTORS
          </p>
          <h2>
            {isPartsEnquiry ? (
              <>
                Parts that keep
                <br />
                <span>you moving.</span>
              </>
            ) : (
              <>
                Ready to move
                <br />
                <span>your business?</span>
              </>
            )}
          </h2>
          <p>
            {isPartsEnquiry
              ? "Choose the vehicle brand and model, then tell us the part or part category you need."
              : "Tell us what you need. Our local team will help with product, finance or after-sales guidance."}
          </p>
          <a className="dialog-phone" href="tel:+919422393288">
            <Icon name="phone" size={17} /> +91 94223 93288
          </a>
        </div>
        <form className="enquiry-form" onSubmit={submit}>
          <p className="form-label">{headline}</p>
          <h2 id="enquiry-title">
            {isPartsEnquiry ? (
              <>
                Find the right <span>part.</span>
              </>
            ) : (
              "Let’s get started."
            )}
          </h2>
          {product && !isPartsEnquiry && (
            <div className="selected-product">
              <img src={product.image} alt="" />
              <span>
                <small>Selected vehicle</small>
                <b>{product.name}</b>
              </span>
            </div>
          )}
          <label>
            Your name
            <input
              required
              name="name"
              autoComplete="name"
              minLength="2"
              placeholder="Enter your name"
            />
          </label>
          <label>
            Mobile number
            <input
              required
              name="phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              pattern="[0-9+ ()-]{10,18}"
              placeholder="Enter your mobile number"
            />
          </label>
          {isPartsEnquiry ? (
            <>
              <label>
                Vehicle brand
                <select
                  name="brand"
                  value={partsBrand}
                  onChange={(event) => {
                    const nextBrand = event.target.value;
                    setPartsBrand(nextBrand);
                    setPartsClass(nextBrand === "SWITCH Mobility" ? "EV" : "");
                    setPartsProductId("");
                  }}
                >
                  <option>Ashok Leyland</option>
                  <option>SWITCH Mobility</option>
                </select>
              </label>
              <label>
                Vehicle class
                <select
                  name="vehicleClass"
                  value={partsClass}
                  onChange={(event) => {
                    setPartsClass(event.target.value);
                    setPartsProductId("");
                  }}
                >
                  {partsBrand === "Ashok Leyland" && <option value="" disabled>Choose vehicle class</option>}
                  {partsBrand === "Ashok Leyland" && <option value="LCV">LCV</option>}
                  {partsBrand === "Ashok Leyland" && <option value="M&HCV">M&amp;HCV</option>}
                  {partsBrand === "SWITCH Mobility" && <option value="EV">Electric vehicles</option>}
                </select>
              </label>
              <label className="full">
                Vehicle model
                <select
                  required
                  name="vehicleModel"
                  disabled={!partsClass}
                  value={partsProductId}
                  onChange={(event) => setPartsProductId(event.target.value)}
                >
                  <option value="" disabled>
                    {partsClass ? "Select vehicle model" : "Choose a vehicle class first"}
                  </option>
                  {partsProducts.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="full">
                Part required
                <input
                  required
                  name="partQuery"
                  minLength="2"
                  defaultValue={prefill.partQuery || ""}
                  placeholder="Part name, part number or a short description"
                />
              </label>
              <label>
                Quantity
                <input name="quantity" type="number" min="1" defaultValue="1" />
              </label>
              <label>
                Registration / VIN
                <input
                  name="vehicleReference"
                  placeholder="Vehicle registration or VIN"
                />
              </label>
            </>
          ) : (
            <label>
              What can we help with?
              <select name="topic" defaultValue={product?.name || type || ""}>
                <option value="">Select an option</option>
                {product && <option>{product.name}</option>}
                <option>Vehicle quote</option>
                <option>Test drive / demo</option>
                <option>Finance assistance</option>
                <option>Service booking</option>
                <option>Genuine parts</option>
              </select>
            </label>
          )}
          <label className="full">
            {isPartsEnquiry ? "Additional notes" : "Message"}
            <textarea
              name="notes"
              rows="3"
              placeholder={
                isPartsEnquiry
                  ? "Vehicle registration, VIN, quantity or preferred callback time"
                  : "Share your route, load requirement or preferred callback time"
              }
            />
          </label>
          {formError && (
            <p className="form-error" role="alert">
              {formError}
            </p>
          )}
          <button className="primary-button blue form-submit" type="submit">
            {isPartsEnquiry ? "Request parts" : "Request callback"}{" "}
            <Icon name="arrow" size={17} />
          </button>
          <small className="form-help">
            After validation, you can choose to send this request through
            WhatsApp. Nothing is sent until you choose that action.
          </small>
        </form>
      </section>
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [brand, setBrand] = useState("All");
  const [type, setType] = useState("All");
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(9);
  const [enquiry, setEnquiry] = useState(null);
  const [toast, setToast] = useState("");
  const [whatsappDraft, setWhatsappDraft] = useState("");
  const filtered = useMemo(
    () =>
      catalogue.filter(
        (product) =>
          (brand === "All" || product.brand === brand) &&
          (type === "All" || product.type === type) &&
          product.name.toLowerCase().includes(query.toLowerCase()),
      ),
    [brand, type, query],
  );

  useEffect(() => setVisibleCount(9), [brand, type, query]);
  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => {
      setToast("");
      setWhatsappDraft("");
    }, 12000);
    return () => window.clearTimeout(timeout);
  }, [toast]);
  const openEnquiry = (product = null, formType = "", prefill = {}) => {
    setEnquiry({ product, formType, prefill });
    setMenuOpen(false);
  };
  const completeEnquiry = (product, formType, payload = {}) => {
    setEnquiry(null);
    const request =
      formType === "Parts enquiry"
        ? `${product ? `${product.name} parts enquiry` : "Parts enquiry"}`
        : product
          ? `${product.name} request`
          : formType || "Your enquiry";
    const enquiryLines = [
      "Hello Gemini Motors,",
      `I would like to request ${request}.`,
      product ? `Vehicle: ${product.name}` : "",
      payload.brand ? `Brand: ${payload.brand}` : "",
      payload.vehicleClass ? `Vehicle class: ${payload.vehicleClass}` : "",
      payload.partQuery ? `Part required: ${payload.partQuery}` : "",
      payload.quantity ? `Quantity: ${payload.quantity}` : "",
      payload.vehicleReference
        ? `Registration / VIN: ${payload.vehicleReference}`
        : "",
      payload.topic && !product ? `Topic: ${payload.topic}` : "",
      payload.notes ? `Notes: ${payload.notes}` : "",
      `Name: ${payload.name || ""}`,
      `Mobile: ${payload.phone || ""}`,
    ].filter(Boolean);
    setWhatsappDraft(enquiryLines.join("\n"));
    setToast(`${request} is ready. Send it to the team through WhatsApp.`);
  };
  const showVehicles = (nextType = "All") => {
    setType(nextType);
    document.getElementById("vehicles")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="gm-site">
      <header className="gm-header">
        <div className="header-inner">
          <SiteLogo />
          <nav
            className={menuOpen ? "gm-nav open" : "gm-nav"}
            aria-label="Primary navigation"
          >
            <a href="#home" onClick={() => setMenuOpen(false)}>
              Home
            </a>
            <a href="#vehicles" onClick={() => setMenuOpen(false)}>
              Commercial Vehicles <Icon name="chevron" size={15} />
            </a>
            <a href="#services" onClick={() => setMenuOpen(false)}>
              Services <Icon name="chevron" size={15} />
            </a>
            <div className="nav-parts">
              <a href="#spare-parts" onClick={() => setMenuOpen(false)}>
                Spare Parts <Icon name="chevron" size={15} />
              </a>
              <div className="parts-submenu">
                <button onClick={() => openEnquiry(null, "Parts enquiry")}>
                  Parts Enquiry <Icon name="parts" size={15} />
                </button>
              </div>
            </div>
            <a href="#finance" onClick={() => setMenuOpen(false)}>
              Finance
            </a>
            <a href="#about" onClick={() => setMenuOpen(false)}>
              About Us
            </a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>
              Contact Us
            </a>
            <div className="mobile-actions">
              <a href="tel:+919422393288">
                <Icon name="phone" size={16} /> Call
              </a>
              <a
                className="mobile-whatsapp"
                href={whatsappUrl()}
                target="_blank"
                rel="noreferrer"
              >
                <Icon name="message" size={16} /> WhatsApp
              </a>
            </div>
          </nav>
          <div className="header-actions">
            <a className="call-button" href="tel:+919422393288">
              <Icon name="phone" size={17} /> Call
            </a>
            <a
              className="whatsapp-button"
              href={whatsappUrl()}
              target="_blank"
              rel="noreferrer"
            >
              <Icon name="message" size={17} /> WhatsApp
            </a>
            <button
              className="menu-button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <Icon name={menuOpen ? "close" : "menu"} size={22} />
            </button>
          </div>
        </div>
      </header>
      <main>
        <section className="hero-section" id="home">
          <div className="hero-background">
            <img src={assets.hero} alt="DOST XL Twin Fuel pickup on highway" />
          </div>
          <div className="hero-shade"></div>
          <div className="page-shell hero-grid">
            <div className="hero-copy">
              <p className="hero-kicker">
                <Icon name="bolt" size={15} /> RELIABILITY POWERED BY
                ENGINEERING
              </p>
              <h1>
                Powering Every
                <br />
                <span>Business Journey</span>
              </h1>
              <p>
                Commercial vehicles, electric mobility and reliable business
                support for the routes that keep Goa moving.
              </p>
              <div className="hero-cta">
                <Button onClick={() => showVehicles()}>Explore fleet</Button>
                <Button
                  tone="outline"
                  onClick={() => openEnquiry(null, "Service booking")}
                  icon="wrench"
                >
                  Book service
                </Button>
              </div>
            </div>
            <article className="hero-partner">
              <img src={assets.hero} alt="DOST XL Twin Fuel pickup" />
              <div>
                <span>COMMERCIAL MOBILITY</span>
                <strong>Ashok Leyland &amp; SWITCH Mobility</strong>
              </div>
            </article>
          </div>
          <a
            className="hero-chat"
            href={whatsappUrl()}
            target="_blank"
            rel="noreferrer"
            aria-label="Chat on WhatsApp"
          >
            <Icon name="message" size={27} />
          </a>
        </section>
        <section className="proof-strip">
          <div className="page-shell">
            <span>
              <Icon name="truck" size={18} /> Commercial vehicle guidance
            </span>
            <span>
              <Icon name="bolt" size={18} /> Electric mobility options
            </span>
            <span>
              <Icon name="parts" size={18} /> Genuine parts support
            </span>
            <span>
              <Icon name="calculator" size={18} /> Finance assistance
            </span>
          </div>
        </section>
        <section className="category-section">
          <div className="page-shell">
            <p className="eyebrow">
              <Icon name="truck" size={14} /> VEHICLE CATEGORIES
            </p>
            <div className="section-intro">
              <h2>
                Choose the fleet class
                <br />
                that fits your route.
              </h2>
              <p>
                Explore the current commercial and electric vehicle range, then
                get local guidance on the right fit for your work.
              </p>
            </div>
            <div className="category-grid">
              <button
                className="category-card"
                onClick={() => showVehicles("LCV")}
              >
                <img src={assets.lcv} alt="Light commercial vehicle" />
                <span className="card-gradient"></span>
                <div>
                  <strong>LCV</strong>
                  <p>
                    Agile vehicles for city deliveries, retail routes and
                    growing businesses.
                  </p>
                  <b>
                    Explore range <Icon name="arrow" size={16} />
                  </b>
                </div>
              </button>
              <button
                className="category-card"
                onClick={() => showVehicles("M&HCV")}
              >
                <img
                  src={assets.tipper}
                  alt="Medium and heavy commercial tipper"
                />
                <span className="card-gradient"></span>
                <div>
                  <strong>M&amp;HCV</strong>
                  <p>
                    High-capacity haulage and construction-ready platforms for
                    serious fleet work.
                  </p>
                  <b>
                    Explore range <Icon name="arrow" size={16} />
                  </b>
                </div>
              </button>
              <button
                className="category-card ev-card"
                onClick={() => showVehicles("EV")}
              >
                <img
                  src={assets.iev4}
                  alt="SWITCH electric commercial vehicle"
                />
                <span className="card-gradient"></span>
                <div>
                  <strong>
                    <Icon name="bolt" size={18} /> EV
                  </strong>
                  <p>
                    Cleaner commercial mobility solutions for the next business
                    mile.
                  </p>
                  <b>
                    Explore range <Icon name="arrow" size={16} />
                  </b>
                </div>
              </button>
            </div>
          </div>
        </section>
        <section className="catalogue-section" id="vehicles">
          <div className="page-shell">
            <p className="eyebrow">
              <Icon name="truck" size={14} /> VEHICLE CATALOGUE
            </p>
            <div className="catalogue-heading">
              <div>
                <h2>
                  Explore the range
                  <br />
                  for every commercial route.
                </h2>
                <p>
                  Existing Gemini Motors model pages remain intact. New official
                  range cards link directly to their manufacturer details.
                </p>
              </div>
              <Button
                tone="outline-dark"
                onClick={() => openEnquiry(null, "Vehicle quote")}
              >
                Get a quote
              </Button>
            </div>
            <div className="catalogue-controls">
              <div className="filter-group">
                <span>Brand</span>
                {["All", "Ashok Leyland", "SWITCH Mobility"].map((item) => (
                  <button
                    key={item}
                    className={brand === item ? "active" : ""}
                    onClick={() => setBrand(item)}
                  >
                    {item === "All" ? "All brands" : item}
                  </button>
                ))}
              </div>
              <div className="filter-group">
                <span>Class</span>
                {["All", "LCV", "M&HCV", "EV"].map((item) => (
                  <button
                    key={item}
                    className={type === item ? "active" : ""}
                    onClick={() => setType(item)}
                  >
                    {item === "All" ? "All classes" : item}
                  </button>
                ))}
              </div>
              <label className="search-field">
                <span className="sr-only">Search models</span>
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search a model"
                />
                <Icon name="arrow" size={16} />
              </label>
            </div>
            <div className="catalogue-meta">
              <span>
                <b>{filtered.length}</b> models matching your selection
              </span>
              <span>Availability and variants are confirmed at enquiry.</span>
            </div>
            <div className="product-grid">
              {filtered.slice(0, visibleCount).map((product, index) => (
                <ProductCard
                  product={product}
                  index={index}
                  key={product.id}
                  onQuote={(productItem) =>
                    openEnquiry(productItem, "Vehicle quote")
                  }
                />
              ))}
            </div>
            {filtered.length === 0 && (
              <div className="empty-state">
                <Icon name="truck" size={26} />
                <strong>No models found</strong>
                <p>Try another brand, vehicle class or model name.</p>
                <button
                  onClick={() => {
                    setBrand("All");
                    setType("All");
                    setQuery("");
                  }}
                >
                  Clear filters
                </button>
              </div>
            )}
            {visibleCount < filtered.length && (
              <div className="catalogue-more">
                <Button
                  tone="outline-dark"
                  onClick={() => setVisibleCount((value) => value + 9)}
                >
                  Show more models
                </Button>
              </div>
            )}
          </div>
        </section>
        <section className="ev-section">
          <div className="page-shell ev-grid">
            <div className="ev-media">
              <img
                src={assets.iev3}
                alt="SWITCH IeV3 electric commercial vehicle"
              />
              <span>
                <Icon name="bolt" size={17} /> ELECTRIC MOBILITY
              </span>
            </div>
            <div className="ev-copy">
              <p className="eyebrow">
                <Icon name="bolt" size={14} /> SWITCH MOBILITY
              </p>
              <h2>
                Cleaner kilometres.
                <br />
                <span>Practical business.</span>
              </h2>
              <p>
                See the SWITCH electric commercial vehicle range and official
                body configurations, then speak with the team about
                applications, charging and Goa availability.
              </p>
              <div className="ev-stat-row">
                <div>
                  <b>IeV3</b>
                  <span>Last-mile logistics</span>
                </div>
                <div>
                  <b>IeV4</b>
                  <span>Commercial transport</span>
                </div>
                <div>
                  <b>EV</b>
                  <span>Goa enquiry support</span>
                </div>
              </div>
              <div className="hero-cta">
                <Button onClick={() => showVehicles("EV")}>
                  Explore EV range
                </Button>
                <Button
                  tone="outline-dark"
                  onClick={() => openEnquiry(evRange[0], "EV enquiry")}
                >
                  Talk EV
                </Button>
              </div>
              <small>
                *Range and vehicle specifications vary by model, load, terrain
                and operating conditions. Confirm details at enquiry.
              </small>
            </div>
          </div>
        </section>
        <EmiPlanner onEnquire={openEnquiry} />
        <section className="services-section" id="services">
          <div className="page-shell">
            <div className="services-header">
              <div>
                <p className="eyebrow">
                  <Icon name="wrench" size={14} /> SERVICES
                </p>
                <h2>
                  Keep every vehicle
                  <br />
                  route-ready.
                </h2>
              </div>
              <p>
                Support that stays close to the work: service planning, genuine
                parts, finance and fleet assistance.
              </p>
            </div>
            <div className="service-grid">
              <article>
                <Icon name="wrench" size={25} />
                <h3>Vehicle service</h3>
                <p>
                  Book a service request for planned maintenance, diagnostics
                  and repairs.
                </p>
                <button onClick={() => openEnquiry(null, "Service booking")}>
                  Book service <Icon name="arrow" size={16} />
                </button>
              </article>
              <article>
                <Icon name="parts" size={25} />
                <h3>Genuine parts</h3>
                <p>
                  Send a parts request with your vehicle details and required
                  component.
                </p>
                <button onClick={() => openEnquiry(null, "Parts enquiry")}>
                  Request parts <Icon name="arrow" size={16} />
                </button>
              </article>
              <article>
                <Icon name="calculator" size={25} />
                <h3>Finance assistance</h3>
                <p>
                  Discuss a vehicle finance plan suited to your business
                  requirement.
                </p>
                <button onClick={() => openEnquiry(null, "Finance enquiry")}>
                  Finance support <Icon name="arrow" size={16} />
                </button>
              </article>
              <article>
                <Icon name="calendar" size={25} />
                <h3>Test drive or demo</h3>
                <p>
                  Request a callback to plan the next appropriate step for your
                  vehicle.
                </p>
                <button onClick={() => openEnquiry(null, "Test drive / demo")}>
                  Request callback <Icon name="arrow" size={16} />
                </button>
              </article>
            </div>
          </div>
        </section>
        <section className="parts-section" id="spare-parts">
          <div className="page-shell">
            <div className="parts-panel">
              <div className="parts-copy">
                <p className="eyebrow light">
                  <Icon name="parts" size={14} /> SPARE PARTS
                </p>
                <h2>
                  The right part for every
                  <br />
                  <span>working vehicle.</span>
                </h2>
                <p>
                  Choose a part category, then select an Ashok Leyland or
                  SWITCH Mobility vehicle model. Fitment and local availability
                  are confirmed at enquiry.
                </p>
              </div>
              <div className="parts-actions">
                <div className="parts-brands">
                  <span>
                    <Icon name="truck" size={17} /> Ashok Leyland
                  </span>
                  <span>
                    <Icon name="bolt" size={17} /> SWITCH Mobility
                  </span>
                </div>
                <Button
                  tone="outline"
                  onClick={() => openEnquiry(null, "Parts enquiry")}
                  icon="parts"
                >
                  Parts enquiry
                </Button>
              </div>
            </div>
            <div className="parts-range">
              <div className="parts-range-heading">
                <div>
                  <p className="eyebrow">
                    <Icon name="parts" size={14} /> OFFICIAL PARTS OPTIONS
                  </p>
                  <h3>Request the right parts support for the job.</h3>
                </div>
                <p>
                  Start with a category, then provide the vehicle model, part
                  number or VIN so the team can check compatibility.
                </p>
              </div>
              <div className="parts-product-grid">
                {sparePartsRange.map((part) => (
                  <article className="parts-product-card" key={part.id}>
                    <span
                      className={
                        part.brand === "SWITCH Mobility"
                          ? "parts-product-brand ev"
                          : "parts-product-brand"
                      }
                    >
                      {part.brand === "SWITCH Mobility" && (
                        <Icon name="bolt" size={12} />
                      )}
                      {part.brand}
                    </span>
                    <h3>{part.name}</h3>
                    <p>{part.description}</p>
                    <button
                      onClick={() =>
                        openEnquiry(null, "Parts enquiry", {
                          brand: part.brand,
                          partQuery: part.request,
                        })
                      }
                    >
                      Request this part <Icon name="arrow" size={15} />
                    </button>
                    {part.sourceUrl && (
                      <a href={part.sourceUrl} target="_blank" rel="noreferrer">
                        Official info <Icon name="external" size={13} />
                      </a>
                    )}
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className="green-section" id="about">
          <div className="page-shell green-grid">
            <div className="green-copy">
              <p className="eyebrow light">
                <Icon name="leaf" size={14} /> GREEN TECHNOLOGY
              </p>
              <h2>Future-ready mobility for cleaner fleet operations.</h2>
              <p>
                Explore electric mobility alongside the commercial vehicle
                range, with a focused route to advice on the operational
                questions that matter.
              </p>
              <div className="green-tags">
                <span>Electric vehicles</span>
                <span>Alternative fuels</span>
                <span>Fleet support</span>
              </div>
              <Button
                tone="outline"
                onClick={() => openEnquiry(null, "Green mobility enquiry")}
              >
                Explore green tech
              </Button>
            </div>
            <img src={assets.green} alt="Sustainable fleet technology" />
          </div>
        </section>
        <section className="contact-section" id="contact">
          <div className="page-shell contact-panel">
            <div>
              <p className="eyebrow">
                <Icon name="message" size={14} /> FLEET CONSULTATION
              </p>
              <h2>
                Ready to move your
                <br />
                <span>business forward?</span>
              </h2>
              <p>
                Get a clear answer about a model, route requirement, service
                support or finance enquiry.
              </p>
            </div>
            <div className="contact-actions">
              <a href="tel:+919422393288">
                <Icon name="phone" size={18} />
                <span>
                  Call Gemini Motors<small>+91 94223 93288</small>
                </span>
              </a>
              <Button onClick={() => openEnquiry(null, "Fleet consultation")}>
                Start an enquiry
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="gm-footer">
        <div className="page-shell footer-grid">
          <div className="footer-about">
            <SiteLogo />
            <p>
              Commercial fleet, electric mobility and business-support solutions
              for Goa.
            </p>
            <a href="tel:+919422393288">
              <Icon name="phone" size={16} /> +91 94223 93288
            </a>
            <a href="mailto:agnel899@gmail.com">agnel899@gmail.com</a>
          </div>
          <div>
            <h3>BUSINESS DIVISIONS</h3>
            <a href="#vehicles">Commercial Fleet</a>
            <a href="#vehicles">SWITCH EV Mobility</a>
            <a href="#about">Green Eco Technologies</a>
            <a href="#finance">Finance Assistance</a>
          </div>
          <div>
            <h3>QUICK SUPPORT</h3>
            <button onClick={() => openEnquiry(null, "Vehicle quote")}>
              Vehicle quote
            </button>
            <button onClick={() => openEnquiry(null, "Service booking")}>
              Book a service
            </button>
            <button onClick={() => openEnquiry(null, "Parts enquiry")}>
              Genuine parts
            </button>
            <button onClick={() => openEnquiry(null, "Finance enquiry")}>
              Finance enquiry
            </button>
          </div>
          <div className="footer-contact">
            <h3>CONNECT</h3>
            <p>Goa, India</p>
            <div>
              <a
                href="https://www.instagram.com/geminigroupindia"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
              <a
                href="https://www.facebook.com/geminigroupindia"
                target="_blank"
                rel="noreferrer"
              >
                Facebook
              </a>
              <a
                href="https://www.linkedin.com/company/gemini-group-india"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
        <div className="page-shell footer-bottom">
          <span>
            © {new Date().getFullYear()} Gemini Motors. All rights reserved.
          </span>
          <div>
            <a
              href="https://geminimotorsgoa.in/privacy-policy/"
              target="_blank"
              rel="noreferrer"
            >
              Privacy Policy
            </a>
            <a
              href="https://geminimotorsgoa.in/terms-and-conditions/"
              target="_blank"
              rel="noreferrer"
            >
              Terms &amp; Conditions
            </a>
          </div>
        </div>
      </footer>
      {enquiry && (
        <EnquiryDialog
          product={enquiry.product}
          type={enquiry.formType}
          prefill={enquiry.prefill}
          onClose={() => setEnquiry(null)}
          onSubmit={completeEnquiry}
        />
      )}
      {toast && (
        <div className="toast" role="status">
          <Icon name="check" size={17} />
          <div className="toast-copy">
            <span>{toast}</span>
            {whatsappDraft && (
              <a
                href={whatsappDraftUrl(whatsappDraft)}
                target="_blank"
                rel="noreferrer"
              >
                Continue on WhatsApp <Icon name="arrow" size={13} />
              </a>
            )}
          </div>
          <button
            onClick={() => {
              setToast("");
              setWhatsappDraft("");
            }}
            aria-label="Dismiss notification"
          >
            <Icon name="close" size={16} />
          </button>
        </div>
      )}
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
