import fs from 'fs'
import path from 'path'

import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)

function mergeCountriesWithCases(countriesPath, casesPath) {
  // Чтение данных из файлов
  const countriesData = JSON.parse(fs.readFileSync(path.join(__dirname, countriesPath), 'utf8'))
  const casesData = JSON.parse(fs.readFileSync(path.join(__dirname, casesPath), 'utf8'))

  // Создаем новый массив для результата
  const mergedCountries = []

  // Обрабатываем каждый элемент из countries.json
  countriesData.forEach((country) => {
    const countryIsoCode = country.iso_code2

    // Проверяем наличие данных о случаях для текущей страны
    if (casesData[countryIsoCode]) {
      // Добавляем объект cases к стране
      const updatedCountry = {
        ...country,
        cases: casesData[countryIsoCode],
      }
      mergedCountries.push(updatedCountry)
    }
  })

  // Записываем результат обратно в файл
  const outputFilePath = path.join(__dirname, 'merged_countries.json')
  fs.writeFileSync(outputFilePath, JSON.stringify(mergedCountries, null, 2))

  console.log(`Результат слияния сохранен в ${outputFilePath}`)
}

// Использование функции
mergeCountriesWithCases('ISO3166_RU.json', 'countries_cases.json')
