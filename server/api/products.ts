import { getAllProducts } from '~~/services/frontend'

export default defineEventHandler(async (event) => {
  try {
    const resp = await getAllProducts()
    return [...resp.data.data].map((el) => {
      const tmpEl = el
      tmpEl.quantity = 1
      tmpEl.store = parseInt(JSON.parse(tmpEl.options).store, 10)
      tmpEl.isLoading = false
      return tmpEl
    })
  } catch (e) {
    console.error(e)
    return null
  }
})
