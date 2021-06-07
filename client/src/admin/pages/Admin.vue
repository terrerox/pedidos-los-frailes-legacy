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
import Header from '@/admin/components/Header'
import UnverifiedDeliveries from '@/admin/components/UnverifiedDeliveries'
import UnverifiedLocals from '@/admin/components/UnverifiedLocals'

export default {
  name: 'Admin',

  components: { Header, UnverifiedDeliveries, UnverifiedLocals }
}
</script>

<style>

</style>
