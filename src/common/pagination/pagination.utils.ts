import { Pagination } from './pagination.dto';

export class PaginationUtil {
  static getSkip(pagination: Pagination): number {
    if (!pagination.page || pagination.page <= 0) return 0;
    return (pagination.page - 1) * pagination.limit;
  }

  static getTake(pagination: Pagination): number {
    return pagination.limit || 10; // Default to 10 if not provided
  }
}
