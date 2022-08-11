import { Router } from 'express'
import { ProductController } from './controllers/ProductController'

const routes = Router()

routes.get('/', (req, res) => {
    const docRoutes = {
        get: ['/products', '/product:idProduct'],
        post: ['/product/add'],
        put: ['/product:idProduct'],
        delete: ['/product:idProduct']
    }
    return res.status(200).json(docRoutes)
})

routes.get('/products', new ProductController().listProducts)
routes.post('/product', new ProductController().addProduct)
routes.get('/product:idProduct', new ProductController().getProduct)
routes.put('/product:idProduct', new ProductController().updateProduct)
routes.delete('/product:idProduct', new ProductController().removeProduct)

export default routes