/**
 * js/config.js - Central configuration for Two Lanes to New Orleans
 * All editable details live here. Nothing is hardcoded elsewhere.
 */

export const CONFIG = {
  // Guest & Host
  guestName: "Traveler",
  hostName: "Jake",

  // Dates & Schedule
  weekendDates: "September 25–27",
  departDay: "Friday",
  classEndTime: "3:15 PM",
  departTime: "3:45 PM",
  departISO: "2026-09-25T15:45:00-04:00",
  returnDay: "Sunday",
  returnTime: "10:00 AM",

  // Trip Stats
  driveMiles: 470,
  driveHours: 7,

  // Hotel / Accommodation
  hotelName: "Hampton Inn New Orleans French Quarter Market Area",
  hotelShort: "Hampton Inn — French Quarter",
  hotelAddress: "501 Elysian Fields Ave, New Orleans, LA 70117",
  hotelMapsUrl: "https://www.google.com/maps/search/?api=1&query=501+Elysian+Fields+Ave,+New+Orleans,+LA+70117",
  hotelNote: "Frenchmen Street is a four-minute walk.",

  // Extras
  playlistUrl: "https://music.apple.com/us/playlist/pl.u-KVXBkl3TLeMkLRk?a=join&it=ZN48lnaiMmJGMvGSX7jK6",
  groupSize: 2,

  // Supabase Integration (Stub configuration)
  supabaseUrl: "https://lzbpfirlhodcwqfwcpnz.supabase.co",
  supabaseAnonKey: "sb_publishable_NTNz1y0nPNCL-6BFoPfu4g_jtfhNXCn",
  tableName: "nola_invitation_responses"
};
