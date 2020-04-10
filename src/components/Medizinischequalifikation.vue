<template>
  <q-card  class="shadow-8" style='margin-bottom:25px;'>
      <q-card-section class='bg-primary text-white text-h5'>
      Medizinische Qualifikation
      </q-card-section>
      <q-card-section>
        <q-form
              class="q-gutter-md"
        >
         <q-checkbox v-model="qual_sanh" label="Sanitätshelfer" @input='save()'><br>
           <q-badge color='green' class='text-dark' v-if='this.accessLevel > 0'>{{ qual_sanh_green }}</q-badge>
           <q-badge color='yellow' class='text-dark' v-if='this.accessLevel > 0'>{{ qual_sanh_yellow }}</q-badge>
           <q-badge color='red' class='text-dark' v-if='this.accessLevel > 0'>{{ qual_sanh_red }}</q-badge>
         </q-checkbox>
         <q-checkbox v-model="qual_rh" label="Rettungshelfer" @input='save()'><br>
           <q-badge color='green' class='text-dark' v-if='this.accessLevel > 0'>{{ qual_rh_green }}</q-badge>
           <q-badge color='yellow' class='text-dark' v-if='this.accessLevel > 0'>{{ qual_rh_yellow }}</q-badge>
           <q-badge color='red' class='text-dark' v-if='this.accessLevel > 0'>{{ qual_rh_red }}</q-badge>
         </q-checkbox>
         <q-checkbox v-model="qual_rs" label="Rettungssanitäter" @input='save()'><br>
           <q-badge color='green' class='text-dark' v-if='this.accessLevel > 0'>{{ qual_rs_green }}</q-badge>
           <q-badge color='yellow' class='text-dark' v-if='this.accessLevel > 0'>{{ qual_rs_yellow }}</q-badge>
           <q-badge color='red' class='text-dark' v-if='this.accessLevel > 0'>{{ qual_rs_red }}</q-badge>
         </q-checkbox>
         <q-checkbox v-model="qual_kp" label="Krankenpfleger" @input='save()'><br>
           <q-badge color='green' class='text-dark' v-if='this.accessLevel > 0'>{{ qual_kp_green }}</q-badge>
           <q-badge color='yellow' class='text-dark' v-if='this.accessLevel > 0'>{{ qual_kp_yellow }}</q-badge>
           <q-badge color='red' class='text-dark' v-if='this.accessLevel > 0'>{{ qual_kp_red }}</q-badge>
         </q-checkbox>
         <q-checkbox v-model="qual_ra" label="Rettungsassistent" @input='save()'><br>
           <q-badge color='green' class='text-dark' v-if='this.accessLevel > 0'>{{ qual_ra_green }}</q-badge>
           <q-badge color='yellow' class='text-dark' v-if='this.accessLevel > 0'>{{ qual_ra_yellow }}</q-badge>
           <q-badge color='red' class='text-dark' v-if='this.accessLevel > 0'>{{ qual_ra_red }}</q-badge>
         </q-checkbox>
         <q-checkbox v-model="qual_ns" label="Notfallsanitäter" @input='save()'><br>
           <q-badge color='green' class='text-dark' v-if='this.accessLevel > 0'>{{ qual_ns_green }}</q-badge>
           <q-badge color='yellow' class='text-dark' v-if='this.accessLevel > 0'>{{ qual_ns_yellow }}</q-badge>
           <q-badge color='red' class='text-dark' v-if='this.accessLevel > 0'>{{ qual_ns_red }}</q-badge>
         </q-checkbox>
         <q-checkbox v-model="qual_arzt" label="Arzt" @input='save()'><br>
           <q-badge color='green' class='text-dark' v-if='this.accessLevel > 0'>{{ qual_arzt_green }}</q-badge>
           <q-badge color='yellow' class='text-dark' v-if='this.accessLevel > 0'>{{ qual_arzt_yellow }}</q-badge>
           <q-badge color='red' class='text-dark' v-if='this.accessLevel > 0'>{{ qual_arzt_red }}</q-badge>
         </q-checkbox>
         <q-checkbox v-model="qual_notarzt" label="Notarzt" @input='save()'><br>
           <q-badge color='green' class='text-dark' v-if='this.accessLevel > 0'>{{ qual_notarzt_green }}</q-badge>
           <q-badge color='yellow' class='text-dark' v-if='this.accessLevel > 0'>{{ qual_notarzt_yellow }}</q-badge>
           <q-badge color='red' class='text-dark' v-if='this.accessLevel > 0'>{{ qual_notarzt_red }}</q-badge>
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
  name: 'Medizinischequalifikation',
  data: function () {
    const res = {
      qual_sanh: false,
      qual_rh: false,
      qual_rs: false,
      qual_kp: false,
      qual_ra: false,
      qual_ns: false,
      qual_arzt: false,
      qual_notarzt: false,
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
