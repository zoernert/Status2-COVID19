<template>
  <q-page class="q-pa-lg">
    <q-card  class="shadow-8" style='margin-bottom:25px'>
        <q-card-section class='bg-primary text-white text-h5'>
        Mit freundlicher Unterstützung von
      </q-card-section>
        <q-card-section class='full-width'>
        <strong>STROM</strong>DAO GmbH, Mauer
        </q-card-section>
        <q-card-section class='full-width'>
        Rebekka Mutschler, Mannheim
        </q-card-section>
        <q-card-section class='full-width'>
        Thorsten Zoerner, Mauer
        </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import axios from 'axios'
const preferedTimeout1 = 24 * 3600 * 1000
const preferedTimeout2 = 36 * 3600 * 1000

export default {
  name: 'Anmeldung',
  data: function () {
    const res = {
      lm_fuehrung: false,
      lm_sanitaet: false,
      lm_betreuung: false,
      lm_transport: false,
      lm_tusi: false,
      takt_gruppe: false,
      takt_zug: false,
      takt_verband: false,
      takt_orgl: false,
      takt_lna: false,
      qual_sanh: false,
      qual_rh: false,
      qual_rs: false,
      qual_kp: false,
      qual_ra: false,
      qual_ns: false,
      qual_arzt: false,
      qual_notarzt: false
    }
    const columns = []
    columns.push({ name: 'vornamen', align: 'left', label: 'Vornamen', field: 'vornamen', sortable: true })
    columns.push({ name: 'nachnamen', align: 'left', label: 'Nachnamen', field: 'nachnamen', sortable: true })
    columns.push({ name: 'availability', align: 'left', label: 'Verfügbarkeit', field: 'availability', sortable: true })
    for (var propName in res) {
      columns.push({ name: propName, align: 'left', label: propName, field: propName, sortable: true })
      if (typeof res[propName + '_green'] === 'undefined') res[propName + '_green'] = 0
      if (typeof res[propName + '_yellow'] === 'undefined') res[propName + '_yellow'] = 0
      if (typeof res[propName + '_red'] === 'undefined') res[propName + '_red'] = 0
    }
    res.columns = columns
    res._green = 0
    res._yellow = 0
    res._red = 0
    res.domain = location.hostname
    res.vornamen = ''
    res.nachnamen = ''
    res.mobilfunk = ''
    res.availability = ''
    res.availabilitybg = 'bg-primary text-white text-h5'
    res.timeout1 = []
    res.timeout2 = []
    res.accessLevel = 0
    res.viewStaerke = false
    res.email = ''
    res.items = []
    res.osid = ''
    return res
  },
  methods: {
    changeAvail (n) {
      this.availability = n
      this.availabilitybg = 'bg-' + n + ' text-black text-h5'
      this.save()
    },
    codechange () {

    },
    checkGranted () {
      const OneSignal = window.OneSignal
      const parent = this
      console.log('checkGranted')
      OneSignal.push(['getNotificationPermission', function (permission) {
        OneSignal.push(['sendTags', { code: window.localStorage.getItem('code'), domain: location.hostname, availability: parent.availability }])
        if (permission === 'granted') {
          window.OneSignal.getUserId().then(function (x) { parent.osid = x })
        } else {
          console.log('notGranted')
          setTimeout(function () {
            parent.checkGranted()
          }, 5000)
        }
      }])
    },
    retrieve () {
      const parent = this
      axios.get('https://api.corrently.io/core/status2?domain=' + this.domain + '&osid=' + this.osid + '&code=' + window.localStorage.getItem('code')).then(async function (response) {
        const cachepros = {
          _green: 0,
          _yellow: 0,
          _red: 0
        }
        const timeout1 = []
        const timeout2 = []
        parent.items = response.data.Items
        for (let j = 0; j < response.data.Items.length; j++) {
          if (response.data.Items[j].timeStamp > new Date().getTime() - (preferedTimeout2)) {
            for (var propName in response.data.Items[j]) {
              if (typeof parent[propName + '_' + response.data.Items[j].availability] !== 'undefined') {
                if (response.data.Items[j][propName]) {
                  if (typeof cachepros[propName + '_green'] === 'undefined') cachepros[propName + '_green'] = 0
                  if (typeof cachepros[propName + '_yellow'] === 'undefined') cachepros[propName + '_yellow'] = 0
                  if (typeof cachepros[propName + '_red'] === 'undefined') cachepros[propName + '_red'] = 0
                  cachepros[propName + '_' + response.data.Items[j].availability]++
                }
              }
              if (response.data.Items[j].code === window.localStorage.getItem('code')) {
                cachepros[propName] = response.data.Items[j][propName]
              }
            }
            if (response.data.Items[j].availability === 'green') cachepros._green++
            if (response.data.Items[j].availability === 'yellow') cachepros._yellow++
            if (response.data.Items[j].availability === 'red') cachepros._red++
            if (response.data.Items[j].code === window.localStorage.getItem('code')) {
              if (typeof response.data.Items[j].accessLevel !== 'undefined') {
                parent.accessLevel = response.data.Items[j].accessLevel
                if (parent.accessLevel > 0) {
                  parent.viewStaerke = true
                }
              }
              if (typeof response.data.Items[j].availability !== 'undefined') {
                parent.availability = response.data.Items[j].availability
              }
              if (typeof response.data.Items[j].availabilitybg !== 'undefined') {
                parent.availabilitybg = response.data.Items[j].availabilitybg
              }
            }
          }
          if (response.data.Items[j].timeStamp < new Date().getTime() - (preferedTimeout2)) {
            timeout2.push(response.data.Items[j])
          } else
          if (response.data.Items[j].timeStamp < new Date().getTime() - (preferedTimeout1)) {
            timeout1.push(response.data.Items[j])
          }
        }
        for (var n in cachepros) {
          parent[n] = cachepros[n]
        }
        parent.timeout1 = timeout1
        parent.timeout2 = timeout2
      })
    },
    save () {
      const data = {
        code: window.localStorage.getItem('code')
      }

      for (var propName in this) {
        if ((propName.substr(0, 1) !== '$') && (propName.substr(0, 1) !== '_')) {
          if ((typeof this[propName] === 'string') || (typeof this[propName] === 'boolean') || (typeof this[propName] === 'number')) {
            if ((propName.indexOf('_green') < 0) && (propName.indexOf('_yellow') < 0) && (propName.indexOf('_red') < 0)) {
              data[propName] = this[propName]
            }
          }
        }
      }
      const parent = this
      axios.post('https://api.corrently.io/core/status2', data).then(async function (response) {
        window.localStorage.setItem('s2', JSON.stringify(data))
        parent.retrieve()
      })
    }
  },
  created () {
    if (window.localStorage.getItem('code') == null) {
      this.$router.push('/anmelden')
    } else {
      if (typeof window.OneSignal === 'undefined') {
        this.$oneSignal.setup('98a1d9b6-1549-437f-9e24-682a30a9b48b')
      }
      if (window.localStorage.getItem('s2') !== null) {
        const obj = JSON.parse(window.localStorage.getItem('s2'))
        for (var propName in obj) {
          this[propName] = obj[propName]
        }
      }
      this.checkGranted()
      this.retrieve()
      const parent = this
      setInterval(function () {
        parent.retrieve()
      }, 300000)
    }
  }
}
</script>
