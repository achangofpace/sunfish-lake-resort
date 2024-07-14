import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

export async function createCabin(new_cabin) {
  const imageName = `${Math.random()}-${new_cabin.image.name}`.replace("/","");
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // const duplicateName = "0.047097928104704145-snake.jpg";
  // const duplicatePath = "https://ctclrfjhrxsebgoysfiu.supabase.co/storage/v1/object/public/cabin-images/0.047097928104704145-snake.jpg";

  // create new cabin in cabins table
  const {
    data: created_cabin_data,
    error: cabins_table_insert_error
  } = await supabase.from("cabins").insert([{...new_cabin, image: imagePath}]).select();

  if (cabins_table_insert_error) {
    console.error(cabins_table_insert_error);
    throw new Error("Cabin could not be created");
  }

  // upload photo on success
  const {
    error: img_upload_error
  } = await supabase.storage.from("cabin-images").upload(imageName, new_cabin.image);

  if (img_upload_error) {
    await deleteCabin(created_cabin_data[0].id);
    console.error(img_upload_error);
    throw new Error("Cabin image could not be uploaded. The cabin was not created.");
  }

  return created_cabin_data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
  return data;
}