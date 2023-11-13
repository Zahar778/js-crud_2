// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

// ================================================================

class Product {
  static #list = []
  constructor(name, price, description) {
    this.name = name
    this.price = price
    this.description = description
    this.id = Math.floor(Math.random() * 100000)
    this.createDate = () => {
      this.date = new Date().toISOString()
    }
  }
  static getList = () => this.#list
  checkId = (id) => this.id === id
  static add = (product) => {
    this.#list.push(product)
  }
  static getById = (id) =>
    this.#list.find((product) => product.id === id)
  static updateById = (id, data) => {
    const product = this.getById(id)
  }
  static deleteById = (id) => {
    const index = this.#list.findIndex(
      (product) => product.id === id,
    )
    if (index !== -1) {
      this.#list.splice(index, 1)
      return true
    } else {
      return false
    }
  }
  static updateById = (id, data) => {
    const product = this.getById(id)
    const { name}  = data;
    if (product) {
      if (name) {
        product.name = name
      }
      return true
    } else {
      return false
    }
  }
  static update = (name, { product }) => {
    if (name) {
      product.name = name
    }
  }
}
  router.get('/product-create', function (req, res) {
    // res.render генерує нам HTML сторінку
    const list = Product.getList()
    // ↙️ cюди вводимо назву файлу з сontainer
    res.render('product-create', {
      // вказуємо назву папки контейнера, в якій знаходяться наші стилі
      style: 'product-create',
    })
    // ↑↑ сюди вводимо JSON дані
  })
  // ================================================================
  router.post('/product-create', function (req, res) {
    // res.render генерує нам HTML сторінку
    const { name, price, description } = req.body
    const product = new Product(name, price, description)
    Product.add(product)
    console.log(Product.getList())
  })
  router.get('/product-alert', function (req, res) {
    const { name, price, description } = req.query;
  
    console.log('Name:', name);
    console.log('Price:', price);
    console.log('Description:', description);
  
    res.render('product-alert', {
      style: 'product-alert',
      info: 'Товар успішно додано',
      data: {
        product: {
          name,
          price,
          description,
        },
      },
    });
  });
  // ================================================================
  router.get('/product-list', function (req, res) {
    // res.render генерує нам HTML сторінку
    const list = Product.getList()
    console.log(list)
    // ↙️ cюди вводимо назву файлу з сontainer
    res.render('product-list', {
      // вказуємо назву папки контейнера, в якій знаходяться наші стилі
      style: 'product-list',
      
      data: {
        products: {
          list,
          isEmpty: list.length === 0,
        },
      },
    })
    // ↑↑ сюди вводимо JSON дані
  })
  


module.exports = router
