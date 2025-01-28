export const COUNTRY_COUNT_FORMS = ['страну', 'страны', 'стран']

export const normalizeCountForm = (number: number, words_arr: string[] | 'country') => {
  const count_forms = {
    country: COUNTRY_COUNT_FORMS,
  }

  number = Math.abs(number)
  if (Number.isInteger(number)) {
    const options = [2, 0, 1, 1, 1, 2]
    const formsToNormalize = Array.isArray(words_arr) ? words_arr : count_forms[words_arr]
    return formsToNormalize[
      number % 100 > 4 && number % 100 < 20 ? 2 : options[number % 10 < 5 ? number % 10 : 5]
    ]
  }
  return words_arr[1]
}
