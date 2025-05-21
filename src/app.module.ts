import { Module } from "@nestjs/common";
import { TrackModule } from "./track/track.module";
import { MongooseModule } from "@nestjs/mongoose";
import { FileModule } from "./file/file.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import * as path from "path";
import { AlbumModule } from "./album/album.module";
import { PlaylistModule } from "./playlist/playlist.module";



@Module({
    imports: [
        ServeStaticModule.forRoot({ rootPath: path.resolve(__dirname, '..', 'static') }),
        MongooseModule.forRoot('mongodb+srv://admin:admin@cluster0.pnv14.mongodb.net/music-platform?retryWrites=true&w=majority&appName=Cluster0'),
        TrackModule,
        AlbumModule,
        FileModule,
        PlaylistModule
    ]
})
export class AppModule { }