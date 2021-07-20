<template>
<div>
    <div>
        <div class="flex h-screen bg-gray-100 dark:bg-gray-800 font-roboto">
            <div :class="sidebarOpen ? 'block' : 'hidden'" @click="sidebarOpen = false"
                class="fixed z-20 inset-0 bg-black opacity-50 transition-opacity lg:hidden"></div>

            <div :class="sidebarOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'"
                class="fixed z-30 inset-y-0 left-0 w-60 transition duration-300 transform bg-white dark:bg-gray-900 overflow-y-auto lg:translate-x-0 lg:static lg:inset-0">
                <div class="flex items-center justify-center mt-8">
                    <div class="flex items-center">
                        <span class="text-gray-800 text-2xl">Pedidos<span class="text-color-primary"
                    > Los Frailes</span></span>
                    </div>
                </div>

                <nav
                    class="flex flex-col mt-10 px-4 text-center"
                >
                    <router-link
                        v-for="item in items" :key="item"
                        :to="{ name: item.name }"
                        class="mt-3 py-2 text-sm text-gray-600 hover:text-gray-700  sidebar-btn rounded"
                    >
                        {{ item.title }}
                    </router-link>
                </nav>
            </div>

            <div class="flex-1 flex flex-col overflow-hidden">
                <header class="flex justify-between items-center p-6">
                    <div class="flex items-center space-x-4 lg:space-x-0">
                        <button @click="sidebarOpen = true"
                            class="text-gray-500 dark:text-gray-300 focus:outline-none lg:hidden">
                            <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 6H20M4 12H20M4 18H11" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </button>

                        <div>
                            <h1 class="text-2xl font-medium text-gray-800 dark:text-white">Overview</h1>
                        </div>
                    </div>

                    <div class="flex items-center space-x-4">
                        <button class="flex text-gray-600 dark:text-gray-300 focus:outline-none">
                            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M15 17H20L18.5951 15.5951C18.2141 15.2141 18 14.6973 18 14.1585V11C18 8.38757 16.3304 6.16509 14 5.34142V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V5.34142C7.66962 6.16509 6 8.38757 6 11V14.1585C6 14.6973 5.78595 15.2141 5.40493 15.5951L4 17H9M15 17V18C15 19.6569 13.6569 21 12 21C10.3431 21 9 19.6569 9 18V17M15 17H9"
                                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </button>

                        <div class="relative">
                            <button @click="dropdownOpen = ! dropdownOpen"
                                class="flex items-center space-x-2 relative focus:outline-none">
                                <h2 class="text-gray-700 dark:text-gray-300 text-sm hidden sm:block">Jones Ferdinand</h2>
                                <img class="h-9 w-9 rounded-full border-2 border-purple-500 object-cover"
                                    src="https://images.unsplash.com/photo-1553267751-1c148a7280a1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
                                    alt="Your avatar">
                            </button>
                            <div class="absolute right-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-xl z-10"
                                v-show="dropdownOpen"
                              >
                                <a href="#"
                                    class="block px-4 py-2 text-sm text-gray-700 btn-hover hover:text-white">Perfil</a>
                                <a href="/login"
                                    class="block px-4 py-2 text-sm text-gray-700 btn-hover hover:text-white">Cerrar sesión</a>
                            </div>
                        </div>
                    </div>
                </header>

                <main class="flex-1 overflow-x-hidden overflow-y-auto">
                    <div class="container mx-auto px-6 py-8">
                        <router-view />
                    </div>
                </main>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
  name: 'Local',

  data () {
    return {
      sidebarOpen: false,
      dropdownOpen: false,
      items: [
        { title: 'Productos', name: 'LocalProduct' },
        { title: 'Ordenes', name: 'LocalOrder' }
      ]
    }
  }
}
</script>

<style scoped>
.router-link-active {
    background-color: #eff2fb;
}
</style>
