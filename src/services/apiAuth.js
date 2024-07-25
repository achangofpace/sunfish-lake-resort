import { DEMO_EMAIL } from "../utils/constants";
import supabase, { supabaseUrl } from "./supabase";

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) {
    return null;
  }
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error);
  }

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut({});
  if (error) {
    throw new Error(error.message)
  }
}

export async function signup({ fullName, email, password }) {
  const currUser = await getCurrentUser();
  if (currUser.email === DEMO_EMAIL) {
    return;
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: ""
      }
    }
  });

  if (error) {
    throw new Error(error.message)
  }

  return data;
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  const currUser = await getCurrentUser();
  if (currUser.email === DEMO_EMAIL) {
    return;
  }

  // 1. update password OR fullName (not both)
  let updateData;
  if (password) {
    updateData = { password };
  }
  if (fullName) {
    updateData = { data: { fullName } };
  }

  const { data, error: update_user_error } = await supabase.auth.updateUser(updateData);

  if (update_user_error) {
    throw new Error(update_user_error.message);
  }

  if (!avatar) {
    return data;
  }

  // 2. Upload the avatar image
  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const imagePath = `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`;

  const { error: upload_avatar_error } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (upload_avatar_error) {
    throw new Error(upload_avatar_error.message);
  }
  // 3. Update the user again using the avatar image link

  const {
    data: updated_user,
    error: update_user_avatar_error
  } = await supabase.auth.updateUser({data: {avatar: imagePath}});

  if (update_user_avatar_error) {
    throw new Error(update_user_avatar_error.message);
  }

  return updated_user;
}
