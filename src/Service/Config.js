import {store} from '../Redux/Store';
export const Token = store.getState().auth.token;
//export const BaseUrl = 'https://stayconnected.virtualspheretechnologies.in/';

 export const BaseUrl = 'http://198.38.88.235:8082/';
export const Endpoints = {
  sendOtp: 'auth/send-otp',
  verifyOtp: 'auth/verify-otp',
  createprofile: 'api/createProfile',
  getallplan: 'api/getPlans',
  getuserdata: 'auth/getUser-data',
  sendUserlocation: 'api/member-location',
  getusergroup: 'api/getGroups',
  creategroup: 'api/send-invitation',
  acceptinvite: 'api/accept-invitation',
  deletegroup:'api/delete-group',
prndinginvite:'api/pending-groups',
deletemember:'api/deleteGroup-member',
getmemberlocation:'api/getMember-location',
paymentverification:'api/verifyPayment',
};