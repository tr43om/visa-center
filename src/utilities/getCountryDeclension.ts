import cases from '@public/merged_countries.json'

export const getCountryDeclension = (
  label: string,
  declension: 'im' | 'ro' | 'da' | 'vi' | 'tv' | 'pr',
) => {
  return cases.find((country) => country.name_ru === label)!.cases[declension]
}
