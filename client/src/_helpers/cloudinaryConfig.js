// import cloudinary from 'cloudinary'
const cloudinary = require('cloudinary').v2

cloudinary.config({
  cloud_name: 'pedidos-los-frailes',
  api_key: '244858662669832',
  api_secret: '4HvEXhMHbq9C65aeYNd0qwhIv8E'
})

export default cloudinary
