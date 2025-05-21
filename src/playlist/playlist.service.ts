import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Playlist, PlaylistDocument } from './schemas/playlist.schema';
import { Model, Types } from 'mongoose';
import mongoose from 'mongoose';
import { CreatePlaylistDto } from '../playlist/dto/create-playlist.dto'
import { Track, TrackDocument } from 'src/track/schemas/track.schema';


@Injectable()
export class PlaylistService {
    constructor(
        @InjectModel(Playlist.name) private playlistModel: Model<PlaylistDocument>,
        @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
    ) { }

    async create(dto: CreatePlaylistDto): Promise<Playlist> {
        const trackObjectIds = (dto.tracks || []).map(id => new mongoose.Types.ObjectId(id));

        const playlist = await this.playlistModel.create({
            name: dto.name,
            tracks: trackObjectIds,
        });

        return playlist.populate('tracks');
    }

    async getAll(count = 10, offset = 0): Promise<Playlist[]> {
        return this.playlistModel
            .find()
            .skip(Number(offset))
            .limit(Number(count))
            .populate('tracks')
            .lean();
    }

    async getOne(id: string | Types.ObjectId): Promise<Playlist> {
        const playlist = await this.playlistModel.findById(id).populate('tracks');
        if (!playlist) {
            throw new NotFoundException('Плейлист не найден');
        }
        return playlist;
    }

    async delete(id: string | Types.ObjectId): Promise<Types.ObjectId> {
        const playlist = await this.playlistModel.findByIdAndDelete(id);
        if (!playlist) {
            throw new NotFoundException(`Плейлист с id ${id} не найден`);
        }
        return playlist._id as Types.ObjectId;
    }

    async search(query: string): Promise<Playlist[]> {
        return this.playlistModel.find({
            name: { $regex: new RegExp(query, 'i') },
        }).lean();
    }

    async addTrack(playlistId: string | Types.ObjectId, trackId: string | Types.ObjectId): Promise<Playlist> {
        const playlist = await this.playlistModel.findById(playlistId);
        const track = await this.trackModel.findById(trackId);

        if (!playlist || !track) {
            throw new NotFoundException('Плейлист или трек не найден');
        }

        const trackObjectId = new mongoose.Types.ObjectId(trackId);

        const trackAlreadyExists = playlist.tracks.some(t =>
            t instanceof mongoose.Types.ObjectId && t.equals(trackObjectId),
        );

        if (!trackAlreadyExists) {
            playlist.tracks.push(trackObjectId);
            await playlist.save();
        }

        return playlist.populate('tracks');
    }
}