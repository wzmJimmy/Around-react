export const API_ROOT = 'https://around-75015.appspot.com/api/v1';
export const KEY = 'TOKEN_KEY';
export const GEO_OPTIONS = {
    enableHighAccuracy: true,
    maximumAge        : 3600000,
    timeout           : 27000
}
export const POS_KEY = "POS_KEY";
export const AUTH_PREFIX = 'Bearer';
export function random(){return Math.random()*0.04-0.02;}