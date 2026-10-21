import { CardRail, helpLink, type RailCard } from "@unis/ui";

/**
 * New & noteworthy — every card points at a page that exists today (the old
 * /blog/* links were dead). Images are the web-sized .webp copies in /public.
 */
const CARDS: RailCard[] = [
  {
    title: "Why Unis starts in Harlem",
    description: "How a neighborhood gets its own charts, and why Unis opens one place at a time.",
    href: "/jurisdictions",
    image: "/why.webp",
  },
  {
    title: "Where every dollar goes",
    description: "Song sales, Unis Plus and the Community Share, worked through line by line.",
    href: "/math",
    image: "/themathBehind.webp",
  },
  {
    title: "A win that never expires",
    description: "Every Song and Artist of the Day stays on its neighborhood's record for good.",
    href: helpLink("awards"),
    image: "/artistOfTheDay.webp",
  },
  {
    title: "Your fans, block by block",
    description: "What your dashboard shows you about who's listening, and where.",
    href: "#know-your-fans",
    image: "/jurisdictionAnalytics.webp",
  },
  {
    title: "Your music stays yours",
    description: "What the license covers, what it doesn't, and how to leave whenever you want.",
    href: "/ownership",
    image: "/07.webp",
  },
];

export function NewAndNoteworthy() {
  return <CardRail eyebrow="New & noteworthy" headline="Go deeper." cards={CARDS} />;
}
