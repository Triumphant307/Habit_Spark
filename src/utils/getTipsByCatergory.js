import tips from "../data/tips.json";
export const getTipsByCategory = (category = "All", favorites = []) => {
  if (category === "All") return tips;

  if (category === "Favorites") {
    return tips.filter((tip) => favorites.includes(tip.id));
  }

  return tips.filter((tip) => tip.category === category);
};
