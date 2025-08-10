import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    personalInfo: {data: {}, isEdited: false},
    medicalProfile: {data: {}, isEdited: false},
    accountSettings: {data: {}, isEdited: false},
    securitySettings: {data: {}, isEdited: false},
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        initializeData: (state, action) => {
            const rawData = action.payload;
            const { firstName, lastName, role, specialization, emailId, phone: primaryPhone, biography, bloodType, dateOfBirth, gender, avatar } = rawData;
            const { street, city, state: addressState, zipCode, country } = rawData.address;
            const { name, relationship, phone: emergencyPhone } = rawData.emergencyContact;

            state.personalInfo.data = { firstName, lastName, role, specialization, emailId, primaryPhone, biography, bloodType, dateOfBirth, gender, avatar,
                address: {
                    street,
                    city,
                    state: addressState,
                    zipCode,
                    country
                },
                emergencyContact: {
                    name,
                    relationship,
                    phone: emergencyPhone
                }
            };

            state.medicalProfile.data = rawData.medicalProfile;

            state.accountSettings.data = rawData.accountSettings;

            state.securitySettings.data = rawData.securitySettings;

        },
        updatePersonalData: (state, action) => {
            state.personalInfo.data = action.payload;
            state.personalInfo.isEdited = true;
        },
        updateMedicalData: (state, action) => {
            state.medicalProfile.data = {
                ...state.medicalProfile.data,
                ...action.payload
            };
            state.medicalProfile.isEdited = true;
        },
        updateAccountData: (state, action) => {
            state.accountSettings.data = action.payload;
            state.accountSettings.isEdited = true;
        },
        updateSecurityData: (state, action) => {
            state.securitySettings.data = action.payload;
            state.securitySettings.isEdited = true;
        },
        setStateEdited: (state, action) => {
            state.personalInfo.isEdited = false;
            state.medicalProfile.isEdited = false;
            state.accountSettings.isEdited = false;
            state.securitySettings.isEdited = false;
        }
    }
});

export const { 
    initializeData, 
    updatePersonalData,
    updateMedicalData, 
    updateAccountData, 
    updateSecurityData,
    setStateEdited,
} = userSlice.actions;
export const userReducer = userSlice.reducer;
