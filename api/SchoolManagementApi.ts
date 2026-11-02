import type { APIRequestContext, APIResponse } from '@playwright/test';

/** API tests are not page-object tests; this client centralizes HTTP operations. */
export class SchoolManagementApi {
  constructor(
    private readonly request: APIRequestContext,
    private readonly baseURL: string
  ) {}

  async getApplicationRoot(): Promise<APIResponse> {
    return this.request.get(new URL('./', this.baseURL).toString());
  }

  async getCurrentUser(options: { maxRedirects?: number } = {}): Promise<APIResponse> {
    return this.request.get(new URL('api/me', this.baseURL).toString(), options);
  }
}
