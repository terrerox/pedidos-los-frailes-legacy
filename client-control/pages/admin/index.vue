<template>
  <div v-cloak id="dribbleShot">
    <Header />
    <section class="main">
      <div class="grid grid-cols-2 gap-2 p-5 m-8">
        <div class="col-span-2 lg:col-span-1">
          <UnverifiedLocals />
        </div>
        <div class="col-span-2 lg:col-span-1 lg:mt-0 mt-6">
          <UnverifiedDeliveries />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Header from '@/components/admin/Header'
import UnverifiedDeliveries from '@/components/admin/UnverifiedDeliveries'
import UnverifiedLocals from '@/components/admin/UnverifiedLocals'
export default {
  name: 'Admin',
  components: { Header, UnverifiedDeliveries, UnverifiedLocals },
  middleware: 'authenticated',

  head () {
    return {
      title: 'Administrador | Pedidos Los Frailes Control',
      meta: [
        {
          hid: 'Administrador',
          name: 'Administrador',
          content: 'Administrador'
        }
      ],
      htmlAttrs: {
        lang: 'en'
      }
    }
  }
}
</script>
