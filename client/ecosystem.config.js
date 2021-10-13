module.exports = {
  apps: [
    {
      name: 'Pedidos Los Frailes Client',
      exec_mode: 'fork',
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start'
    }
  ]
}
