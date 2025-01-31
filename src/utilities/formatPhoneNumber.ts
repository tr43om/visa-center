export function formatPhoneNumber(phoneNumber: string): string {
  // Убираем все символы кроме цифр
  const digitsOnly = phoneNumber.replace(/\D/g, '')

  if (digitsOnly.length !== 11) {
    return 'Неверный формат номера'
  }

  // Форматируем номер согласно шаблону
  return `+7 (${digitsOnly.slice(1, 4)}) ${digitsOnly.slice(4, 7)}-${digitsOnly.slice(7, 9)}-${digitsOnly.slice(9)}`
}
