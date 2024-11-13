import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

 export class UpdateTrackDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsUUID()
  @IsOptional()
  artistId?: string | null;

  @IsUUID()
  @IsOptional()
  albumId?: string | null;

  @IsNumber()
  @IsOptional()
  duration?: number;
}
