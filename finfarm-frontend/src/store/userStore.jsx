import { create } from "zustand";

const useUserStore = create((set) => ({
    accessToken:'',
    nickname:'',
    email:'',
    pointsInthePocket:0,
    profileImageUrl:'',
    isQuizSolved:false,
    dateOfSignup:'',
    accountPassword:'',

    setAccessToken:(accessToken)=> set({accessToken}),
    setNickname:(nickname)=> set({nickname}),
    setEmail:(email)=> set({email}),
    setPointsInthePocket:(pointsInthePocket)=> set({pointsInthePocket}),
    setProfileImageUrl:(profileImageUrl)=> set({profileImageUrl}),
    setIsQuizSolved:(isQuizSolved)=> set({isQuizSolved}),
    setDateOfSignup:(dateOfSignup)=> set({dateOfSignup}),
    setAccountPassword: (accountPassword)=> set({accountPassword}),

    resetAccessToken: () => set({ accessToken: '' }),
    resetNickname: () => set({ nickname: '' }),
    resetEmail: () => set({ email: '' }),
    resetPointsInthePocket: () => set({ pointsInthePocket: 0 }),
    resetProfileImageUrl: () => set({ profileImageUrl: '' }),
    resetIsQuizSolved: () => set({ isQuizSolved: false }),
    resetDateOfSignup: () => set({ dateOfSignup: '' }),
    resetAccountPassword: () => set({ accountPassword: '' }),
}));

export default useUserStore;