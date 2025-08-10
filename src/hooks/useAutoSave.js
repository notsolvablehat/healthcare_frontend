import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { updateData } from "../services/updateService"; 
import { setStateEdited } from "../redux/userSlice";

/**
 * @description A custom hook that automatically saves edited data from specified Redux slices.
 * It watches for changes in slices, debounces the save action, calls an update API,
 * and then resets the 'isEdited' flag in the Redux store.
 *
 * @param {number} debounceMs - The debounce delay in milliseconds. Defaults to 2500ms.
 */
const useAutoSave = (debounceMs = 2500) => {
    const dispatch = useDispatch();
    const debounceTimeout = useRef(null);

    const { personalInfo, medicalProfile, accountSettings, securitySettings } = useSelector(state => ({
        personalInfo: state.user.personalInfo,
        medicalProfile: state.user.medicalProfile,
        accountSettings: state.user.accountSettings,
        securitySettings: state.user.securitySettings,
    }));

    const slicesToWatch = [
        {
            name: "Personal Info",
            key: "personalInfo",
            state: personalInfo,
        },
        {
            name: "Medical Profile",
            key: "medicalProfile",
            state: medicalProfile,
        },
        {
            name: "Account Settings",
            key: "accountSettings",
            state: accountSettings,
        },
        {
            name: "Security Settings",
            key: "securitySettings",
            state: securitySettings,
        },
    ];

    useEffect(() => {
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

        const hasEdits = slicesToWatch.some(slice => slice.state.isEdited);

        if (!hasEdits) {
            return;
        }

        debounceTimeout.current = setTimeout(async () => {
            const payload = {};
            slicesToWatch.forEach(slice => {
                if (slice.state.isEdited) {
                    payload[slice.key] = slice.state.data;
                }
            });

            if (Object.keys(payload).length === 0) {
                return;
            }

            console.log('Auto-saving triggered with payload:');

            try {
                await updateData(payload);
                console.log('Data saved successfully.');

                dispatch(setStateEdited());

            } catch (error) {
                console.error('Failed to auto-save data:', error);
            }

        }, debounceMs);

        return () => {
            if (debounceTimeout.current) {
                clearTimeout(debounceTimeout.current);
            }
        };

    // The effect depends on the data of all slices. Using JSON.stringify ensures 
    // the effect re-runs on deep changes to the data objects, not just their references.
    }, [personalInfo, medicalProfile, accountSettings, securitySettings, dispatch, debounceMs]);

    // This hook performs side effects and does not need to return any value.
};

export default useAutoSave;
