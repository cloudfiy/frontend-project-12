import leoProfanity from 'leo-profanity'

leoProfanity.loadDictionary('ru')
const englishDictionary = leoProfanity.getDictionary('en')
leoProfanity.add(englishDictionary)

const filterText = (text) => {
  return leoProfanity.clean(text)
}

export default filterText
