<template>
    <div class="">
      <div
        class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex"
      >
        <div class="relative w-auto my-6 mx-auto max-w-3xl">
          <div
            class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
          >
            <div
              class="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t"
            >
              <h3 class="text-3xl font-semibold">
                Editar
              </h3>
              <button
                class="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                @click="this.$emit('close')"
              >
                <span
                  class="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none"
                >
                  ×
                </span>
              </button>
            </div>
            <div class="p-6 flex-auto">
                <EditProfileWrapper ref="form" @close="closeModal"/>
            </div>
          </div>
        </div>
      </div>
      <div class="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
</template>

<script>
import EditProfileWrapper from '@/delivery/components/EditProfileWrapper'

export default {
  name: 'ProductModal',

  components: { EditProfileWrapper },

  data () {
    return {
      showModal: false
    }
  },
  methods: {
    closeModal () {
      this.$emit('close')
    }
  }
}
</script>
