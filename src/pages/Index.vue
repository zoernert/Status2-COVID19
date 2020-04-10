<template>
  <q-page class="q-pa-lg">
    <q-card  class="shadow-8" style='margin-bottom:25px'>
        <q-card-section v-bind:class="availabilitybg">
          Deine Verfügbarkeit
        </q-card-section>
        <q-card-section class='full-width'>
          <q-form
                class="q-gutter-md full-width"
          >
            <q-btn color='green' label='Verfügbar' class='text-black' size='lg' @click="changeAvail('green')"><br/>
              <q-badge color='grey' class='text-white' floating v-if='this.accessLevel > 0'>
                {{ _green }}
              </q-badge>
            </q-btn>
            <q-btn color='yellow' label='Bedingt' class='text-black' size='lg' @click="changeAvail('yellow')"><br/>
              <q-badge color='grey' class='text-white' floating v-if='this.accessLevel > 0'>
                {{ _yellow }}
              </q-badge>
            </q-btn>
            <q-btn color='red' label='Nicht verfügbar' class='text-black' size='lg' @click="changeAvail('red')"><br/>
              <q-badge color='grey' class='text-white' floating v-if='this.accessLevel > 0'>
                {{ _red }}
              </q-badge>
            </q-btn>
         </q-form>
        </q-card-section>
    </q-card>
    <q-card  class="shadow-8" style='margin-bottom:25px'>
        <q-card-section class='bg-primary text-white text-h5'>
        Stammdaten
      </q-card-section>
        <q-card-section class='full-width'>
            <div class='text-h6'>Vornamen</div>
              <q-input
                outlined
                v-model="vornamen"
                @change='save()'
              />
              <div class='text-h6'>Nachnamen</div>
                <q-input
                  outlined
                  v-model="nachnamen"
                  @change='save()'
                />
                <div class='text-h6'>Mobiltelefon</div>
                  <q-input
                    outlined
                    v-model="mobilfunk"
                    hint="(Bitte im Format 0171-123456)"
                    @change='save()'
                  />
                  <div class='text-h6'>Email</div>
                    <q-input
                      outlined
                      type='email'
                      v-model="email"
                      hint="(für Benachrichtigungen/Erinnerungen)"
                      @change='save()'
                    />
        </q-card-section>
    </q-card>
    <Einschraenkungen ref="s6" @input='save()' :items='items' v-if='this.$branch.mod_s6'/>
    <PSNV ref="psnv" @input='save()' :items='items' v-if='this.$branch.mod_psnv'/>
    <Teileinheiten ref="lm" @input='save()' :items='items' v-if='this.$branch.mod_lm'/>
    <Taktischequalifikation ref="takt" @input='save()' :items='items' v-if='this.$branch.mod_takt'/>
    <Medizinischequalifikation ref="qual" @input='save()' :items='items' v-if='this.$branch.mod_qual'/>

    <q-card  class="shadow-8" style='margin-bottom:25px;' v-if='this.accessLevel > 0'>
        <q-card-section class='bg-dark text-white text-h5'>
          Ausstehende Rückmeldungen
        </q-card-section>
        <q-card-section>
          <div class='text-h6'>Seit 24 Stunden:</div>
          <q-list v-for="helfer in timeout1" :key="helfer.code"  bordered separator>
            <q-item-section>
                <q-item-label caption>{{ helfer.code }}</q-item-label>
                <q-item-label>{{ helfer.vornamen }} {{ helfer.nachnamen }}</q-item-label>
                <q-item-label><a v-bind:href='"tel:"+helfer.mobilfunk'>{{ helfer.mobilfunk }}</a> <a v-bind:href='"mailto:"+helfer.email'>{{ helfer.email }}</a></q-item-label>
            </q-item-section>
          </q-list>
        </q-card-section>
        <q-card-section>
          <div class='text-h6'>Seit 36 Stunden (entfernt aus Stärkeberechnung):</div>
          <q-list v-for="helfer in timeout2" :key="helfer.code"  bordered separator>
            <q-item-section>
                <q-item-label caption>{{ helfer.code }}</q-item-label>
                <q-item-label>{{ helfer.vornamen }} {{ helfer.nachnamen }}</q-item-label>
                <q-item-label><a v-bind:href='"tel:"+helfer.mobilfunk'>{{ helfer.mobilfunk }}</a> <a v-bind:href='"mailto:"+helfer.email'>{{ helfer.email }}</a></q-item-label>
            </q-item-section>
          </q-list>
        </q-card-section>
    </q-card>
    <q-card  class="shadow-8" style='margin-bottom:25px;' v-if='this.accessLevel > 0'>
        <q-card-section class='bg-dark text-white text-h5'>
          Helferübersicht
        </q-card-section>
        <q-card-section>
          <q-table
                :data="items"
                :columns="columns"
                row-key="code"
                flat
                virtual-scroll
                :pagination.sync="pagination"
                :selected.sync="selected"
                selection="single"
          >
          </q-table>
          <q-btn @click='schizo()' color='red' label='Zum Helfer werden' icon='spa' v-if='selected.length > 0'/>
        </q-card-section>
        <q-card-section>
          <q-btn @click='xls()' label='Export' icon='cloud_download'/>
        </q-card-section>
    </q-card>
    <q-toggle v-model="viewStaerke" @input='dspLevel()' v-if='this.accessLevel > 0' label='Stärkemeldungen anzeigen'/>
  </q-page>
