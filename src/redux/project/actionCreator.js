import actions from './actions';
import initialState from '../../demoData/projectData.json';

const {
  singleProjectBegin,
  singleProjectSuccess,
  singleProjectErr,

  filterProjectBegin,
  filterProjectSuccess,
  filterProjectErr,

  sortingProjectBegin,
  sortingProjectSuccess,
  sortingProjectErr,
} = actions;

const filterSinglePage = (paramsId) => {
  return async (dispatch) => {
    try {
      dispatch(singleProjectBegin());
      const data = initialState.filter((project) => {
        return project.id === parseInt(paramsId, 10);
      });
      dispatch(singleProjectSuccess(data));
    } catch (err) {
      dispatch(singleProjectErr(err));
    }
  };
};

const filterProjectByStatus = (status) => {
  return async (dispatch) => {
    try {
      dispatch(filterProjectBegin());
      console.log(status.data.length);
      console.log(status.filter);

      const data = status.data.filter((x) => status?.filter?.includes(x.job_status_));
      console.log(data.length);
      dispatch(filterProjectSuccess(data));
    } catch (err) {
      dispatch(filterProjectErr(err.toString()));
    }
  };
};

const sortingProjectByCategory = (sortBy) => {
  return async (dispatch) => {
    try {
      dispatch(sortingProjectBegin());
      const data = initialState.sort((a, b) => {
        return b[sortBy] - a[sortBy];
      });

      setTimeout(() => {
        dispatch(sortingProjectSuccess(data));
      }, 500);
    } catch (err) {
      dispatch(sortingProjectErr(err));
    }
  };
};

export { filterSinglePage, filterProjectByStatus, sortingProjectByCategory };
