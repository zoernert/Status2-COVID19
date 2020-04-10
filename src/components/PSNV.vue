<template>
  <q-card  class="shadow-8" style='margin-bottom:25px;'>
      <q-card-section class='bg-primary text-white text-h5'>
      PSNV Einsatz
      </q-card-section>
      <q-card-section>
        <q-form
              class="q-gutter-md"
        >
         <q-checkbox v-model="psnv_telefon" label="Telefon" @input='save()'><br/>
            <q-badge color='green' class='text-dark' v-if='this.accessLevel > 0'>{{ psnv_telefon_green }}</q-badge>
            <q-badge color='yellow' class='text-dark' v-if='this.accessLevel > 0'>{{ psnv_telefon_yellow }}</q-badge>
            <q-badge color='red' class='text-dark' v-if='this.accessLevel > 0'>{{ psnv_telefon_red }}</q-badge>
         </q-checkbox>
         <q-checkbox v-model="psnv_hintergrund" label="Vermittlung (Telefon)" @input='save()'><br/>
           <q-badge color='green' class='text-dark' v-if='this.accessLevel > 0'>{{ psnv_hintergrund_green }}</q-badge>
           <q-badge color='yellow' class='text-dark' v-if='this.accessLevel > 0'>{{ psnv_hintergrund_yellow }}</q-badge>
           <q-badge color='red' class='text-dark' v-if='this.accessLevel > 0'>{{ psnv_hintergrund_red }}</q-badge>
         </q-checkbox>
         <q-checkbox v-model="psnv_opsa" label="Vor Ort (kein PSA erforderlich)" @input='save()'><br/>
           <q-badge color='green' class='text-dark' v-if='this.accessLevel > 0'>{{ psnv_opsa_green }}</q-badge>
           <q-badge color='yellow' class='text-dark' v-if='this.accessLevel > 0'>{{ psnv_opsa_yellow }}</q-badge>
           <q-badge color='red' class='text-dark' v-if='this.accessLevel > 0'>{{ psnv_opsa_red }}</q-badge>
         </q-checkbox>
         <q-checkbox v-model="psnv_psa" label="Vor Ort (mit PSA)" @input='save()'><br/>
           <q-badge color='green' class='text-dark' v-if='this.accessLevel > 0'>{{ psnv_psa_green }}</q-badge>
           <q-badge color='yellow' class='text-dark' v-if='this.accessLevel > 0'>{{ psnv_psa_yellow }}</q-badge>
           <q-badge color='red' class='text-dark' v-if='this.accessLevel > 0'>{{ psnv_psa_red }}</q-badge>
         </q-checkbox>
         <q-checkbox v-model="psnv_e" label="Einsatzkräfte" @input='save()'><br/>
           <q-badge color='green' class='text-dark' v-if='this.accessLevel > 0'>{{ psnv_e_green }}</q-badge>
           <q-badge color='yellow' class='text-dark' v-if='this.accessLevel > 0'>{{ psnv_e_yellow }}</q-badge>
           <q-badge color='red' class='text-dark' v-if='this.accessLevel > 0'>{{ psnv_e_red }}</q-badge>
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
  name: 'PSNV',
  data: function () {
    const res = {
      psnv_telefon: false,
      psnv_hintergrund: false,
      psnv_opsa: false,
      psnv_psa: false,
      psnv_e: false,
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
    res.pagination = {
      rowsPerPage: 32
    }
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
