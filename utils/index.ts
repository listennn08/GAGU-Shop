export const toCash = (val: number) =>
  val ? `$${val.toLocaleString('en')}` : ''
export const hideContent = (text: string) => {
  const t = text.replace(/ /g, '').replace(/\n/g, '')
  return t.length > 40 ? `${t.substring(0, 37)}...` : t
}
export const hideTitle = (text: string) =>
  text.length > 10 ? `${text.substring(0, 9)}...` : text
export const replaceTab = (s: string) =>
  s.replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;')

export const kebabToUpper = (s: string) => s.replace(/-/g, ' ').toUpperCase()

export const hideTel = (s: string) =>
  s.replace(/(\d{4})\d{3}(\d{3})/, '$1-***-$2')
