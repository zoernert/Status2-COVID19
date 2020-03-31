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

        <div><a href='https://www.startnext.com/status2/' target='_blank'>Info</a></div>
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
        <hr/>
        <q-item
        to="/datenschutz"
        clickable
        exact
        v-ripple>
          <q-item-section avatar>
            <q-icon name="policy" />
          </q-item-section>

          <q-item-section>
            Impressum/Datenschutz
          </q-item-section>
        </q-item>
        <q-item
        to="/lizenz"
        clickable
        exact
        v-ripple>
          <q-item-section avatar>
            <q-icon name="gavel" />
          </q-item-section>

          <q-item-section>
            Nutzungslizenz
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
