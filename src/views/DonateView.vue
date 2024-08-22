<template>
  <div class="donate">
    <AppHeader />
    <h1>Support Our Cause</h1>
    <p>
      Your donation will help us continue to provide free coding education to people around the
      world.
    </p>
    <DonateForm />
  </div>
</template>

<script>
import AppHeader from '@/components/0_common/AppHeader.vue'
import DonateForm from '@/components/6_donate/Donation.vue'

export default {
  name: 'DonateView',
  components: {
    AppHeader,
    DonateForm
  }
}
</script>
