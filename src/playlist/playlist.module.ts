import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Playlist, PlaylistSchema } from './schemas/playlist.schema';
import { Track, TrackSchema } from 'src/track/schemas/track.schema';
import { PlaylistController } from './playlist.controller';
import { PlaylistService } from './playlist.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Playlist.name, schema: PlaylistSchema },
            { name: Track.name, schema: TrackSchema },
        ]),
    ],
    controllers: [PlaylistController],
    providers: [PlaylistService],
})
export class PlaylistModule { }