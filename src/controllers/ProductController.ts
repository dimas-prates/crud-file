import { Request, Response } from 'express'
import { randomUUID } from 'crypto'
import fs from 'fs'

interface IID {
    id: string
}

interface IProduct extends IID {
    name: string,
    price: number,
    desc: string | null | undefined
}

const dataFileName = "products.json"

export class ProductController {

    listProducts(req: Request, res: Response) {
        if (!fs.existsSync(dataFileName)) {
            fs.writeFile(dataFileName, JSON.stringify(new Array()), (err) => { throw (err) })
        }

        fs.readFile(dataFileName, "utf-8", (err, data) => {
            if (err) {
                throw (err)
            }

            return res.status(200).json(JSON.parse(data))
        })
    }

    getProduct(req: Request, res: Response) {
        if (!fs.existsSync(dataFileName)) {
            fs.writeFile(dataFileName, JSON.stringify(new Array()), (err) => { throw (err) })
        }

        const { idProduct } = req.params
        fs.readFile(dataFileName, "utf-8", (err, data) => {
            if (err) {
                throw (err)
            }

            const products: Array<IProduct> = JSON.parse(data)
            const productIndex = products.findIndex((prod: IProduct) => { return prod.id === idProduct })

            return res.status(200).json(products[productIndex])
        })
    }

    addProduct(req: Request, res: Response) {
        if (!fs.existsSync(dataFileName)) {
            fs.writeFile(dataFileName, JSON.stringify(new Array()), (err) => { throw (err) })
        }

        const newProduct: IProduct = req.body
        newProduct.id = randomUUID()

        fs.readFile(dataFileName, "utf-8", (err, data) => {
            if (err) {
                throw (err)
            }

            const products: Array<IProduct> = JSON.parse(data)
            products.push(newProduct)

            fs.writeFile(dataFileName, JSON.stringify(products), (err) => {
                if (err) {
                    throw err
                }
                return res.status(200).json(products[products.indexOf(newProduct)])
            })
        })
    }

    updateProduct(req: Request, res: Response) {
        if (!fs.existsSync(dataFileName)) {
            fs.writeFile(dataFileName, JSON.stringify(new Array()), (err) => { throw (err) })
        }

        const { idProduct } = req.params
        const { name, price, desc }: IProduct = req.body

        fs.readFile(dataFileName, "utf-8", (err, data) => {
            if (err) {
                throw (err)
            }

            const products: Array<IProduct> = JSON.parse(data)
            const productIndex = products.findIndex((prod: IProduct) => { return prod.id === idProduct })
            const modifiedProduct: IProduct = {
                ...products[productIndex],
                name,
                price,
                desc
            }

            products.splice(productIndex, 1, modifiedProduct)

            fs.writeFile(dataFileName, JSON.stringify(products), (err) => {
                if (err) {
                    throw err
                }

                return res.status(200).json(products[productIndex])
            })
        })
    }

    removeProduct(req: Request, res: Response) {
        if (!fs.existsSync(dataFileName)) {
            fs.writeFile(dataFileName, JSON.stringify(new Array()), (err) => { throw (err) })
        }

        const { idProduct } = req.params
        fs.readFile(dataFileName, "utf-8", (err, data) => {
            if (err) {
                throw (err)
            }

            const products: Array<IProduct> = JSON.parse(data)
            const productIndex = products.findIndex((prod: IProduct) => { return prod.id === idProduct })

            products.splice(productIndex, 1)
            fs.writeFile(dataFileName, JSON.stringify(products), (err) => {
                if (err) {
                    throw err
                }

                return res.status(200).json(products[productIndex])
            })
        })
    }
}