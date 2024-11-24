<script setup>
import Header from '../components/commons/Header.vue'
import Hero from '../components/home/Hero.vue'
import Services from '../components/home/Services.vue'
import NearYou from '../components/home/NearYou.vue'
import Footer from '../components/commons/Footer.vue'

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