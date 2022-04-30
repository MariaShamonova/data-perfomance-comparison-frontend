import Vue from 'vue'
import Vuex from 'vuex'
import http from '@/http'

import {formattedChartArray} from '../helpers/formattedChartArray'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    students: [],
    chartsWrite: [],
    chartRead: {},
    params: {}
  },
  mutations: {
    SET_STUDENTS (state, students) {
      state.students = students
    },
    SET_CHARTS_WRITE (state, charts) {
      state.chartsWrite = charts
    },
    SET_CHART_READ(state, charts) {
      state.chartRead = charts
    },
    UPDATE_PARAMS(state, data){
      state.params = {
        ...state.params,
        ...data
      }
    }
  },
  actions: {
    async generateStudents ({
      state,
      commit
    }) {
      commit('SET_CHARTS_WRITE', [])
      commit('SET_CHART_READ', [])
      commit('SET_STUDENTS', [])
      
      try {
        const chartOneByOne =  http.generateStudents({
          params: {
            ...state.params, one_by_one:true
          }
        })
        const chartMany =  http.generateStudents({
          params: {
            ...state.params, one_by_one: false
          }
        })
        await Promise.all([
          chartOneByOne,
          chartMany
        ]).then((result) => {
          const data = formattedChartArray(result, ['One by one', 'Many'])
          commit('SET_CHARTS_WRITE', data)
        })

        
      } catch (err) {
        this._vm.$snotify.error('Failed to generate data.', 'Error')
      }
    },
    async getStudents ({
      state,
      commit
    }) {
      try {
        const data = await http.getStudents({
          params: {
            ...state.params
          }
        })
        console.log(data)
        commit('SET_STUDENTS', data.data)

        const chart = {...data.chart, title: ''}
        commit('SET_CHART_READ', chart)
      } catch (err) {
        this._vm.$snotify.error('Failed to load students.', 'Error')
      }
    },
  },
  modules: {
  }
})
