export interface StoreType {
  id: number;
  phone?: string | null;
  address?: string | null;
  name?: string | null;
  category?: string | null;
  lat?: string | null;
  lag?: string | null;
  stroeType?: string | null;
  foodCertifyName?: string | null;
}

export interface StoreApiResponse {
  data: StoreType[];
  totalPage?: number;
  totalCount?: number;
  page?: number;
}
