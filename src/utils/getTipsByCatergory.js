import tips from '../data/tips.json'
export const getTipsByCategory = (category) => {
    return category === 'All'
     ? tips
    : tips.filter(tip => tip.category === category)
}