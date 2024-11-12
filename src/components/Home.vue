<script setup>
import Header from './Header.vue'
import Hero from './Hero.vue'
import Services from './Services.vue';
import Destiny from './Destiny.vue';
import NearYou from './NearYou.vue';
import Footer from './Footer.vue';

</script>

<template>
  <v-app >
    <header>
      <Header></Header>
    </header>
    <main>
      <Hero class="mt-28"></Hero>
    </main>
    <section id="services">
      <Services></Services>
    </section>
    <section class="mt-16">
      <NearYou></NearYou>
    </section>
    <footer>
      <Footer></Footer>
    </footer>
  </v-app>
</template>

<style scoped>
*{
  font-family: Poppins;
}

footer{
  margin-top: 4rem;
}

html{
  scroll-behavior: smooth;
}

main{
  margin-top: 4rem;
}
</style>