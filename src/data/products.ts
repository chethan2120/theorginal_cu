import type { CategoryId, Product, Variant } from "../types.ts";

function pack(prices: [number, number, number, number]): Variant[] {
  const sizes = [
    ["100g", "100 g"],
    ["250g", "250 g"],
    ["500g", "500 g"],
    ["1kg", "1 kg"],
  ] as const;
  return sizes.map(([id, label], index) => ({
    id,
    label,
    price: prices[index],
    detail: `Net ${label}`,
  }));
}

function boxes(
  prices: [number, number, number],
  details: [string, string, string],
): Variant[] {
  const sizes = ["classic", "grand", "reserve"] as const;
  const labels = ["Classic", "Grand", "Reserve"] as const;
  return sizes.map((id, index) => ({
    id,
    label: labels[index],
    price: prices[index],
    detail: details[index],
  }));
}

const keepDry =
  "Keep the pack sealed, in a cool dry cupboard, away from steam and strong smells. This is general guidance for the sample listing.";

export const products: Product[] = [
  {
    id: "turmeric-powder",
    slug: "turmeric-powder",
    name: "Turmeric Powder",
    summary: "Fine yellow powder for everyday cooking.",
    description:
      "A sample listing for ground turmeric. The colour in the photograph is the powder itself. Price and pack weight are placeholders until the client’s own stock list is added.",
    keywords: "haldi turmeric powder spice",
    categories: ["spices"],
    image: "/images/products/turmeric-powder.jpg",
    imageAlt: "Close view of bright yellow turmeric powder",
    ingredients: ["Turmeric powder"],
    storage: keepDry,
    variants: pack([90, 195, 360, 680]),
    bestseller: true,
  },
  {
    id: "red-chilli-powder",
    slug: "red-chilli-powder",
    name: "Red Chilli Powder",
    summary: "Ground red chilli with a warm heat.",
    description:
      "A sample listing for red chilli powder. The photograph shows ground chilli beside a dried pod so the ingredient is easy to recognise. Heat level will be confirmed when the client names the chilli used.",
    keywords: "lal mirch chilli powder red spice",
    categories: ["spices"],
    image: "/images/products/red-chilli-powder.jpg",
    imageAlt: "Ground red chilli on a spoon beside a dried red chilli",
    ingredients: ["Red chilli powder"],
    storage: keepDry,
    variants: pack([85, 185, 340, 640]),
    bestseller: true,
  },
  {
    id: "black-pepper",
    slug: "black-pepper",
    name: "Black Pepper",
    summary: "Whole black peppercorns.",
    description:
      "A sample listing for whole black peppercorns. They are sold by the weight you choose. A ground option can be added when the client offers one.",
    keywords: "kali mirch peppercorn black pepper spice",
    categories: ["spices"],
    image: "/images/products/black-pepper.jpg",
    imageAlt: "A close pile of whole black peppercorns",
    ingredients: ["Whole black peppercorns"],
    storage: keepDry,
    variants: pack([140, 320, 590, 1100]),
    bestseller: true,
  },
  {
    id: "green-cardamom",
    slug: "green-cardamom",
    name: "Green Cardamom",
    summary: "Whole green pods.",
    description:
      "A sample listing for whole green cardamom pods. The photograph is a tight crop of the pods. Pod size and grade are not stated because the client has not supplied them.",
    keywords: "elaichi cardamom green pods spice",
    categories: ["spices"],
    image: "/images/products/green-cardamom.jpg",
    imageAlt: "Whole green cardamom pods filling the frame",
    ingredients: ["Green cardamom pods"],
    storage: keepDry,
    variants: pack([320, 760, 1450, 2750]),
    bestseller: true,
  },
  {
    id: "cinnamon",
    slug: "cinnamon",
    name: "Cinnamon",
    summary: "Quills for sweet and savoury pots.",
    description:
      "A sample listing for cinnamon quills. The photograph shows sticks on linen. Bark type and length will be updated from the client’s pack.",
    keywords: "dalchini cinnamon quill spice",
    categories: ["spices"],
    image: "/images/products/cinnamon.jpg",
    imageAlt: "Cinnamon sticks resting on a light linen cloth",
    ingredients: ["Cinnamon quills"],
    storage: keepDry,
    variants: pack([120, 270, 490, 920]),
  },
  {
    id: "cloves",
    slug: "cloves",
    name: "Cloves",
    summary: "Whole dried clove buds.",
    description:
      "A sample listing for whole cloves. The photograph shows the buds loose on a cool surface, with a spoon of cloves at the edge.",
    keywords: "laung clove buds spice",
    categories: ["spices"],
    image: "/images/products/cloves.jpg",
    imageAlt: "Whole dried cloves scattered beside a metal spoon",
    ingredients: ["Whole cloves"],
    storage: keepDry,
    variants: pack([160, 370, 690, 1280]),
  },
  {
    id: "cumin-seeds",
    slug: "cumin-seeds",
    name: "Cumin Seeds",
    summary: "Whole cumin for tempering.",
    description:
      "A sample listing for whole cumin seeds. The photograph shows the seeds in a wooden spoon over a bowl of the same seeds.",
    keywords: "jeera cumin seeds spice",
    categories: ["spices"],
    image: "/images/products/cumin-seeds.jpg",
    imageAlt: "Cumin seeds held in a wooden spoon over a wooden bowl",
    ingredients: ["Cumin seeds"],
    storage: keepDry,
    variants: pack([70, 155, 280, 520]),
  },
  {
    id: "coriander-powder",
    slug: "coriander-powder",
    name: "Coriander Powder",
    summary: "Ground coriander for the sample catalogue.",
    description:
      "This listing stands in for coriander powder. The photograph currently shows whole coriander seed, because a powder photograph was not available. Swap the image for the client’s ground coriander before the shop goes live.",
    keywords: "dhania coriander powder seed spice",
    categories: ["spices"],
    image: "/images/products/coriander.jpg",
    imageAlt: "Whole coriander seeds, used as a stand-in for coriander powder",
    imageNote:
      "Stand-in photograph of whole coriander seed. Replace with the client’s coriander powder.",
    photoCaption: "Photograph shows whole seed",
    ingredients: ["Coriander powder"],
    ingredientNote:
      "The ingredient line is the requested powder. It is not a tested recipe.",
    storage: keepDry,
    variants: pack([65, 145, 260, 480]),
  },
  {
    id: "garam-masala",
    slug: "garam-masala",
    name: "Garam Masala",
    summary: "A ground spice blend.",
    description:
      "A sample listing for garam masala. The photograph is a spice counter where a garam masala bin is visible among other spices. The blend below is a placeholder, not the client’s recipe.",
    keywords: "garam masala blend spice",
    categories: ["spices"],
    image: "/images/products/garam-masala.jpg",
    imageAlt: "Spice counter with a bin labelled garam masala",
    imageNote:
      "Spice-counter photograph. A garam masala bin is visible among other spices.",
    ingredients: [
      "Coriander",
      "Cumin",
      "Black pepper",
      "Cloves",
      "Cinnamon",
      "Cardamom",
    ],
    ingredientNote:
      "Sample blend for the layout only. Replace with the client’s actual mix and proportions.",
    storage: keepDry,
    variants: pack([110, 250, 460, 860]),
    bestseller: true,
  },
  {
    id: "almonds",
    slug: "almonds",
    name: "Almonds",
    summary: "Whole almonds with the skin on.",
    description:
      "A sample listing for whole almonds. The photograph is a shallow view of almonds on a pale surface. Grade and origin are not stated.",
    keywords: "badam almond nuts dry fruit",
    categories: ["dry-fruits", "nuts-seeds"],
    image: "/images/products/almonds.jpg",
    imageAlt: "Whole brown almonds on a pale surface",
    ingredients: ["Almonds"],
    storage:
      "Keep sealed in a cool dry cupboard. After opening, finish the pack while the nuts are still fresh. This is general guidance for the sample listing.",
    variants: pack([150, 340, 640, 1200]),
    bestseller: true,
  },
  {
    id: "cashews",
    slug: "cashews",
    name: "Cashews",
    summary: "Whole pale cashews.",
    description:
      "A sample listing for whole cashews. The photograph is a close field of cashews. Size grade is not stated.",
    keywords: "kaju cashew nuts dry fruit",
    categories: ["dry-fruits", "nuts-seeds"],
    image: "/images/products/cashews.jpg",
    imageAlt: "A close field of whole pale cashews",
    ingredients: ["Cashews"],
    storage:
      "Keep sealed in a cool dry cupboard. This is general guidance for the sample listing.",
    variants: pack([180, 420, 790, 1490]),
    bestseller: true,
  },
  {
    id: "pistachios",
    slug: "pistachios",
    name: "Pistachios",
    summary: "Pistachios in the shell.",
    description:
      "A sample listing for in-shell pistachios. The photograph shows shells, a few of them open. A kernel-only pack can be added if the client sells one.",
    keywords: "pista pistachio nuts dry fruit",
    categories: ["dry-fruits", "nuts-seeds"],
    image: "/images/products/pistachios.jpg",
    imageAlt: "In-shell pistachios, a few shells open to show the kernel",
    ingredients: ["Pistachios in shell"],
    storage:
      "Keep sealed in a cool dry cupboard. This is general guidance for the sample listing.",
    variants: pack([240, 560, 1050, 1980]),
    bestseller: true,
  },
  {
    id: "walnuts",
    slug: "walnuts",
    name: "Walnuts",
    summary: "Walnuts in the shell.",
    description:
      "A sample listing for in-shell walnuts. The photograph is a tight stack of whole shells. Kernel halves can be listed separately when the client has that pack.",
    keywords: "akhrot walnut nuts dry fruit",
    categories: ["dry-fruits", "nuts-seeds"],
    image: "/images/products/walnuts.jpg",
    imageAlt: "Whole walnuts in their shells",
    ingredients: ["Walnuts in shell"],
    storage:
      "Keep sealed in a cool dry cupboard. This is general guidance for the sample listing.",
    variants: pack([170, 390, 730, 1380]),
  },
  {
    id: "raisins",
    slug: "raisins",
    name: "Raisins",
    summary: "Dried grapes, mixed in colour.",
    description:
      "A sample listing for raisins. The photograph shows a bowl of golden and darker raisins. Variety is not named.",
    keywords: "kishmish raisins dry fruit",
    categories: ["dry-fruits"],
    image: "/images/products/raisins.jpg",
    imageAlt: "Golden and dark raisins in a white bowl",
    ingredients: ["Raisins"],
    storage:
      "Keep sealed so they stay soft, in a cool dry cupboard. This is general guidance for the sample listing.",
    variants: pack([80, 175, 320, 590]),
  },
  {
    id: "dates",
    slug: "dates",
    name: "Dates",
    summary: "Whole dried dates.",
    description:
      "A sample listing for whole dates. The photograph is a close pile of dates. Variety, pit or seedless, will be confirmed from the client’s pack.",
    keywords: "khajoor dates dry fruit",
    categories: ["dry-fruits"],
    image: "/images/products/dates.jpg",
    imageAlt: "A close pile of whole dried dates",
    ingredients: ["Dates"],
    storage:
      "Keep sealed in a cool dry cupboard. This is general guidance for the sample listing.",
    variants: pack([110, 250, 460, 860]),
    bestseller: true,
  },
  {
    id: "dried-figs",
    slug: "dried-figs",
    name: "Dried Figs",
    summary: "Whole dried figs.",
    description:
      "A sample listing for dried figs. The photograph is a shop display of figs. Another retailer’s price label is visible in the frame, so this image should be replaced before launch.",
    keywords: "anjeer fig dried dry fruit",
    categories: ["dry-fruits"],
    image: "/images/products/dried-figs.jpg",
    imageAlt: "Dried figs in a shop display case",
    imageNote:
      "Market display. Another shop’s price label is in the frame. Replace with the client’s own photograph.",
    photoCaption: "Display photo includes another shop’s label",
    ingredients: ["Dried figs"],
    storage:
      "Keep sealed in a cool dry cupboard. This is general guidance for the sample listing.",
    variants: pack([140, 320, 590, 1100]),
  },
  {
    id: "pumpkin-seeds",
    slug: "pumpkin-seeds",
    name: "Pumpkin Seeds",
    summary: "Hulled pumpkin seeds.",
    description:
      "A sample listing for hulled pumpkin seeds. The photograph is a close crop of the pale seeds. Roast or raw will be stated when the client confirms the pack.",
    keywords: "pumpkin seeds pepitas nuts",
    categories: ["nuts-seeds"],
    image: "/images/products/pumpkin-seeds.jpg",
    imageAlt: "A close pile of hulled pumpkin seeds",
    ingredients: ["Pumpkin seeds"],
    storage:
      "Keep sealed in a cool dry cupboard. This is general guidance for the sample listing.",
    variants: pack([90, 200, 370, 690]),
  },
  {
    id: "royal-spice-vault",
    slug: "royal-spice-vault",
    name: "Royal Spice Vault",
    summary: "A sample assortment of the spice range.",
    description:
      "A sample gift box built from the spice listings on this site. The photograph shows three bowls — salt, chilli and dried herbs — as a stand-in for the packed box. Box weights are not fixed; choose a size and the contents note explains the sample assortment.",
    keywords: "gift box spice hamper combo",
    categories: ["gifts"],
    image: "/images/products/royal-spice-vault.jpg",
    imageAlt: "Three wooden bowls holding salt, chilli flakes and dried herbs",
    imageNote:
      "Stand-in photograph of spice bowls, not the finished box. Replace with the packed hamper.",
    photoCaption: "Collection stand-in",
    ingredients: ["See the sample contents for this size"],
    ingredientNote: "Contents are a layout example, not a packed recipe.",
    contents: [
      "Turmeric powder",
      "Red chilli powder",
      "Black pepper",
      "Green cardamom",
      "Cinnamon",
      "Cloves",
      "Cumin seeds",
      "Coriander powder",
      "Garam masala",
    ],
    storage:
      "Leave each inner pack sealed until it is used. Store the box in a cool dry place.",
    variants: boxes(
      [1290, 2190, 3490],
      [
        "Sample set of smaller inner packs",
        "Sample set of medium inner packs",
        "Sample set of larger inner packs",
      ],
    ),
    bestseller: true,
  },
  {
    id: "imperial-dry-fruit",
    slug: "imperial-dry-fruit",
    name: "Imperial Dry Fruit Treasure",
    summary: "A sample mix of nuts and dried fruit.",
    description:
      "A sample gift box of nuts and dried fruit. The photograph shows a mixed pile — almonds, cashews, pecans and macadamias — and is not a picture of a finished THE ORIGINAL box. The contents list is a placeholder.",
    keywords: "gift box dry fruit nuts hamper combo",
    categories: ["gifts"],
    image: "/images/products/imperial-dry-fruit.jpg",
    imageAlt: "Mixed nuts spilled from a glass jar onto a pale surface",
    imageNote:
      "Mixed-nut photograph, including nuts that may not be in the final box. Replace with the packed hamper.",
    photoCaption: "Mixed nuts, not the finished box",
    ingredients: ["See the sample contents for this size"],
    ingredientNote: "Contents are a layout example, not a packed recipe.",
    contents: [
      "Almonds",
      "Cashews",
      "Pistachios",
      "Walnuts",
      "Raisins",
      "Dates",
      "Dried figs",
    ],
    storage: "Keep the box sealed, in a cool dry cupboard.",
    variants: boxes(
      [1590, 2690, 4290],
      [
        "Sample assortment, smaller box",
        "Sample assortment, medium box",
        "Sample assortment, larger box",
      ],
    ),
    bestseller: true,
  },
  {
    id: "celebration-hamper",
    slug: "celebration-hamper",
    name: "Celebration Hamper",
    summary: "A sample hamper of spices and dry fruits.",
    description:
      "A sample celebration box that pairs a few spices with a few dry fruits. The photograph is a stack of gift boxes used only as a packaging reference. It is not the client’s hamper.",
    keywords: "gift box hamper combo celebration",
    categories: ["gifts"],
    image: "/images/products/celebration-hamper.jpg",
    imageAlt: "A stack of wrapped gift boxes on a glass table",
    imageNote:
      "Generic gift boxes used as a packaging reference. Replace with the client’s hamper.",
    photoCaption: "Packaging reference",
    ingredients: ["See the sample contents for this size"],
    ingredientNote: "Contents are a layout example, not a packed recipe.",
    contents: [
      "Green cardamom",
      "Cinnamon",
      "Garam masala",
      "Almonds",
      "Cashews",
      "Pistachios",
      "Dates",
      "Raisins",
    ],
    storage: "Keep the box sealed, in a cool dry cupboard.",
    variants: boxes(
      [1890, 3190, 4990],
      [
        "Sample hamper, smaller box",
        "Sample hamper, medium box",
        "Sample hamper, larger box",
      ],
    ),
  },
];

