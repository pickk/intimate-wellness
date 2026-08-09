export interface Author {
  slug: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  social?: { label: string; url: string }[];
}

export const authors: Record<string, Author> = {
  "dr-emma-hayes": {
    slug: "dr-emma-hayes",
    name: "Dr. Emma Hayes",
    role: "Clinical Sexologist",
    bio: "Dr. Emma Hayes is a certified clinical sexologist with over a decade of experience in sexual health education and relationship counseling. She writes to make evidence-based wellness knowledge approachable for everyone.",
    avatar:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop",
    social: [
      { label: "Email", url: "mailto:emma@intimate-wellness.example" },
    ],
  },
  "marcus-lee": {
    slug: "marcus-lee",
    name: "Marcus Lee",
    role: "Wellness Journalist",
    bio: "Marcus Lee is a wellness journalist specializing in product reviews and consumer health guides. He breaks down complex buying decisions into clear, honest recommendations.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
  },
  "dr-priya-nair": {
    slug: "dr-priya-nair",
    name: "Dr. Priya Nair",
    role: "Relationship Therapist",
    bio: "Dr. Priya Nair is a licensed relationship therapist focused on communication, consent, and intimacy education. Her work centers on building healthier, more connected relationships.",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
  },
};

export function getAuthorBySlug(slug: string): Author | undefined {
  return authors[slug];
}

export function getAllAuthors(): Author[] {
  return Object.values(authors);
}
