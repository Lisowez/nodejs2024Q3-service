import {
  IsString,
  IsUUID,
  IsOptional,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';

export class CreateAlbumsDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  year: number;

  @IsOptional()
  @IsUUID()
  artistId?: string | null;
}
