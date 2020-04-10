<template>
  <q-card  class="shadow-8" style='margin-bottom:25px;'>
      <q-card-section class='bg-primary text-white text-h5'>
      Verfügbarkeitseinschränkung durch
      </q-card-section>
      <q-card-section>
        <q-form
              class="q-gutter-md"
        >
         <q-checkbox v-model="s6_job" label="Beruf" @input='save()'><br/>
            <q-badge color='green' class='text-dark' v-if='this.accessLevel > 0'>{{ s6_job_green }}</q-badge>
            <q-badge color='yellow' class='text-dark' v-if='this.accessLevel > 0'>{{ s6_job_yellow }}</q-badge>
            <q-badge color='red' class='text-dark' v-if='this.accessLevel > 0'>{{ s6_job_red }}</q-badge>
         </q-checkbox>
         <q-checkbox v-model="s6_familie" label="Familie" @input='save()'><br/>
           <q-badge color='green' class='text-dark' v-if='this.accessLevel > 0'>{{ s6_familie_green }}</q-badge>
           <q-badge color='yellow' class='text-dark' v-if='this.accessLevel > 0'>{{ s6_familie_yellow }}</q-badge>
           <q-badge color='red' class='text-dark' v-if='this.accessLevel > 0'>{{ s6_familie_red }}</q-badge>
         </q-checkbox>
         <q-checkbox v-model="s6_gesundheit" label="Gesundheit" @input='save()'><br/>
           <q-badge color='green' class='text-dark' v-if='this.accessLevel > 0'>{{ s6_gesundheit_green }}</q-badge>
           <q-badge color='yellow' class='text-dark' v-if='this.accessLevel > 0'>{{ s6_gesundheit_yellow }}</q-badge>
           <q-badge color='red' class='text-dark' v-if='this.accessLevel > 0'>{{ s6_gesundheit_red }}</q-badge>
         </q-checkbox>
         <q-checkbox v-model="s6_bos" label="Andere BOS Einheit" @input='save()'><br/>
           <q-badge color='green' class='text-dark' v-if='this.accessLevel > 0'>{{ s6_bos_green }}</q-badge>
           <q-badge color='yellow' class='text-dark' v-if='this.accessLevel > 0'>{{ s6_bos_yellow }}</q-badge>
           <q-badge color='red' class='text-dark' v-if='this.accessLevel > 0'>{{ s6_bos_red }}</q-badge>
         </q-checkbox>
         <q-checkbox v-model="s6_andere" label="Sonstiger Grund" @input='save()'><br/>
           <q-badge color='green' class='text-dark' v-if='this.accessLevel > 0'>{{ s6_andere_green }}</q-badge>
           <q-badge color='yellow' class='text-dark' v-if='this.accessLevel > 0'>{{ s6_andere_yellow }}</q-badge>
           <q-badge color='red' class='text-dark' v-if='this.accessLevel > 0'>{{ s6_andere_red }}</q-badge>
         </q-checkbox>
       </q-form>
       <q-expansion-item
         expand-separator
         icon="list"
         label="Details"
         v-if='this.accessLevel > 0'
       >
       <div v-for='item in classes' :key="item.name">
          <div class='text-h6'>{{item.name}}</div>
          <q-table
                :data="codes[item.name]"
                :columns="columns"
                row-key="code"
                flat
                virtual-scroll
                :pagination.sync="pagination"
          />
       </div>
       </q-expansion-item>
      </q-card-section>
  </q-card>
</template>
<script>
export default {
  name: 'Teileinheiten',
  data: function () {
    const res = {
      s6_job: false,
      s6_familie: false,
      s6_gesundheit: false,
      s6_bos: false,
      s6_andere: false,
      accessLevel: 0
    }
    res.classes = []
    for (var propName in res) {
      if (typeof res[propName] === 'boolean') {
        res[propName + '_green'] = 0
        res[propName + '_yellow'] = 0
        res[propName + '_red'] = 0
        res.classes.push({ name: propName })
      }
    }
    const columns = []
    columns.push({ name: 'vornamen', align: 'left', label: 'Vornamen', field: 'vornamen', sortable: true })
    columns.push({ name: 'nachnamen', align: 'left', label: 'Nachnamen', field: 'nachnamen', sortable: true })
    columns.push({ name: 'availability', align: 'left', label: 'Verfügbarkeit', field: 'availability', sortable: true })
    res.columns = columns
    return res
  },
  computed: {
    codes () {
      const res = []
      for (let i = 0; i < this.items.length; i++) {
        const item = this.items[i]
        let found = false
        for (let j = 0; j < this.classes.length; j++) {
          const c = this.classes[j].name
          if (typeof res[c] === 'undefined') res[c] = []
          if ((typeof item[c] === 'boolean') && (typeof this[c] === 'boolean') && (item[c] === true)) {
            found = true
            res[c].push(item)
          }
        }
        if (found) {
          // res[c].push(item)
        }
      }
      return res
    }
  },
  props: ['items'],
  methods: {
    reset () {
      for (var propName in this) {
        if (typeof this[propName + '_green'] !== 'undefined') this[propName + '_green'] = 0
        if (typeof this[propName + '_yellow'] !== 'undefined') this[propName + '_yellow'] = 0
        if (typeof this[propName + '_red'] !== 'undefined') this[propName + '_red'] = 0
      }
    },
    save () {
      this.$emit('input')
    }
  }
}
</script>
