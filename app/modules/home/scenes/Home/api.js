// this file creates several functions that interact with Firebase API to carry out CRUD operations
import {database} from "../../../../config/firebase";

// takes in new project data and a callback function as parameters
export function addProject(project, callback) {
    const { userId } = project;
    // create a new reference in the node containing all projects
    const newProjectRef = database.ref().child('projects').push();
    const newProjectKey = newProjectRef.key;

    // use key of new created reference as project id
    project.id = newProjectKey;

   // create a new object with two paths
    let updates = {};

    // this is the path of a new project
    updates['/projects/' + newProjectKey] = project;

    // this is the path that would store the project for signed in users, using the users id and the key of the new created reference
    updates['/user-projects/' + userId + '/' + newProjectKey] = project;

    // update the data in both locations
    database.ref().update(updates)
        .then(() => callback(true, project, null))
        .catch((error) => callback(false, null, error));
}

// takes in a callback function as a parameter to retriece all projects
export function getProjects(callback) {
    const projectsRef = database.ref('projects');

    // start listening to any changes that occurs in the projects node
    projectsRef.on('value', function(snapshot) {
        callback(true, snapshot, null)
    });
}

export function updateProject(project, callback) {
    const { id, userId } = project;

    let updates = {};
    updates['projects/' + id] = project;
    updates['/user-projects/' + userId + '/' + id] = project;

    database.ref().update(updates)
        .then(() => callback(true, project, null))
        .catch((error) => callback(false, null, error));
}

// a new reference does not need to be created, instead id of the project is extracted and used to carry out updates
export function deleteProject(project, callback) {
    const { id, userId } = project;

    // sets the values of the paths to null, this will delete that node and delete the project
    let updates = {};
    updates['projects/' + id] = null;
    updates['/user-projects/' + userId + '/' + id] = null;

    database.ref().update(updates)
        .then(() => callback(true, project, null))
        .catch((error) => callback(false, null, error));
}

export function toggleLove(data, callback) {
    const { project, uid } = data;
    const projectRef = database.ref('projects/' + project.id);

    projectRef.transaction(function(project) {
        if (project) {
            if (project.loves && project.loves[uid]) {
                project.loveCount--;
                project.loves[uid] = null;
            } else {
                project.loveCount++;
                if (!project.loves) project.loves = {};
                project.loves[uid] = true;
            }
        }

        return project;

    }, function(error, committed, snapshot) {
        if (error || !committed) callback(false, null, error)
        else callback(true, snapshot.val(), null)
    });
}
