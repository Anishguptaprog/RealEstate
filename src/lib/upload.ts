import { createClient } from "@supabase/supabase-js";

export async function uploadAvatar(image:File){
    const supaURL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supaKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const supa = createClient(supaURL,supaKey);

    const data = await supa.storage.from("Avatar").upload(`${image.name}_${Date.now()}`,image);

    const urlData = await supa.storage.from("Avatar").getPublicUrl(data.data?.path!);

    return urlData.data.publicUrl;
}