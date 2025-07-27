import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);
const activities_bucket_name = "activities-images";
const projects_bucket_name = "projects-images";

export type Activity = {
  id: string;
  title: string;
  description: string;
  type:
    | "all"
    | "hackathon"
    | "project"
    | "achievement"
    | "conference"
    | "workshop";
  created_at: string;
  images?: string[];
};

export type Project = {
  id: string;
  title: string;
  images: string[];
  description: string;
  technologies_used: string[];
  repo_link: string;
  contexts: string[];
  created_at: string;
};

export async function getAllProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data as Project[];
}

export async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data as Project[];
}

export async function getAllActivities(
  page: number,
  pageSize: number
): Promise<Activity[]> {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error } = await supabase
    .from("activities")
    .select("*")
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) throw new Error(error.message);
  return data as Activity[];
}

export async function getActivitiesByType(
  type: Activity["type"],
  page: number,
  pageSize: number
): Promise<Activity[]> {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error } = await supabase
    .from("activities")
    .select("*")
    .eq("type", type)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) throw new Error(error.message);
  return data as Activity[];
}

export async function getTotalActivityCount(
  type?: Activity["type"]
): Promise<number> {
  let query = supabase
    .from("activities")
    .select("*", { count: "exact", head: true });

  if (type && type !== "all") {
    query = query.eq("type", type);
  }

  const { count, error } = await query;

  if (error) throw new Error(error.message);
  return count ?? 0;
}

export async function getActivityImageUrls(
  title: string,
  filenames: string[]
): Promise<string[]> {
  if (!filenames || filenames.length === 0) return [];

  const urls = filenames.map((filename) => {
    const { data } = supabase.storage
      .from(activities_bucket_name)
      .getPublicUrl(`${title}/${filename}`);
    return data.publicUrl;
  });

  return urls;
}

export async function getProjectImageUrls(
  title: string,
  filenames: string[]
): Promise<string[]> {
  if (!filenames || filenames.length === 0) return [];

  const urls = filenames.map((filename) => {
    const { data } = supabase.storage
      .from(projects_bucket_name)
      .getPublicUrl(`${title}/${filename}`);
    return data.publicUrl;
  });

  return urls;
}
