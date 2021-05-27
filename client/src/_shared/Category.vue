<template>
      <div class="grid grid-cols-9 gap-6 mt-12">
        <div
          @click="activeCategory = cat.id"
          class=" border rounded-full p-2 flex flex-col items-center shadow-xl cursor-pointer transition-colors duration-700 ease-in-out"
          :class="{ 'bg-yellow-400': cat.id == activeCategory }"
          v-for="(cat, idx) in categories"
          :key="idx"
        >
          <div class="border rounded-full p-2 bg-white">
            <img class="h-12 w-12" :src="cat.icon" alt="" />
          </div>
          <p class="mt-3 mb-10 font-bold  text-xs">{{ cat.text }}</p>
        </div>
        <button
          class="h-10 rounded-lg self-center hover:shadow-xl flex justify-center items-center bg-gray-100 p-3 ml-auto"
        >
          <i class="fa fa-chevron-right"></i>
        </button>
      </div>
</template>

<script>
export default {
  data () {
    return {
      activeCategory: 1,
      categories: [
        {
          id: 1,
          text: 'All',
          icon: 'https://image.flaticon.com/icons/svg/1046/1046874.svg',
          isActive: true
        },
        {
          id: 2,
          text: 'Pizza',
          icon: 'https://image.flaticon.com/icons/svg/766/766226.svg',
          isActive: false
        },
        {
          id: 3,
          text: 'Asian',
          icon: 'https://image.flaticon.com/icons/svg/2689/2689335.svg',
          isActive: false
        },
        {
          id: 4,
          text: 'Burgers',
          icon: 'https://image.flaticon.com/icons/svg/260/260077.svg',
          isActive: false
        },
        {
          id: 5,
          text: 'Barbecue',
          icon: 'https://image.flaticon.com/icons/svg/1161/1161684.svg',
          isActive: false
        },
        {
          id: 6,
          text: 'Desserts',
          icon: 'https://image.flaticon.com/icons/svg/1784/1784077.svg',
          isActive: false
        },
        {
          id: 7,
          text: 'Thai',
          icon: 'https://image.flaticon.com/icons/svg/2321/2321808.svg',
          isActive: false
        },
        {
          id: 8,
          text: 'Sushi',
          icon: 'https://image.flaticon.com/icons/svg/2558/2558357.svg',
          isActive: false
        }
      ]
    }
  }
}
</script>
