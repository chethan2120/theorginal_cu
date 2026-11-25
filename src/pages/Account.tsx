import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Seo } from "../components/Seo.tsx";
import { PageWidth, btnGhost, btnPrimary, fieldClass, labelClass } from "../components/ui.tsx";
import { useAccount } from "../context/AccountContext.tsx";
import { indianStates } from "../data/commerce.ts";
import { formatDate, formatINR } from "../lib/format.ts";

export default function Account() {
  const { profile, orders, saveProfile, signOut } = useAccount();
  const [name, setName] = useState(profile?.name ?? "");
  const [email, setEmail] = useState(profile?.email ?? "");
  const [phone, setPhone] = useState(profile?.phone ?? "");
  const [line1, setLine1] = useState(profile?.line1 ?? "");
  const [line2, setLine2] = useState(profile?.line2 ?? "");
  const [city, setCity] = useState(profile?.city ?? "");
  const [state, setState] = useState(profile?.state ?? "");
  const [pincode, setPincode] = useState(profile?.pincode ?? "");
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (name.trim().length < 2) {
      setError("Enter your name.");
      setSaved(false);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Enter a valid email address.");
      setSaved(false);
      return;
    }
    if (!/^[6-9]\d{9}$/.test(phone.replace(/\s+/g, ""))) {
      setError("Enter a 10-digit mobile number.");
      setSaved(false);
      return;
    }
    if (line1.trim().length < 5) {
      setError("Enter the street and house number.");
      setSaved(false);
      return;
    }
    if (city.trim().length < 2) {
      setError("Enter the city.");
      setSaved(false);
      return;
    }
    if (!state) {
      setError("Choose a state.");
      setSaved(false);
      return;
    }
    if (!/^\d{6}$/.test(pincode.trim())) {
      setError("Enter a 6-digit PIN code.");
      setSaved(false);
      return;
    }
    saveProfile({
      name: name.trim(),
      email: email.trim(),
      phone: phone.replace(/\s+/g, ""),
      line1: line1.trim(),
      line2: line2.trim(),
      city: city.trim(),
      state,
      pincode: pincode.trim(),
    });
    setError("");
    setSaved(true);
  }

  return (
    <PageWidth className="py-12">
      <Seo
        title="My account — THE ORIGINAL"
        description="Save your details on this device and review orders placed in this browser. There is no password login."
      />
      <p className="text-[12px] tracking-[0.2em] uppercase text-gold">Account</p>
      <h1 className="mt-3 font-serif text-5xl font-medium text-navy">My account</h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-mute">
        This is not a password login. Your name and address stay in this browser and fill checkout next time. You can still change them, or send an order to someone else.
      </p>

      <div className="mt-10 grid gap-12 lg:grid-cols-2">
        <section>
          <h2 className="font-serif text-3xl text-navy">{profile ? "Saved details" : "Save details on this device"}</h2>
          <form onSubmit={onSubmit} noValidate className="mt-5 space-y-4">
            <div>
              <label htmlFor="account-name" className={labelClass}>Name</label>
              <input id="account-name" value={name} onChange={(event) => setName(event.target.value)} className={fieldClass} autoComplete="name" />
            </div>
            <div>
              <label htmlFor="account-email" className={labelClass}>Email</label>
              <input id="account-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} className={fieldClass} autoComplete="email" />
            </div>
            <div>
              <label htmlFor="account-phone" className={labelClass}>Mobile</label>
              <input id="account-phone" value={phone} onChange={(event) => setPhone(event.target.value)} className={fieldClass} autoComplete="tel" />
            </div>
            <div>
              <label htmlFor="account-line1" className={labelClass}>Street and house number</label>
              <input id="account-line1" value={line1} onChange={(event) => setLine1(event.target.value)} className={fieldClass} autoComplete="address-line1" />
            </div>
            <div>
              <label htmlFor="account-line2" className={labelClass}>Area, optional</label>
              <input id="account-line2" value={line2} onChange={(event) => setLine2(event.target.value)} className={fieldClass} autoComplete="address-line2" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="account-city" className={labelClass}>City</label>
                <input id="account-city" value={city} onChange={(event) => setCity(event.target.value)} className={fieldClass} autoComplete="address-level2" />
              </div>
              <div>
                <label htmlFor="account-state" className={labelClass}>State</label>
                <select id="account-state" value={state} onChange={(event) => setState(event.target.value)} className={fieldClass}>
                  <option value="">Choose</option>
                  {indianStates.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="account-pin" className={labelClass}>PIN code</label>
              <input id="account-pin" value={pincode} onChange={(event) => setPincode(event.target.value)} className={fieldClass} autoComplete="postal-code" inputMode="numeric" />
            </div>
            {error ? <p className="text-sm text-danger" role="alert">{error}</p> : null}
            {saved ? <p className="text-sm text-navy" role="status">Saved on this device.</p> : null}
            <div className="flex flex-wrap gap-3">
              <button type="submit" className={btnPrimary}>Save</button>
              {profile ? (
                <button
                  type="button"
                  className={btnGhost}
                  onClick={() => {
                    signOut();
                    setName("");
                    setEmail("");
                    setPhone("");
                    setLine1("");
                    setLine2("");
                    setCity("");
                    setState("");
                    setPincode("");
                    setSaved(false);
                  }}
                >
                  Clear saved details
                </button>
              ) : null}
            </div>
          </form>
        </section>

        <section>
          <h2 className="font-serif text-3xl text-navy">My orders</h2>
          {orders.length === 0 ? (
            <div className="mt-5 border border-line bg-ivory px-5 py-8">
              <p className="text-sm text-mute">No orders on this device yet.</p>
              <Link to="/shop" className="mt-4 inline-block text-[12px] tracking-[0.14em] uppercase text-navy">
                Go to the shop
              </Link>
            </div>
          ) : (
            <ul className="mt-5 divide-y divide-line border-y border-line">
              {orders.map((order) => (
                <li key={order.id} className="flex flex-wrap items-center justify-between gap-3 py-4">
                  <div>
                    <Link to={`/order/${order.id}`} className="font-medium text-navy hover:text-gold">
                      {order.id}
                    </Link>
                    <p className="text-sm text-mute">
                      {formatDate(order.createdAt)} · {order.status} · {formatINR(order.total)}
                    </p>
                  </div>
                  <Link to={`/order/${order.id}`} className="text-[12px] tracking-[0.12em] uppercase text-navy">
                    View
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </PageWidth>
  );
}
