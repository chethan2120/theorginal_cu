export const DELIVERY_FEE = 79;
export const FREE_DELIVERY_AT = 1499;

export const promoRates: Record<string, number> = {
  ORIGINAL10: 0.1,
};

export const paymentMethods = [
  {
    id: "upi",
    label: "UPI",
    note: "Shown for the checkout layout. No UPI request is sent.",
  },
  {
    id: "card",
    label: "Debit or credit card",
    note: "Shown for the checkout layout. Card details are not collected.",
  },
  {
    id: "netbanking",
    label: "Net banking",
    note: "Shown for the checkout layout. No bank is contacted.",
  },
  {
    id: "cod",
    label: "Cash on delivery",
    note: "Recorded as a preference only. No courier is booked.",
  },
] as const;

export const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];

export const nutritionNote =
  "Nutritional values have not been supplied for this sample listing. A table will be added here only after the client provides the figures printed on the pack.";

export const storageFallback =
  "Keep the pack sealed, in a cool dry cupboard, away from steam and strong smells. This is general guidance for the sample listing, not a laboratory instruction.";
