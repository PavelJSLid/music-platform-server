import { Module } from '@nestjs/common';
import { AlbumController } from '../album/album.controller';
import { AlbumService } from '../album/album.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Album, AlbumSchema } from '../album/schemas/album.schema';
import { Track, TrackSchema } from '../track/schemas/track.schema';
import { FileService } from 'src/file/file.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Album.name, schema: AlbumSchema },
            { name: Track.name, schema: TrackSchema },
        ]),
    ],
    controllers: [AlbumController],
    providers: [AlbumService, FileService],
})
export class AlbumModule { }