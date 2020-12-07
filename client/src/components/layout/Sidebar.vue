<template>
    <div class="bg-gray-100 sidebar flex flex-col">
      <div class="px-6">
        <div class="h-12 mt-8 flex justify-end items-center">
          <i class="fa fa-user"></i>
          <div
            class="rounded-lg bg-yellow-400 px-3 font-bold text-xs py-1 ml-6"
          >
            3
          </div>
        </div>
        <div class="mt-12">
          <p class="font-medium text-xl">My Order 😎</p>
        </div>
        <div
          class="mt-12 p-6 bg-purple-800 custom-rounded font-hairline text-xs"
        >
          <div class="flex justify-between items-center">
            <p class="text-white">625 St Marks Ave</p>
            <p class="text-yellow-400 cursor-pointer">Edit</p>
          </div>
          <div class="flex items-center mt-4">
            <div class="rounded-lg px-2 py-1 timer">
              <i class="fa fa-clock text-yellow-400"></i>
            </div>
            <p class="text-white mx-3">35 min</p>
            <p class="text-yellow-400 cursor-pointer ml-auto">Choose time</p>
          </div>
        </div>
        <div
          v-for="(item, index) in cartItems"
          :key="index"
          class="grid grid-cols-4 gap-1 mb-5"
          :class="{ 'mt-12': index == 0 }"
        >
          <div
            class="h-10 rounded-lg"
            :style="{
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundImage: 'url(\'' + item.image + '\')'
            }"
          ></div>
          <div class="col-span-2 grid grid-cols-3 text-xxs font-semibold ">
            <p class="flex justify-center items-center">
              {{ item.quantity }} <span class="ml-1">x</span>
            </p>
            <p class="col-span-2 flex items-center">{{ item.title }}</p>
          </div>
          <div
            class="flex justify-end items-center text-gray-600 font-hairline text-xs"
          >
            ${{ item.price }}
          </div>
        </div>
        <div class="grid grid-cols-4 gap-1 mb-5">
          <div class="h-10 rounded-lg bg-orange-200 flex">
            <i class="fa fa-car m-auto text-orange-500"></i>
          </div>
          <div class="col-span-2 grid grid-cols-3 text-xxs font-semibold ">
            <p class="col-span-2 flex justify-center items-center">Delivery</p>
            <p class="flex items-center"></p>
          </div>
          <div
            class="flex justify-end items-center text-gray-600 font-hairline text-xs"
          >
            $0.00
          </div>
        </div>
      </div>
      <div class="flex-grow flex flex-col pl-6 justify-end">
        <div class="flex justify-between items-center border-b-2 pb-2">
          <span>Total:</span>
          <span class="text-xl font-medium pr-6">$25.97</span>
        </div>
        <div class="flex justify-between pt-4 text-xs font-bold">
          <div class="flex flex-col">
            <span>Persons</span>
            <div class="flex items-center mt-3">
              <span class="border border-r-0 p-2 rounded-l-lg">-</span>
              <span class="border-b border-t p-2 ">1</span>
              <span class="border border-l-0 p-2 rounded-r-lg">+</span>
            </div>
          </div>
          <div class="ml-auto bg-yellow-400 p-6 rounded-l-lg">
            Checkout <i class="ml-3 fa fa-arrow-right"></i>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      cartItems: [
        {
          title: 'BBQ Burger',
          image:
            'https://hips.hearstapps.com/pop.h-cdn.co/assets/cm/15/05/54ca71fb94ad3_-_5summer_skills_burger_470_0808-de.jpg?crop=1xw:1.0xh;center,top&resize=480:*',
          quantity: 1,
          price: 14.99
        },
        {
          title: 'French Fries',
          image:
            'https://recipes.timesofindia.com/thumb/54659021.cms?width=1200&height=1200',
          quantity: 1,
          price: 9.99
        },
        {
          title: 'Cheese Sauce',
          image:
            'https://www.pepperscale.com/wp-content/uploads/2017/10/spicy-nacho-cheese.jpeg',
          quantity: 1,
          price: 0.99
        }
      ]
    }
  }
}
</script>
