export default function (context, inject) {
  return window.$workbox
    .then((sw) => {
      inject('sw', sw.m)
    })
}
