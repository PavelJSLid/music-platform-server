import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Query,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { AlbumService } from '../album/album.service';
import { CreateAlbumDto } from '../album/dto/create-album.dto';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('/albums')
export class AlbumController {
    constructor(private readonly albumService: AlbumService) { }

    @Post()
    @UseInterceptors(FileInterceptor('picture'))
    create(@UploadedFile() picture: Express.Multer.File, @Body() dto: CreateAlbumDto) {
        return this.albumService.create(dto, picture);
    }

    @Get()
    getAll(@Query('count') count: number, @Query('offset') offset: number) {
        return this.albumService.getAll(count, offset);
    }

    @Get('/search')
    search(@Query('query') query: string) {
        return this.albumService.search(query);
    }

    @Get(':id')
    getOne(@Param('id') id: string) {
        return this.albumService.getOne(id);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.albumService.delete(id);
    }

    @Post(':id/tracks/:trackId')
    addTrackToAlbum(@Param('id') albumId: string, @Param('trackId') trackId: string) {
        return this.albumService.addTrack(albumId, trackId);
    }
}