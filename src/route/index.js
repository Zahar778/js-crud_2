// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

// ================================================================

class Product {
  static #list = []

  constructor(email, login, password) {
    this.email = email;
    this.login = login;
    this.password = password;
    this.id = new Date().getTime()
  }
  static add = (user) => {
    this.#list.push(user)
  }

  static getList = () => this.#list
  
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
    // ↙️ cюди вводимо назву файлу з сontainer
    res.render('product-alert', {
      // вказуємо назву папки контейнера, в якій знаходяться наші стилі
      style: 'product-alert',
      info: 'Товар успішно додано',
    })
    // ↑↑ сюди вводимо JSON дані
  })
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
