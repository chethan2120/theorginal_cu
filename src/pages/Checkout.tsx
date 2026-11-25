import { useState, type FormEvent, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Seo } from "../components/Seo.tsx";
import { PageWidth, ProductImage, btnPrimary, fieldClass, labelClass } from "../components/ui.tsx";
import { useAccount } from "../context/AccountContext.tsx";
import { useCart } from "../context/CartContext.tsx";
import { indianStates, paymentMethods } from "../data/commerce.ts";
import { formatINR } from "../lib/format.ts";
import type { Address } from "../types.ts";

type Errors = Partial<Record<keyof Address | "payment" | "recipientName" | "recipientPhone", string>>;

const emptyAddress: Address = {
  fullName: "",
  email: "",
  phone: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  pincode: "",
};

function validate(
  address: Address,
  payment: string,
  gift: boolean,
  recipientName: string,
  recipientPhone: string,
): Errors {
  const errors: Errors = {};
  if (address.fullName.trim().length < 2) errors.fullName = "Enter the full name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address.email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  if (!/^[6-9]\d{9}$/.test(address.phone.replace(/\s+/g, ""))) {
    errors.phone = "Enter a 10-digit mobile number.";
  }
  if (gift) {
    if (recipientName.trim().length < 2) errors.recipientName = "Enter the recipient's name.";
    if (!/^[6-9]\d{9}$/.test(recipientPhone.replace(/\s+/g, ""))) {
      errors.recipientPhone = "Enter the recipient's 10-digit mobile number.";
    }
  }
  if (address.line1.trim().length < 5) errors.line1 = "Enter the street and house number.";
  if (address.city.trim().length < 2) errors.city = "Enter the city.";
  if (!address.state) errors.state = "Choose a state.";
  if (!/^\d{6}$/.test(address.pincode.trim())) errors.pincode = "Enter a 6-digit PIN code.";
  if (!payment) errors.payment = "Choose a payment method.";
  return errors;
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1 text-sm text-danger" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export default function Checkout() {
  const { lines, summary, promoCode, clear } = useCart();
  const { profile, placeOrder, saveProfile } = useAccount();
  const navigate = useNavigate();
  const savedAddress: Address = {
    ...emptyAddress,
    fullName: profile?.name ?? "",
    email: profile?.email ?? "",
    phone: profile?.phone ?? "",
    line1: profile?.line1 ?? "",
    line2: profile?.line2 ?? "",
    city: profile?.city ?? "",
    state: profile?.state ?? "",
    pincode: profile?.pincode ?? "",
  };
  const [address, setAddress] = useState<Address>(savedAddress);
  const [homeAddress, setHomeAddress] = useState<Address>(savedAddress);
  const [gift, setGift] = useState(false);
  const [recipientName, setRecipientName] = useState("");
  const [recipientPhone, setRecipientPhone] = useState("");
  const [payment, setPayment] = useState("");
  const [remember, setRemember] = useState(Boolean(profile));
  const [errors, setErrors] = useState<Errors>({});

  function set<K extends keyof Address>(key: K, value: Address[K]) {
    setAddress((current) => ({ ...current, [key]: value }));
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    const nextErrors = validate(address, payment, gift, recipientName, recipientPhone);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0 || lines.length === 0) return;

    const method = paymentMethods.find((item) => item.id === payment);
    const order = placeOrder({
      items: lines.map((line) => ({
        productId: line.productId,
        slug: line.product.slug,
        name: line.product.name,
        image: line.product.image,
        variantId: line.variantId,
        variantLabel: line.variant.label,
        unitPrice: line.variant.price,
        quantity: line.quantity,
      })),
      address: {
        ...address,
        fullName: (gift ? recipientName : address.fullName).trim(),
        email: address.email.trim(),
        phone: (gift ? recipientPhone : address.phone).replace(/\s+/g, ""),
        line1: address.line1.trim(),
        line2: address.line2.trim(),
        city: address.city.trim(),
        pincode: address.pincode.trim(),
      },
      paymentMethod: method?.label ?? payment,
      subtotal: summary.subtotal,
      discount: summary.discount,
      delivery: summary.delivery,
      total: summary.total,
      promoCode,
    });
    if (remember) {
      const street = gift ? homeAddress : address;
      saveProfile({
        name: address.fullName.trim(),
        email: address.email.trim(),
        phone: address.phone.replace(/\s+/g, ""),
        line1: street.line1.trim(),
        line2: street.line2.trim(),
        city: street.city.trim(),
        state: street.state,
        pincode: street.pincode.trim(),
      });
    }
    clear();
    navigate(`/order/${order.id}`);
  }

  return (
    <PageWidth className="py-12">
      <Seo
        title="Checkout — THE ORIGINAL"
        description="Enter a delivery address and choose a demonstration payment method. No payment is collected."
      />
      <p className="text-[12px] tracking-[0.2em] uppercase text-gold">Checkout</p>
      <h1 className="mt-3 font-serif text-5xl font-medium text-navy">Delivery details</h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-mute">
        This checkout records an order on this device. It does not charge a card, open a UPI request, or book a courier.
      </p>

      {lines.length === 0 ? (
        <div className="mt-10 border border-line bg-ivory px-6 py-12">
          <h2 className="font-serif text-3xl text-navy">There is nothing to check out.</h2>
          <Link to="/shop" className={`${btnPrimary} mt-6`}>
            Return to the shop
          </Link>
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-8">
            <section className="space-y-4">
              <h2 className="font-serif text-3xl text-navy">Customer</h2>
              <Field id="fullName" label="Full name" error={errors.fullName}>
                <input
                  id="fullName"
                  value={address.fullName}
                  onChange={(event) => set("fullName", event.target.value)}
                  className={fieldClass}
                  autoComplete="name"
                  aria-invalid={Boolean(errors.fullName)}
                  aria-describedby={errors.fullName ? "fullName-error" : undefined}
                />
              </Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field id="email" label="Email" error={errors.email}>
                  <input
                    id="email"
                    type="email"
                    value={address.email}
                    onChange={(event) => set("email", event.target.value)}
                    className={fieldClass}
                    autoComplete="email"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                </Field>
                <Field id="phone" label="Mobile" error={errors.phone}>
                  <input
                    id="phone"
                    inputMode="numeric"
                    value={address.phone}
                    onChange={(event) => set("phone", event.target.value)}
                    className={fieldClass}
                    autoComplete="tel"
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                  />
                </Field>
              </div>
            </section>

            <section className="space-y-4">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <h2 className="font-serif text-3xl text-navy">{gift ? "Gift address" : "Delivery address"}</h2>
                <div className="flex flex-wrap gap-4">
                  {!gift && profile?.line1 ? (
                    <button
                      type="button"
                      className="text-sm font-semibold text-navy underline"
                      onClick={() => {
                        setAddress(savedAddress);
                        setErrors({});
                      }}
                    >
                      Use saved address
                    </button>
                  ) : null}
                  <label className="flex items-center gap-2 text-sm font-medium text-navy">
                    <input
                      type="checkbox"
                      checked={gift}
                      onChange={(event) => {
                        const next = event.target.checked;
                        if (next) {
                          setHomeAddress(address);
                          setAddress((current) => ({
                            ...current,
                            line1: "",
                            line2: "",
                            city: "",
                            state: "",
                            pincode: "",
                          }));
                        } else {
                          setAddress((current) => ({
                            ...homeAddress,
                            fullName: current.fullName,
                            email: current.email,
                            phone: current.phone,
                          }));
                          setRecipientName("");
                          setRecipientPhone("");
                        }
                        setGift(next);
                        setErrors({});
                      }}
                    />
                    Gift it to someone
                  </label>
                </div>
              </div>
              <p className="text-sm leading-6 text-mute">
                {gift
                  ? "Your name stays on the order. The parcel is addressed to the person below, and your saved address is left as it is."
                  : "This starts from the address saved on this device. Change any line for this order, or send it as a gift."}
              </p>
              {gift ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field id="recipientName" label="Recipient name" error={errors.recipientName}>
                    <input
                      id="recipientName"
                      value={recipientName}
                      onChange={(event) => setRecipientName(event.target.value)}
                      className={fieldClass}
                      autoComplete="name"
                      aria-invalid={Boolean(errors.recipientName)}
                      aria-describedby={errors.recipientName ? "recipientName-error" : undefined}
                    />
                  </Field>
                  <Field id="recipientPhone" label="Recipient mobile" error={errors.recipientPhone}>
                    <input
                      id="recipientPhone"
                      inputMode="numeric"
                      value={recipientPhone}
                      onChange={(event) => setRecipientPhone(event.target.value)}
                      className={fieldClass}
                      autoComplete="tel"
                      aria-invalid={Boolean(errors.recipientPhone)}
                      aria-describedby={errors.recipientPhone ? "recipientPhone-error" : undefined}
                    />
                  </Field>
                </div>
              ) : null}
              <Field id="line1" label="Address" error={errors.line1}>
                <input
                  id="line1"
                  value={address.line1}
                  onChange={(event) => set("line1", event.target.value)}
                  className={fieldClass}
                  autoComplete="address-line1"
                  aria-invalid={Boolean(errors.line1)}
                  aria-describedby={errors.line1 ? "line1-error" : undefined}
                />
              </Field>
              <Field id="line2" label="Apartment, floor (optional)">
                <input
                  id="line2"
                  value={address.line2}
                  onChange={(event) => set("line2", event.target.value)}
                  className={fieldClass}
                  autoComplete="address-line2"
                />
              </Field>
              <div className="grid gap-4 sm:grid-cols-3">
                <Field id="city" label="City" error={errors.city}>
                  <input
                    id="city"
                    value={address.city}
                    onChange={(event) => set("city", event.target.value)}
                    className={fieldClass}
                    autoComplete="address-level2"
                    aria-invalid={Boolean(errors.city)}
                    aria-describedby={errors.city ? "city-error" : undefined}
                  />
                </Field>
                <Field id="state" label="State" error={errors.state}>
                  <select
                    id="state"
                    value={address.state}
                    onChange={(event) => set("state", event.target.value)}
                    className={fieldClass}
                    aria-invalid={Boolean(errors.state)}
                    aria-describedby={errors.state ? "state-error" : undefined}
                  >
                    <option value="">Select</option>
                    {indianStates.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field id="pincode" label="PIN code" error={errors.pincode}>
                  <input
                    id="pincode"
                    inputMode="numeric"
                    value={address.pincode}
                    onChange={(event) => set("pincode", event.target.value)}
                    className={fieldClass}
                    autoComplete="postal-code"
                    aria-invalid={Boolean(errors.pincode)}
                    aria-describedby={errors.pincode ? "pincode-error" : undefined}
                  />
                </Field>
              </div>
            </section>

            <fieldset>
              <legend className="font-serif text-3xl text-navy">Payment method</legend>
              <p className="mt-2 text-sm leading-6 text-mute">
                Demonstration only. No card number, UPI ID or bank login is requested, and nothing is charged.
              </p>
              <div className="mt-4 space-y-2">
                {paymentMethods.map((method) => (
                  <label key={method.id} className={`flex cursor-pointer gap-3 border px-4 py-3 ${payment === method.id ? "border-navy bg-ivory" : "border-line"}`}>
                    <input
                      type="radio"
                      name="payment"
                      value={method.id}
                      checked={payment === method.id}
                      onChange={() => setPayment(method.id)}
                      className="mt-1"
                    />
                    <span>
                      <span className="block text-sm">{method.label}</span>
                      <span className="block text-xs text-mute">{method.note}</span>
                    </span>
                  </label>
                ))}
              </div>
              {errors.payment ? (
                <p className="mt-2 text-sm text-danger" role="alert">
                  {errors.payment}
                </p>
              ) : null}
            </fieldset>

            <label className="flex items-start gap-3 text-sm">
              <input
                type="checkbox"
                checked={remember}
                onChange={(event) => setRemember(event.target.checked)}
                className="mt-1"
              />
              <span>
                {gift
                  ? "Keep my own saved address for next time. The gift address is used only for this order."
                  : "Save this address on this device so the next checkout starts with it."}
              </span>
            </label>

            <button type="submit" className={btnPrimary}>
              Place order
            </button>
          </div>

          <aside className="h-fit border border-line bg-ivory p-6">
            <h2 className="font-serif text-3xl text-navy">Order summary</h2>
            <ul className="mt-5 space-y-4">
              {lines.map((line) => (
                <li key={`${line.productId}-${line.variantId}`} className="flex gap-3">
                  <ProductImage src={line.product.image} alt="" className="h-16 w-16 object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm">{line.product.name}</p>
                    <p className="text-xs text-mute">
                      {line.variant.label} × {line.quantity}
                    </p>
                  </div>
                  <p className="text-sm">{formatINR(line.lineTotal)}</p>
                </li>
              ))}
            </ul>
            <dl className="mt-5 space-y-2 border-t border-line pt-4 text-sm">
              <div className="flex justify-between"><dt>Subtotal</dt><dd>{formatINR(summary.subtotal)}</dd></div>
              {summary.discount > 0 ? (
                <div className="flex justify-between"><dt>Discount</dt><dd>−{formatINR(summary.discount)}</dd></div>
              ) : null}
              <div className="flex justify-between"><dt>Delivery</dt><dd>{summary.delivery === 0 ? "Free" : formatINR(summary.delivery)}</dd></div>
              <div className="flex justify-between pt-2 text-base font-medium"><dt>Total</dt><dd>{formatINR(summary.total)}</dd></div>
            </dl>
          </aside>
        </form>
      )}
    </PageWidth>
  );
}
