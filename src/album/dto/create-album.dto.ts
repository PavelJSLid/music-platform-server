export class CreateAlbumDto {
    readonly name: string;
    readonly author: string;
    readonly tracks?: string | string[];
}