<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar style='background:#DC0B2B'>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Status2
        </q-toolbar-title>

        <div>COVID19-Edition</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item
        to="/"
        clickable
        exact
        v-ripple>
          <q-item-section avatar>
            <q-icon name="label_important" />
          </q-item-section>

          <q-item-section>
            Profil
          </q-item-section>
        </q-item>
        <q-item
        to="/anmelden"
        clickable
        exact
        v-ripple>
          <q-item-section avatar>
            <q-icon name="account_box" />
          </q-item-section>

          <q-item-section>
            Anmelden/Verknüpfen
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',

  data () {
    return {
      leftDrawerOpen: false
    }
  }
}
</script>
