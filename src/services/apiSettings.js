import supabase from "./supabase";
import { getCurrentUser } from "./apiAuth";
import { DEMO_EMAIL } from "../utils/constants";

async function isDemoSettingsTable() {
  const currUser = await getCurrentUser();
  if (currUser.email === DEMO_EMAIL) {
    return "settings_demo";
  } else {
    return "settings";
  }
}

export async function getSettings() {
  const settings_table = await isDemoSettingsTable();
  const { data, error } = await supabase
    .from(settings_table)
    .select("*")
    .single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be loaded");
  }
  return data;
}

// We expect a newSetting object that looks like {setting: newValue}
export async function updateSetting(newSetting) {
  const settings_table = await isDemoSettingsTable();
  const { data, error } = await supabase
    .from(settings_table)
    .update(newSetting)
    // There is only ONE row of settings, and it has the ID=1, and so this is the updated one
    .eq("id", 1)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be updated");
  }
  return data;
}
