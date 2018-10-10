const SET_RESULT = 'SET_RESULT'
const SET_STUDENT_ID = 'SET_STUDENT_ID'
const SET_LOADING = 'SET_LOADING_STUDENT'

const initialState = {
  loading: false,
  studentId: '',
  result: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_RESULT:
      return { ...state, result: action.value }
    case SET_STUDENT_ID:
      return { ...state, studentId: action.value }
    case SET_LOADING:
      return { ...state, loading: action.value }
    default:
      return state
  }
}

export default reducer

export const setResult = value => ({
  type: SET_RESULT,
  value
})

export const setStudentId = value => ({
  type: SET_STUDENT_ID,
  value
})

export const setLoading = value => ({
  type: SET_LOADING,
  value
})
