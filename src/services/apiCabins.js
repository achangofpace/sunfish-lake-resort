import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

export async function createOrEditCabin(new_cabin, id) {
  const hasImagePath = new_cabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${new_cabin.image.name}`.replace("/","");
  const imagePath = hasImagePath ?
    new_cabin.image
    :
    `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // const duplicateName = "0.047097928104704145-snake.jpg";
  // const duplicatePath = "https://ctclrfjhrxsebgoysfiu.supabase.co/storage/v1/object/public/cabin-images/0.047097928104704145-snake.jpg";

  // create new cabin in cabins table
  let query = supabase.from("cabins"); // querybuilder doesn't send my request until I await or .then()
  if (!id) {
    query = query.insert([{...new_cabin, image: imagePath}]);
  } else {
    query = query.update([{...new_cabin, image: imagePath}]).eq("id", id);
  }

  const {
    data: created_cabin_data,
    error: cabins_table_insert_error
  } = await query.select().single();

  if (cabins_table_insert_error) {
    console.error(cabins_table_insert_error);
    throw new Error("Cabin could not be created");
  }

  if (hasImagePath) {
    return created_cabin_data;
  }

  // upload/update photo on success
  const {
    error: img_upload_error
  } = await supabase.storage.from("cabin-images").upload(imageName, new_cabin.image);

  if (img_upload_error) {
    await deleteCabin(created_cabin_data.id);
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