<template>
  <v-container class="terms-container d-flex flex-column">
    <!-- Título principal -->
    <h1 class="terms-title text-center mb-8">Términos y Condiciones</h1>

    <!-- Secciones -->
    <v-card v-for="(section, index) in sections" :key="index" class="mb-6 pa-6" elevation="2">
      <section>
        <!-- Título de la sección con icono -->
        <div class="d-flex align-center mb-4">
          <v-icon class="mr-3" color="primary">{{ section.icon }}</v-icon>
          <h2 class="section-title">{{ section.title }}</h2>
        </div>

        <!-- Contenido de la sección -->
        <p class="section-content">{{ section.content }}</p>

        <!-- Subsecciones (si las hay) -->
        <div v-if="section.subsections" class="ml-6">
          <div v-for="(subsection, subIndex) in section.subsections" :key="subIndex" class="mb-3">
            <strong>{{ subsection.title }}:</strong> {{ subsection.content }}
          </div>
        </div>
      </section>
    </v-card>

    <v-btn color="primary" @click="router.push('/')">Volver a la pagina principal</v-btn>
  </v-container>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter()

const sections = [
  {
    icon: 'mdi-information',
    title: '1. Introducción',
    content: 'Bienvenido a Alquileres Villa. Al acceder y utilizar nuestro sitio web, aceptas cumplir y estar sujeto a los siguientes términos y condiciones. Por favor, léelos cuidadosamente antes de utilizar nuestros servicios.',
  },
  {
    icon: 'mdi-book-open-page-variant',
    title: '2. Definiciones',
    subsections: [
      {
        title: 'Usuario',
        content: 'cualquier persona que accede y utiliza nuestro sitio web.',
      },
      {
        title: 'Propietario',
        content: 'la persona que posee y ofrece en alquiler una propiedad en nuestro sitio web.',
      },
      {
        title: 'Propiedad',
        content: 'cualquier alojamiento que se ofrezca en alquiler a través de nuestro sitio web.',
      },
    ],
  },
  {
    icon: 'mdi-account-circle',
    title: '3. Registro y Cuentas',
    content: 'Para utilizar ciertos servicios, es posible que necesites registrarte y crear una cuenta. Asegúrate de proporcionar información precisa y actualizada. Eres responsable de mantener la confidencialidad de tu cuenta y contraseña.',
  },
  {
    icon: 'mdi-home',
    title: '4. Listados de Propiedades',
    content: 'Los propietarios pueden listar sus propiedades siguiendo nuestras directrices de publicación. Los propietarios son responsables de la exactitud de la información proporcionada sobre sus propiedades.',
  },
  {
    icon: 'mdi-credit-card',
    title: '5. Reservas y Pagos',
    content: 'Las reservas se gestionan a través de nuestra plataforma. Los pagos deben realizarse de acuerdo con nuestras políticas de pago y cancelación. Alquileres Villa no se hace responsable de las disputas entre propietarios e inquilinos.',
  },
  {
    icon: 'mdi-cash-refund',
    title: '6. Cancelaciones y Reembolsos',
    content: 'Las políticas de cancelación y reembolso se especificarán en cada listado de propiedad. Los reembolsos estarán sujetos a las políticas de cancelación del propietario y nuestra plataforma.',
  },
  {
    icon: 'mdi-alert-circle',
    title: '7. Responsabilidades del Usuario',
    content: 'Los usuarios deben utilizar el sitio web de manera responsable y de acuerdo con las leyes aplicables. Está prohibido publicar contenido inapropiado, ofensivo o engañoso.',
  },
  {
    icon: 'mdi-shield-alert',
    title: '8. Limitación de Responsabilidad',
    content: 'Alquileres Villa no se responsabiliza por daños directos, indirectos, incidentales o consecuentes que puedan surgir del uso de nuestro sitio web. No garantizamos la precisión o integridad de la información proporcionada por los propietarios.',
  },
  {
    icon: 'mdi-copyright',
    title: '9. Propiedad Intelectual',
    content: 'Todo el contenido del sitio web, incluyendo textos, gráficos, logotipos e imágenes, es propiedad de Alquileres Villa o sus licenciantes y está protegido por derechos de autor.',
  },
  {
    icon: 'mdi-pencil',
    title: '10. Modificaciones de los Términos',
    content: 'Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. Las modificaciones entrarán en vigor inmediatamente después de su publicación en el sitio web.',
  },
  {
    icon: 'mdi-email',
    title: '11. Contacto',
    content: 'Si tienes alguna pregunta sobre estos términos y condiciones, puedes contactarnos a través de adminCorreo@correo.com',
  },
];
</script>

<style scoped>
.terms-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
}

.terms-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #1976d2; 
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
}

.section-content {
  font-size: 1rem;
  line-height: 1.6;
  color: #555;
}

.v-card {
  border-radius: 12px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.v-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

a {
  text-decoration: none;
  color: inherit;
}

a:hover {
  text-decoration: underline;
}
</style>