import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    personalInfo: {},
    medicalProfile: {},
    accountSettings: {},
    securitySettings: {},
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        initializeData: (state, action) => {
            const rawData = action.payload;
            const { firstName, lastName, role, specialization, emailId, phone: primaryPhone, biography, bloodType, dateOfBirth, gender, avatar } = rawData;
            const { street, city, state: addressState, zipCode, country } = rawData.address;
            const { name, relatioship, phone: emergencyPhone } = rawData.emergencyContact;

            state.personalInfo = {
                firstName,
                lastName,
                role,
                specialization,
                emailId,
                primaryPhone,
                biography,
                bloodType,
                dateOfBirth,
                gender,
                avatar,
                address: {
                    street,
                    city,
                    state: addressState,
                    zipCode,
                    country
                },
                emergencyContact: {
                    name,
                    relatioship,
                    phone: emergencyPhone
                }
            };
            state.medicalProfile = rawData.medicalProfile;
            state.accountSettings = rawData.accountSettings;
            state.securitySettings = rawData.securitySettings;
            console.log("State Initialized: ", JSON.parse(JSON.stringify(state)));
        }
    }
});

export const { initializeData } = userSlice.actions;
export const userReducer = userSlice.reducer;
