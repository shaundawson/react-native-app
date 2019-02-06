import * as t from './actionTypes';


let initialState = {
    isLoading: false,
    projects: []
};

const homeReducer = (state = initialState, action) => {
    switch (action.type) {
        case t.LOADING_PROJECTS: {
            const projects = state.projects;

            //show loading signal
            if (projects.length === 0) return {...state, isLoading: true}

            return state;
        }

        case t.PROJECTS_AVAILABLE: {
            let { data } = action;
            let projects = [];

            //convert the snapshot (json object) to array
            data.forEach(function (childSnapshot) {
                const item = childSnapshot.val();
                item.key = childSnapshot.key;

                projects.push(item);
            });

            projects.reverse();

            return {...state, projects, isLoading: false};
        }

        case t.LOGGED_OUT: {
            return {...state, projects: []};
        }

        default:
            return state;
    }
};

export default homeReducer;
