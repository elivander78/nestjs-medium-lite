export function calculateReadingTime(content: string): number {
  // Определите вашу логику расчета времени чтения (например, скорость чтения и количество слов)
  return Math.ceil(content.split(' ').length / 200); // Пример: 200 слов в минуту
}
