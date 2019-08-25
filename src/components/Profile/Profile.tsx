import React, { Component } from "react";
import withStyles from "./styles";
import { Link } from 'react-router-dom'
import Header from "../Header/Header";
import { projects } from "../../config/firestore";
import * as firebase from "firebase/app";
import { generateUid } from "../../utils";


interface IProfileState {
    projects: Array<any>;
    dataLoaded: boolean;
}

class Profile extends Component<any, IProfileState> {

    constructor(props) {
        super(props);
        this.state = { projects: [], dataLoaded: false };
    }

    public componentDidMount() {
        // FIXME
        // UID needs to be determined from url if a username is given, 
        // or default to authorized user
        firebase.auth().onAuthStateChanged(user => {
            if (user != null) {
                let uid = firebase.auth().currentUser.uid;

                // Need to fix this...
                projects.where("userUid", "==", uid).get()
                    .then(querySnapshot => {
                        // FIXME: Must be a better way...
                        let projects = [];
                        querySnapshot.forEach(d => projects.push(d.data()));
                        this.setState({ projects, dataLoaded: true })
                        console.log(projects)
                    })
                    .catch(e => {
                        console.log("ERROR loading projects");
                    });

            } else {
                this.setState({...this.state, dataLoaded: true})
            }
        })


    }
    public render() {

        let projectLinks = [<li key="-1">Loading projects...</li>];

        if (this.state.dataLoaded) {
            let projects = this.state.projects;
            projectLinks = [<li key="0">No Projects found for user.</li>];

            if (projects != null && projects.length > 0) {
                projectLinks = projects.map(doc =>
                    <li key={doc.projectUid}><Link to={"/editor/" + doc.projectUid}>{doc.name}</Link></li>
                );
            }
        }

        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Header showMenuBar={false} />
                <main>
                    <h1>Profile</h1>
                    <p> </p>
                    <p>
                        <Link to="" onClick={this.createNewProject} >
                            + Create New Project
                        </Link>
                    </p>
                    <h2>User Projects</h2>
                    <ul>
                        {projectLinks}
                    </ul>
                </main>
            </div>
        )
    }

    createNewProject(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
        e.stopPropagation();
        e.preventDefault();
        // FIXME - use a different filename
        let docId = generateUid("project");

        // FIXME - check if current user is == to user profile being viewed
        let currentUser = firebase.auth().currentUser;

        if (currentUser != null) {
            let uid = firebase.auth().currentUser.uid;

            let newProject = {
                userUid: uid,
                projectUid: docId,
                name: "New Project",
                public: false,
            };

            projects.doc(docId).set(newProject)
                .then(() => {

                })
                .catch(err => {

                });

        }
    }
}

export default withStyles(Profile);
