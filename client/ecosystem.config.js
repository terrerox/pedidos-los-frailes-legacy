module.exports = {
  apps: [
    {
      name: 'Pedidos Los Frailes Client',
      exec_mode: 'cluster',
      instances: 'max',
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start'
    }
  ]
}
