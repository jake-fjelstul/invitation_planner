/**
 * js/supabase.js - Supabase integration (Dormant stub)
 */

import { CONFIG } from './config.js';

let supabaseClient = null;

export function initSupabase() {
  if (window.supabase && CONFIG.supabaseUrl && CONFIG.supabaseAnonKey) {
    try {
      supabaseClient = window.supabase.createClient(CONFIG.supabaseUrl, CONFIG.supabaseAnonKey);
      console.log("Supabase client initialized.");
    } catch (e) {
      console.warn("Supabase init failed:", e);
    }
  }
}

export async function saveInvitationResponse(answers) {
  if (!supabaseClient) {
    console.log("Supabase is dormant. Local state saved:", answers);
    return { success: true, dormant: true };
  }

  try {
    const { data, error } = await supabaseClient
      .from(CONFIG.tableName)
      .upsert([
        {
          guest_name: CONFIG.guestName,
          answers: answers,
          updated_at: new Date().toISOString()
        }
      ]);

    if (error) throw error;
    return { success: true, data };
  } catch (err) {
    console.error("Error saving response to Supabase:", err);
    return { success: false, error: err };
  }
}
