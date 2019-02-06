import * as t from './actionTypes';
import * as api from './scenes/Home/api';

// Add a Project
export function addProject(project, successCB, errorCB) {
    return (dispatch) => {
        api.addProject(project, function (success, data, error) {
            if (success) successCB();
            else if (error) errorCB(error)
        });
    };
}

// Get Projects

export function getProjects(errorCB) {
    // This is the only function that actually dispatches anything to the reducer. You're using Firebase Realtime functionality and a listner has been set up in getProjects function (api.js)
    return (dispatch) => {
        // the LOADING_PROJECTS action sets the isLoading sate variable to true ONLY if the projects state variable is empty. Allows display of Activity Indicator in view to indicate projects retrieved
        dispatch({type: t.LOADING_PROJECTS});
        api.getProjects(function (success, data, error) {
            // the PROJECTS_AVAILABLE action is the READ operation. Firebase returns data as a snapshot.
            if (success) dispatch({type: t.PROJECTS_AVAILABLE, data});
            else if (error) errorCB(error)
        });
    };
}

// Update Project
export function updateProject(project, successCB, errorCB) {
    return (dispatch) => {
        api.updateProject(project, function (success, data, error) {
            if (success) successCB();
            else if (error) errorCB(error)
        });
    };
}

// Delete Project
export function deleteProject(project, errorCB) {
    return (dispatch) => {
        api.deleteProject(project, function (success, data, error) {
            if (error) errorCB(error)
        });
    };
}

// Like/Unlike
export function toggleLove(data, errorCB) {
    return (dispatch) => {
        dispatch({type: t.LOADING_PROJECTS});
        api.toggleLove(data, function (success, data, error) {
            if (error) errorCB(error)
        });
    };
}