</template>

<script>
import axios from 'axios'
import XLSX from 'xlsx'
import Teileinheiten from '../components/Teileinheiten'
import Taktischequalifikation from '../components/Taktischequalifikation'
import Medizinischequalifikation from '../components/Medizinischequalifikation'
import Einschraenkungen from '../components/Einschraenkung'
import PSNV from '../components/PSNV'
import { date } from 'quasar'

const preferedTimeout1 = 24 * 3600 * 1000
const preferedTimeout2 = 36 * 3600 * 1000

export default {
  name: 'Anmeldung',
  components: {
    Teileinheiten,
    Taktischequalifikation,
    Medizinischequalifikation,
    Einschraenkungen,
    PSNV
  },
  data: function () {
    const res = {

    }
    const columns = []
    columns.push({ name: 'vornamen', align: 'left', label: 'Vornamen', field: 'vornamen', sortable: true })
    columns.push({ name: 'nachnamen', align: 'left', label: 'Nachnamen', field: 'nachnamen', sortable: true })
    columns.push({
      name: 'availability',
      align: 'left',
      label: 'Verfügbarkeit',
      field: 'availability',
      sortable: true,
      format: (val, row) => {
        if (val === 'green') return 'Verfügbar'
        if (val === 'yellow') return 'Bedingt'
        if (val === 'red') return 'Nicht'
      }
    })
    columns.push({ name: 'timeStamp', align: 'left', label: 'Aktualisiert', field: 'timeStamp', sortable: true, format: (val, row) => { return date.formatDate(val, 'HH:mm DD.MM.') } })
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
    res.selected = []
    res.items = []
    res.osid = ''
    res.pagination = {
      rowsPerPage: 32
    }
    return res
  },
  computed: {
    lm () {
      return Teileinheiten.data
    },
    takt () {
      return Taktischequalifikation.data
    }
  },
  methods: {
    dspLevel () {
      if (this.viewStaerke) this.accessLevel = 1; else this.accessLevel = 0
    },
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
          window.OneSignal.getUserId().then(function (x) {
            parent.osid = x
            if (x !== null) {
              window.localStorage.setItem('deviceId', x)
            }
          })
        } else {
          console.log('notGranted')
          setTimeout(function () {
            parent.checkGranted()
          }, 5000)
        }
      }])
    },
    schizo () {
      window.localStorage.setItem('code', this.selected[0].code)
      window.localStorage.removeItem('s2')
      this.$router.push('/anmelden')
    },
    retrieve () {
      const parent = this
      const domain = this.domain
      if ((this.osid === null) || (this.osid.length < 1)) {
        if (window.localStorage.getItem('deviceId') !== null) {
          this.osid = window.localStorage.getItem('deviceId')
        }
      }
      axios.get('https://api.corrently.io/core/status2?domain=' + domain + '&osid=' + this.osid + '&code=' + window.localStorage.getItem('code')).then(async function (response) {
        const cachepros = {
          _green: 0,
          _yellow: 0,
          _red: 0
        }
        const timeout1 = []
        const timeout2 = []
        for (const c in parent.$refs) {
          const component = parent.$refs[c]
          if ((typeof component !== 'undefined') && (typeof component.reset === 'function')) component.reset()
        }
        parent.items = response.data.Items
        for (let j = 0; j < response.data.Items.length; j++) {
          if (response.data.Items[j].timeStamp > new Date().getTime() - (preferedTimeout2)) {
            // Traverse Childs
            for (const c in parent.$refs) {
              for (const propName in response.data.Items[j]) {
                const component = parent.$refs[c]
                if (typeof component[propName + '_' + response.data.Items[j].availability] !== 'undefined') {
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
            }

            for (const propName in response.data.Items[j]) {
              if (typeof parent[propName + '_' + response.data.Items[j].availability] !== 'undefined') {
                if (response.data.Items[j][propName]) {
                  if (typeof cachepros[propName + '_green'] === 'undefined') cachepros[propName + '_green'] = 0
                  if (typeof cachepros[propName + '_yellow'] === 'undefined') cachepros[propName + '_yellow'] = 0
                  if (typeof cachepros[propName + '_red'] === 'undefined') cachepros[propName + '_red'] = 0
                  // cachepros[propName + '_' + response.data.Items[j].availability]++
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
          for (const c in parent.$refs) {
            const component = parent.$refs[c]
            if (typeof component[n] !== 'undefined') {
              component[n] = cachepros[n]
            }
          }
        }
        parent.timeout1 = timeout1
        parent.timeout2 = timeout2
      })
    },
    xls () {
      const wb = XLSX.utils.book_new()
      wb.Props = {
        Title: 'Status2 ' + process.env.BRANCH,
        Subject: 'Verfügbarkeitsinformation',
        Author: 'STROMDAO GmbH',
        CreatedDate: new Date()
      }
      wb.SheetNames.push('Alle Helfer')
      const rows = []
      const firstrow = ['Nachnamen', 'Vornamen', 'Verfügbarkeit', 'Code']
      for (const prop in this.items[0]) {
        firstrow.push(prop)
      }
      rows.push(firstrow)
      for (let i = 0; i < this.items.length; i++) {
        const row = []
        row.push(this.items[i].nachnamen)
        row.push(this.items[i].vornamen)
        row.push(this.items[i].availability)
        row.push(this.items[i].code)
        for (const prop in this.items[0]) {
          row.push(this.items[i][prop])
        }
        rows.push(row)
      }
      const ws = XLSX.utils.aoa_to_sheet(rows)
      wb.Sheets['Alle Helfer'] = ws
      XLSX.writeFile(wb, 'Status2.xlsx')
      console.log(this.items)
    },
    save () {
      console.log('saving')
      const data = {
        code: window.localStorage.getItem('code')
      }

      for (const propName in this) {
        if ((propName.substr(0, 1) !== '$') && (propName.substr(0, 1) !== '_')) {
          if ((typeof this[propName] === 'string') || (typeof this[propName] === 'boolean') || (typeof this[propName] === 'number')) {
            if ((propName.indexOf('_green') < 0) && (propName.indexOf('_yellow') < 0) && (propName.indexOf('_red') < 0)) {
              data[propName] = this[propName]
            }
          }
        }
      }

      for (const c in this.$refs) {
        const component = this.$refs[c]
        for (const propName in component) {
          if ((propName.substr(0, 1) !== '$') && (propName.substr(0, 1) !== '_')) {
            if ((typeof component[propName] === 'string') || (typeof component[propName] === 'boolean') || (typeof component[propName] === 'number')) {
              if ((propName.indexOf('_green') < 0) && (propName.indexOf('_yellow') < 0) && (propName.indexOf('_red') < 0)) {
                data[propName] = component[propName]
              }
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
      /* if (typeof window.OneSignal === 'undefined') {
        console.log('secondary OS registration')
        this.$oneSignal.setup(this.$branch.OS_PUBLIC_KEY)
      } */
      const p = this
      const OneSignal = window.OneSignal || []
      OneSignal.push(function () {
        OneSignal.init({
          allowLocalhostAsSecureOrigin: true,
          appId: p.$branch.OS_PUBLIC_KEY,
          notifyButton: {
            enable: true
          }
        })
      })
      // this.$oneSignal.setup(this.$branch.OS_PUBLIC_KEY)
      if (window.localStorage.getItem('s2') !== null) {
        const obj = JSON.parse(window.localStorage.getItem('s2'))
        for (var propName in obj) {
          this[propName] = obj[propName]
        }
      }
      if (process.env.DEV) {
        console.log('ENV: dev')
      }
      if (process.env.BRANCH) {
        console.log('BRANCH', process.env.BRANCH)
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