export const categories: {
  id: CategoryId | "all";
  label: string;
  blurb: string;
}[] = [
  { id: "all", label: "All products", blurb: "The full sample catalogue." },
  {
    id: "spices",
    label: "Spices",
    blurb: "Powders, pods, seeds and one ground blend.",
  },
  {
    id: "dry-fruits",
    label: "Dry fruits",
    blurb: "Nuts, raisins, dates and figs.",
  },
  {
    id: "nuts-seeds",
    label: "Nuts and seeds",
    blurb: "Almonds, cashews, pistachios, walnuts and pumpkin seeds.",
  },
  {
    id: "gifts",
    label: "Gift boxes and combos",
    blurb: "Sample assortments for gifting.",
  },
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function lowestPrice(product: Product) {
  return Math.min(...product.variants.map((variant) => variant.price));
}

export function defaultVariant(product: Product) {
  return (
    product.variants.find((variant) => variant.id === "250g") ??
    product.variants[0]
  );
}

export function findVariant(product: Product, variantId: string) {
  return (
    product.variants.find((variant) => variant.id === variantId) ??
    defaultVariant(product)
  );
}

export function filterProducts(options: {
  category?: string;
  query?: string;
  sort?: string;
}) {
  const category = options.category && options.category !== "all"
    ? options.category
    : "";
  const query = options.query?.trim().toLowerCase() ?? "";

  let list = products.filter((product) => {
    if (category && !product.categories.includes(category as CategoryId)) {
      return false;
    }
    if (!query) return true;
    const haystack = [
      product.name,
      product.summary,
      product.description,
      product.keywords,
      product.ingredients.join(" "),
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(query);
  });

  const priceOf = (product: Product) => lowestPrice(product);
  const sort = options.sort ?? "featured";
  if (sort === "price-asc") {
    list = [...list].sort((a, b) => priceOf(a) - priceOf(b));
  } else if (sort === "price-desc") {
    list = [...list].sort((a, b) => priceOf(b) - priceOf(a));
  } else if (sort === "name") {
    list = [...list].sort((a, b) => a.name.localeCompare(b.name));
  } else {
    list = [...list].sort(
      (a, b) => Number(b.bestseller) - Number(a.bestseller) || a.name.localeCompare(b.name),
    );
  }
  return list;
}

export function relatedProducts(product: Product, limit = 4) {
  return products
    .filter(
      (item) =>
        item.id !== product.id &&
        item.categories.some((category) => product.categories.includes(category)),
    )
    .slice(0, limit);
}

export function categoryCount(id: CategoryId | "all") {
  if (id === "all") return products.length;
  return products.filter((product) => product.categories.includes(id)).length;
}
