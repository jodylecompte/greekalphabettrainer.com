export type PronunciationMode = "erasmian" | "english" | "modern";

export type GreekLetter = {
  id: string;
  upper: string;
  lower: string;
  name: string;
  pronunciations: Record<PronunciationMode, string>;
};

export const GREEK_LETTERS: GreekLetter[] = [
  {
    id: "alpha",
    upper: "Α",
    lower: "α",
    name: "alpha",
    pronunciations: {
      erasmian: "AL-fuh",
      english: "AL-fuh",
      modern: "AHL-fah",
    },
  },
  {
    id: "beta",
    upper: "Β",
    lower: "β",
    name: "beta",
    pronunciations: {
      erasmian: "BAY-tuh",
      english: "BEE-tuh",
      modern: "VEE-tah",
    },
  },
  {
    id: "gamma",
    upper: "Γ",
    lower: "γ",
    name: "gamma",
    pronunciations: {
      erasmian: "GAM-uh",
      english: "GAM-uh",
      modern: "YAH-mah",
    },
  },
  {
    id: "delta",
    upper: "Δ",
    lower: "δ",
    name: "delta",
    pronunciations: {
      erasmian: "DEL-tuh",
      english: "DEL-tuh",
      modern: "THEL-tah",
    },
  },
  {
    id: "epsilon",
    upper: "Ε",
    lower: "ε",
    name: "epsilon",
    pronunciations: {
      erasmian: "EP-suh-lon",
      english: "EP-suh-lon",
      modern: "EP-see-lon",
    },
  },
  {
    id: "zeta",
    upper: "Ζ",
    lower: "ζ",
    name: "zeta",
    pronunciations: {
      erasmian: "ZAY-tuh",
      english: "ZEE-tuh",
      modern: "ZEE-tah",
    },
  },
  {
    id: "eta",
    upper: "Η",
    lower: "η",
    name: "eta",
    pronunciations: {
      erasmian: "AY-tuh",
      english: "EE-tuh",
      modern: "EE-tah",
    },
  },
  {
    id: "theta",
    upper: "Θ",
    lower: "θ",
    name: "theta",
    pronunciations: {
      erasmian: "THAY-tuh",
      english: "THAY-tuh",
      modern: "THEE-tah",
    },
  },
  {
    id: "iota",
    upper: "Ι",
    lower: "ι",
    name: "iota",
    pronunciations: {
      erasmian: "eye-OH-tuh",
      english: "eye-OH-tuh",
      modern: "EE-oh-tah",
    },
  },
  {
    id: "kappa",
    upper: "Κ",
    lower: "κ",
    name: "kappa",
    pronunciations: {
      erasmian: "KAP-uh",
      english: "KAP-uh",
      modern: "KAH-pah",
    },
  },
  {
    id: "lambda",
    upper: "Λ",
    lower: "λ",
    name: "lambda",
    pronunciations: {
      erasmian: "LAM-duh",
      english: "LAM-bduh",
      modern: "LAHM-thah",
    },
  },
  {
    id: "mu",
    upper: "Μ",
    lower: "μ",
    name: "mu",
    pronunciations: {
      erasmian: "myoo",
      english: "myoo",
      modern: "mee",
    },
  },
  {
    id: "nu",
    upper: "Ν",
    lower: "ν",
    name: "nu",
    pronunciations: {
      erasmian: "new",
      english: "new",
      modern: "nee",
    },
  },
  {
    id: "xi",
    upper: "Ξ",
    lower: "ξ",
    name: "xi",
    pronunciations: {
      erasmian: "ksee",
      english: "zai",
      modern: "ksee",
    },
  },
  {
    id: "omicron",
    upper: "Ο",
    lower: "ο",
    name: "omicron",
    pronunciations: {
      erasmian: "OH-mih-kron",
      english: "OH-mih-kron",
      modern: "OH-mee-kron",
    },
  },
  {
    id: "pi",
    upper: "Π",
    lower: "π",
    name: "pi",
    pronunciations: {
      erasmian: "pie",
      english: "pie",
      modern: "pee",
    },
  },
  {
    id: "rho",
    upper: "Ρ",
    lower: "ρ",
    name: "rho",
    pronunciations: {
      erasmian: "roe",
      english: "roe",
      modern: "roh",
    },
  },
  {
    id: "sigma",
    upper: "Σ",
    lower: "σ",
    name: "sigma",
    pronunciations: {
      erasmian: "SIG-muh",
      english: "SIG-muh",
      modern: "SEEG-mah",
    },
  },
  {
    id: "tau",
    upper: "Τ",
    lower: "τ",
    name: "tau",
    pronunciations: {
      erasmian: "taw",
      english: "taw",
      modern: "taf",
    },
  },
  {
    id: "upsilon",
    upper: "Υ",
    lower: "υ",
    name: "upsilon",
    pronunciations: {
      erasmian: "OOP-sih-lon",
      english: "UP-sih-lon",
      modern: "EEP-see-lon",
    },
  },
  {
    id: "phi",
    upper: "Φ",
    lower: "φ",
    name: "phi",
    pronunciations: {
      erasmian: "fee",
      english: "fie",
      modern: "fee",
    },
  },
  {
    id: "chi",
    upper: "Χ",
    lower: "χ",
    name: "chi",
    pronunciations: {
      erasmian: "kee",
      english: "kai",
      modern: "hee",
    },
  },
  {
    id: "psi",
    upper: "Ψ",
    lower: "ψ",
    name: "psi",
    pronunciations: {
      erasmian: "psee",
      english: "sigh",
      modern: "psee",
    },
  },
  {
    id: "omega",
    upper: "Ω",
    lower: "ω",
    name: "omega",
    pronunciations: {
      erasmian: "oh-MAY-guh",
      english: "oh-MAY-guh",
      modern: "oh-MEH-gah",
    },
  },
];
