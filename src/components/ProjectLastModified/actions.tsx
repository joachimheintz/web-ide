import {
    getFirebaseTimestamp,
    projectLastModified,
    Timestamp
} from "@config/firestore";
import { UPDATE_PROJECT_LAST_MODIFIED_LOCALLY } from "./types";

export const updateProjectLastModified = async (projectUid: string) => {
    projectLastModified
        .doc(projectUid)
        .set({ timestamp: getFirebaseTimestamp() }, { merge: true });
};

export const updateProjectLastModifiedLocally = (
    projectUid: string,
    timestamp: Timestamp
) => ({
    type: UPDATE_PROJECT_LAST_MODIFIED_LOCALLY,
    projectUid,
    timestamp
});

export const getProjectLastModifiedOnce = (projectUid: string) => {
    return async dispatch => {
        const timestampRef = await projectLastModified.doc(projectUid).get();
        const timestampData = timestampRef.data() as any;
        const timestampOrNull = timestampData ? timestampData.timestamp : null;
        return await dispatch(
            updateProjectLastModifiedLocally(projectUid, timestampOrNull)
        );
    };
};
