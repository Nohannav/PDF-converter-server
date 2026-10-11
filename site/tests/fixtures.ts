export const future = () => {
  const d = new Date();
  d.setDate(d.getDate() + 30);
  return d.toISOString().slice(0, 10);
};

export const validQuote = () => ({
  eventType: "mariage",
  concept: "combi-bar",
  eventDate: future(),
  dateUnknown: false,
  location: "Annecy",
  guests: "100-200",
  fullName: "Camille Martin",
  company: "",
  email: "camille@example.com",
  phone: "06 12 34 56 78",
  contactPreference: "email",
  message: "Mariage en extérieur, nous aimerions un bar pour le vin d'honneur.",
  services: ["bar"],
  budget: "",
  extra: "",
  privacyAccepted: true,
  sendCopy: false,
  website: "",
  startedAt: Date.now() - 60_000,
});
