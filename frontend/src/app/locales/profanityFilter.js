import leoProfanity from 'leo-profanity';

leoProfanity.loadDictionary('en');

const ruDictionary = leoProfanity.getDictionary('ru');
leoProfanity.add(ruDictionary);

const filterText = (text) => leoProfanity.clean(text);

export default filterText;
