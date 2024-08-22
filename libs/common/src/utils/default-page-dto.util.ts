export interface PageMetadataOptions {
  page: number;
  limit: number;
  count: number;
}

export class PageMetadataDto {
  readonly page: number;
  readonly limit: number;
  readonly count: number;
  readonly pageCount: number;
  readonly hasNextPage: boolean;
  readonly hasPreviousPage: boolean;

  constructor(options: PageMetadataOptions) {
    this.page = options.page;
    this.limit = options.limit;
    this.count = options.count;
    this.pageCount = Math.ceil(options.count / options.limit);
    this.hasNextPage = options.page < this.pageCount;
    this.hasPreviousPage = options.page > 1;
  }
}

export abstract class DefaultPageDto<T> {
  readonly data: T[];
  readonly metadata: PageMetadataDto;

  constructor(data: T[], metadata: PageMetadataOptions) {
    this.data = data;
    this.metadata = new PageMetadataDto(metadata);
  }
}

export class PageableDto<T> extends DefaultPageDto<T> {
  constructor(data: T[], metadata: PageMetadataOptions) {
    super(data, metadata);
  }
}
