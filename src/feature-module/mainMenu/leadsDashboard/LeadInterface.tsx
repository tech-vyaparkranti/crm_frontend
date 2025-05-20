export  type Lead = {
  id: number;
  lead_name: string;
  company_name: string;
  phone1: string;
  status: string;
};
export interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}