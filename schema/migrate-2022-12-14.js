const axios = require('axios')

require('dotenv').config()

axios.defaults.baseURL = process.env.NUXI_API_BASE
;(async () => {
  const resp = (
    await axios.post('/auth/login', {
      email: process.env.EMAIL,
      password: process.env.PASSWORD,
    })
  ).data

  axios.default.interceptors.request.use((cfg) => {
    cfg.headers['Content-Type'] = 'application/json'
    cfg.headers.Authorization = `Bearer ${resp.token}`
    cfg.headers['Accept-Encoding'] = 'gzip,deflate,compress'
    return cfg
  })

  const products = (await axios.get(`/${resp.uuid}/admin/ec/products`)).data
    .data
  console.log(products)
  for await (const product of products) {
    await axios.patch(`/${resp.uuid}/admin/ec/product/${product.id}`, {
      category: product.category.toLowerCase().replace(/ /, '-'),
      options: product.options
        .replace(/"store":"(\d)"/, '"store":$1')
        .replace(/feeback/g, 'feedback'),
    })
    console.log(product.id, 'done')
  }
})()
