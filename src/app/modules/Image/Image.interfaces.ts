export type TImage = { name: string; path: string; cloud_id: string };

export type TDeleteImagePayload = {
  cloud_ids: string[];
};
