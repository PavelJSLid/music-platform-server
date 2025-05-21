import {
    Controller,
    Post,
    Body,
    Get,
    Query,
    Param,
    Delete,
} from '@nestjs/common';
import { PlaylistService } from '../playlist/playlist.service';
import { CreatePlaylistDto } from '../playlist/dto/create-playlist.dto';


@Controller('/playlists')
export class PlaylistController {
    constructor(private readonly playlistService: PlaylistService) { }

    @Post()
    create(@Body() dto: CreatePlaylistDto) {
        return this.playlistService.create(dto);
    }

    @Get()
    getAll(@Query('count') count: number, @Query('offset') offset: number) {
        return this.playlistService.getAll(count, offset);
    }

    @Get('/search')
    search(@Query('query') query: string) {
        return this.playlistService.search(query);
    }

    @Get(':id')
    getOne(@Param('id') id: string) {
        return this.playlistService.getOne(id);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.playlistService.delete(id);
    }

    @Post(':id/tracks/:trackId')
    addTrackToPlaylist(@Param('id') playlistId: string, @Param('trackId') trackId: string) {
        return this.playlistService.addTrack(playlistId, trackId);
    }
}