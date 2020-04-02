import Vue from 'vue'

export default ({ urlPath, redirect }) => {
  return new Promise((resolve, reject) => {
    Vue.prototype.$branch = {
      OS_PUBLIC_KEY: '08c7925d-4765-4355-a3df-e0c98361eac2',
      mod_lm: true,
      mod_takt: true,
      mod_qual: true
    }

    if (process.env.BRANCH === 'stadt-mannheim-1ee') {
      console.log('Branch SM1EE')
      Vue.prototype.$branch.OS_PUBLIC_KEY = '98a1d9b6-1549-437f-9e24-682a30a9b48b'
    }

    if (process.env.BRANCH === 'development') {
      console.log('Development')
      Vue.prototype.$branch.OS_PUBLIC_KEY = '98a1d9b6-1549-437f-9e24-682a30a9b48b'
    }
    resolve()
  })
}
