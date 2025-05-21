import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import * as mongoose from 'mongoose';

export type PlaylistDocument = Playlist & Document;

@Schema()
export class Playlist {
    @Prop()
    name: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Track' }] })
    tracks: Types.ObjectId[];
}

export const PlaylistSchema = SchemaFactory.createForClass(Playlist);