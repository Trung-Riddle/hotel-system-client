export const createSlug = (string: string) =>
  string
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .split(' ')
    .join('')
    .toUpperCase()
export const generateCodeUnique = (string: string) => createSlug(string) + Date.now().toString(36).toUpperCase()
export const generateCode = (string: string) =>
  string
    .normalize('NFD')
    .replace(/[^a-zA-Z ]/g, '') // Loại bỏ các ký tự không phải là chữ cái và không phải khoảng trắng
    .slice(0, 10)
    .toUpperCase()
    .replace(/ /g, '') // Loại bỏ tất cả khoảng trắng
    .split('')
    .reverse()
    .join('')

export const generateRange = (start: number, end: number) => {
  const length = end - start + 1
  return Array.from({ length }, (_, index) => start + index)
}
