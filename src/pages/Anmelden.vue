<template>
  <q-page class="q-pa-lg">
    <q-card  class="shadow-8">
        <q-card-section class='bg-primary text-white text-h5'>
          Anmelden / Verknüpfen
        </q-card-section>
        <q-card-section>
          <q-form
                class="q-gutter-md"
          >
          <div class='text-h6'>Benutzercode</div>
          <q-input
            outlined
            v-model="code"
            hint="(Direkteingabe, oder unten ermitteln)"
            minlength="7" maxlength="7"
            @change='codechange()'
          />
          <q-btn type='button' label='übernehmen' color='secondary' v-bind:disabled='this.nosave' @click='save()'/>
          <hr/>
          <div class='text-h6'>Zweiter Buchstaben des Vornamen</div>
            <q-input
              outlined
              v-model="vornamen"
              hint="(Beispiel h bei Thorsten)"
              minlength="1" maxlength="1"
              @change='change()'
            />
            <div class='text-h6'>Erster Buchstaben des Nachnamen</div>
              <q-input
                outlined
                v-model="nachnamen"
                hint="(Beispiel Ö bei Österreicher)"
                minlength="1" maxlength="1"
                @change='change()'
              />
            <div class='text-h6'>Letzte beiden Ziffern des Geburtsjahr</div>
                <q-input
                  outlined
                  v-model="jahr"
                  hint="(Beispiel 01 bei 2001)"
                  minlength="2" maxlength="2"
                  @change='change()'
            />
            <div class='text-h6'>Letzte beiden Ziffern der Postleitzahl</div>
                <q-input
                  outlined
                  v-model="plz"
                  hint="(Beispiel 56 bei 69256)"
                  minlength="2" maxlength="2"
                  @change='change()'
            />
            <div class='text-h6'>Erster Buchstabe Deines Straßennamens</div>
                <q-input
                  outlined
                  v-model="strasse"
                  hint="(Beispiel H bei Hauptstraße)"
                  minlength="1" maxlength="1"
                  @change='change()'
            />
          <q-btn type='button' label='übernehmen' color='secondary' v-bind:disabled='this.nosave' @click='save()'/>
         </q-form>
        </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'Anmeldung',
  data: function () {
    return {
      vornamen: '',
      nachnamen: '',
      jahr: '',
      plz: '',
      strasse: '',
      code: '',
      nosave: true
    }
  },
  methods: {
    change () {
      this.code = '' + this.vornamen + '' + this.nachnamen + '' + this.jahr + '' + this.plz + '' + this.strasse
      if (this.code.length === 7) this.nosave = false; else this.nosave = true
    },
    codechange () {
      if (this.code.length === 7) this.nosave = false; else this.nosave = true
    },
    save () {
      if (this.code.length === 7) this.nosave = false; else this.nosave = true
      if (!this.nosave) {
        window.localStorage.setItem('code', this.code.toLowerCase())
        this.$router.push('/')
      }
    }
  },
  created () {
    if (window.localStorage.getItem('code') !== null) {
      this.code = window.localStorage.getItem('code')
      this.codechange()
    }
  }
}
</script>
