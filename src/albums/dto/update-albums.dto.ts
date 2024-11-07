import { IsString, IsNumber, IsUUID, IsOptional } from 'class-validator';

export class UpdateAlbumsDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsNumber()
  @IsOptional()
  year: number;

  @IsOptional()
  @IsUUID()
  artistId?: string | null;
}
