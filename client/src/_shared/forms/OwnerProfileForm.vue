<template>
  <form class="grid grid-cols-2 gap-2" ref="form" @submit.prevent="addOrder">
    <div class="col-span-2 lg:col-span-1 mt-2 pr-1">
      <material-input
        required
        label="Nombre"
      />
    </div>
    <div class="col-span-2 lg:col-span-1 mt-2 pr-1">
      <material-input
        required
        label="Telefono"
      />
    </div>
    <div class="col-span-2 lg:col-span-1 mt-2 pr-1">
      <material-input
        type="text"
        required
        label="Dirección"
      />
    </div>
    <div class="col-span-2 lg:col-span-1 mt-2 pr-1">
      <material-input
        required
        label="Logo"
        type="file"
      />
    </div>
    <div class="col-span-2 lg:col-span-1 mt-2 pr-1">
      <material-input
        required
        type="text"
        label="Contraseña"
      />
    </div>
    <div class="col-span-2 lg:col-span-1 mt-2 pr-1">
      <material-input
        required
        type="text"
        label="Confirmar contraseña"
      />
    </div>
    <div class="col-span-2 mt-2">
      <material-input
        label="Editar descripción"
      />
    </div>
  </form>
</template>

<script>
import MaterialInput from '@/_shared/inputs/MaterialInput'
export default {
  name: 'OwnerProfileForm',

  components: { MaterialInput }
}
</script>

<style>

</style>
