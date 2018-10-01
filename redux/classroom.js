import axios from 'axios';

const SET_CLASSROOM = 'SET_CLASSROOM';
const GET_CLASSROOM = 'GET_CLASSROOM';
const SET_LOADING = 'SET_LOADING_CLASSROOM';

const initialState = {
  loading: true,
  classrooms: [],
  classroom: {
    found: false
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CLASSROOM:
      return { ...state, loading: false, classrooms: action.classrooms };

    case GET_CLASSROOM:
      return { ...state, loading: false, classroom: action.classroom };

    case SET_LOADING:
      return { ...state, loading: action.value };

    default:
      return state;
  }
};

export default reducer;

export const setClassrooms = () => {
  return (dispatch) =>
    axios
      .get('/api/classroom')
      .then(({ data }) => data)
      .then((classrooms) => {
        if (!Array.isArray(classrooms)) {
          classrooms = [];
        }
        dispatch({ type: SET_CLASSROOM, classrooms });
      })
      .catch(() => dispatch({ type: SET_CLASSROOM, classrooms: [] }));
};

export const getClassroomDetail = (id) => {
  return (dispatch) =>
    axios
      .get(`/api/classroom/${id}`)
      .then(({ data }) => data)
      .then((classroom) => dispatch({ type: GET_CLASSROOM, classroom }))
      .catch(() => dispatch({ type: GET_CLASSROOM, classroom: {} }));
};

export const setLoading = (value) => ({
  type: SET_LOADING,
  value
});
