export default function (context, inject) {
  return window.$workbox
    .then((sw) => {
      sw && inject('sw', sw.m)
    })
}
