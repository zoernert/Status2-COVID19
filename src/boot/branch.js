import Vue from 'vue'

export default ({ urlPath, redirect }) => {
  return new Promise((resolve, reject) => {
    Vue.prototype.$branch = {
      OS_PUBLIC_KEY: 'efc392fc-0d14-40b1-bda7-891ce18b9eca',
      mod_lm: true,
      mod_takt: true,
      mod_qual: true,
      mod_s6: true,
      mod_psnv: false
    }

    if (process.env.BRANCH === 'stadt-mannheim-1ee') {
      console.log('Branch SM1EE')
      Vue.prototype.$branch.OS_PUBLIC_KEY = '98a1d9b6-1549-437f-9e24-682a30a9b48b'
      Vue.prototype.$branch.mod_s6 = true
      Vue.prototype.$branch.mod_psnv = false
    }

    if (process.env.BRANCH === 'development') {
      console.log('Development')
      Vue.prototype.$branch.OS_PUBLIC_KEY = '08c7925d-4765-4355-a3df-e0c98361eac2'
      Vue.prototype.$branch.mod_lm = true
      Vue.prototype.$branch.mod_psnv = true
    }

    if (process.env.BRANCH === 'drk-hd-rn-psnv') {
      console.log('drk-hd-rn-psnv')
      Vue.prototype.$branch.OS_PUBLIC_KEY = 'dcc00427-5530-46bf-93c5-f14fab73daf7'
      Vue.prototype.$branch.mod_s6 = true
      Vue.prototype.$branch.mod_lm = false
      Vue.prototype.$branch.mod_takt = true
      Vue.prototype.$branch.mod_psnv = true
    }

    if (process.env.BRANCH === 'drk-ov-wiesloch') {
        console.log(process.env.BRANCH)
        Vue.prototype.$branch.OS_PUBLIC_KEY = 'e5b7d1f9-d640-4c08-ae5b-aaf6bdd81a19'
        Vue.prototype.$branch.mod_s6 = true
        Vue.prototype.$branch.mod_psnv = false
    }

    resolve()
  })
}
