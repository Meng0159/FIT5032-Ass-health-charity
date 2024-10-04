<!-- eslint-disable vue/multi-word-component-names -->

<template>
  <ul :class="['nav nav-pills nav-justified', isSidebarOpen ? 'flex-column' : 'd-flex flex-row']">
    <li v-for="link in links" :key="link.href" :class="['nav-item', { dropdown: link.dropdown }]">
      <template v-if="!link.dropdown">
        <router-link class="nav-link" active-class="active" aria-current="page" :to="link.href">
          {{ link.text }}
        </router-link>
      </template>
      <template v-else>
        <a
          class="nav-link dropdown-toggle"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {{ link.text }}
        </a>
        <ul class="dropdown-menu">
          <li v-for="subLink in link.sublinks" :key="subLink.href">
            <router-link class="dropdown-item" :to="subLink.href">{{ subLink.text }}</router-link>
          </li>
        </ul>
      </template>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    isSidebarOpen: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      links: [
        { text: 'About', href: '/about' },
        { text: 'News', href: '/news' },
        {
          text: 'Services',
          dropdown: true,
          sublinks: [
            { text: 'Research', href: '/research-support' },
            { text: 'Our Partners', href: '/research-support/partner' }
          ]
        },
        { text: 'My Account', href: '/my-account' },
        { text: 'Donate', href: '/donate' }

        // Add other links as needed
      ]
    }
  }
}
</script>

<style scoped>
.nav .d-flex {
  margin: 10px; /* Adds space above the items */
}

.nav-list {
  display: flex;
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  flex: 1 1 auto;
  text-align: center;
}

.nav-link {
  display: block;
  padding: 0.5rem 1rem;
  text-decoration: none;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.dropdown {
  position: relative;
}

.nav-pills .nav-link.active {
  color: rgb(11, 18, 228);
  background-color: #abcce6;
}
.nav-pills .nav-link {
  color: rgb(85, 27, 7);
}
.nav.flex-column .nav-item {
  margin-bottom: 10px; /* Adds space between items when in vertical layout */
}
.nav.flex-column .nav-item:last-child {
  margin-bottom: 0; /* Removes space below the last item */
}
</style>
