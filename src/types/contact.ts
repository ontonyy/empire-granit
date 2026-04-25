export interface ContactInfo {
  company: string;
  phoneDisplay: string;
  phoneLink: string;
  email: string;
  whatsapp: string;
  address: string;
  mapEmbedUrl: string;
}

export interface ServiceOffer {
  id: string;
  title: string;
  description: string;
  features: string[];
}
