// standard-response.dto.ts
export class StandardResponseDto {
  constructor(
    public statusCode: number,
    public message: string,
    public data: any = null,
  ) {}
}
