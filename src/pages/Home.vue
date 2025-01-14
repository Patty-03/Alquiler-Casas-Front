<script setup>
import HeaderHome from "../components/home/HeaderHome.vue";
import Footer from "../components/commons/Footer.vue";
import Hero from "../components/home/Hero.vue";
import Services from "../components/home/Services.vue";
import NearYou from "../components/home/NearYou.vue";


</script>

<template>
    <v-app>
        <header>
            <HeaderHome></HeaderHome>
        </header>
        <main>
            <Hero class="mt-28"></Hero>
        </main>
        <section id="services">
            <Services id="explore"></Services>
        </section>
        <section class="mt-16">
            <NearYou></NearYou>
        </section>
        <footer>
            <Footer id="contact"></Footer>
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
