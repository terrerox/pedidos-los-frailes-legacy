module.exports = {
  apps: [
    {
      name: 'Pedidos Los Frailes Client',
      exec_mode: 'fork',
      instances: 'max',
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start'
    }
  ]
}
