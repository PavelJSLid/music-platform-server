import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Album, AlbumDocument } from '../album/schemas/album.schema';
import { Model, Types } from 'mongoose';
import mongoose from 'mongoose';
import { CreateAlbumDto } from '../album/dto/create-album.dto';
import { FileService, FileType } from 'src/file/file.service';
import { Track, TrackDocument } from 'src/track/schemas/track.schema';


@Injectable()
export class AlbumService {
    constructor(
        @InjectModel(Album.name) private albumModel: Model<AlbumDocument>,
        @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
        private fileService: FileService,
    ) { }

    async create(dto: CreateAlbumDto, picture: Express.Multer.File): Promise<Album> {
        const picturePath = this.fileService.createFile(FileType.IMAGE, picture);

        let trackIds: string[] = [];

        if (typeof dto.tracks === 'string') {
            try {
                trackIds = JSON.parse(dto.tracks);
            } catch (error) {
                console.error('Ошибка при парсинге dto.tracks:', error);
                throw new Error('Невалидный формат tracks');
            }
        } else if (Array.isArray(dto.tracks)) {
            trackIds = dto.tracks;
        }

        const trackObjectIds = trackIds.map(id => new mongoose.Types.ObjectId(id));

        const album = await this.albumModel.create({
            name: dto.name,
            author: dto.author,
            picture: picturePath,
            tracks: trackObjectIds,
        });

        return album.populate('tracks');
    }

    async getAll(count = 10, offset = 0): Promise<Album[]> {
        return this.albumModel
            .find()
            .skip(Number(offset))
            .limit(Number(count))
            .populate('tracks')
            .lean();
    }

    async getOne(id: string | Types.ObjectId): Promise<Album> {
        const album = await this.albumModel.findById(id).populate('tracks');
        if (!album) {
            throw new NotFoundException('Альбом не найден');
        }
        return album;
    }

    async delete(id: string | Types.ObjectId): Promise<Types.ObjectId> {
        const album = await this.albumModel.findByIdAndDelete(id);
        if (!album) {
            throw new NotFoundException(`Альбом с id ${id} не найден`);
        }
        return album._id as Types.ObjectId;
    }

    async search(query: string): Promise<Album[]> {
        return this.albumModel.find({
            name: { $regex: new RegExp(query, 'i') },
        }).lean();
    }

    async addTrack(albumId: string | Types.ObjectId, trackId: string | Types.ObjectId): Promise<Album> {
        const album = await this.albumModel.findById(albumId);
        const track = await this.trackModel.findById(trackId);

        if (!album || !track) {
            throw new NotFoundException('Альбом или трек не найден');
        }

        const trackObjectId = new mongoose.Types.ObjectId(trackId);

        const trackAlreadyExists = album.tracks.some(t =>
            t instanceof mongoose.Types.ObjectId && t.equals(trackObjectId),
        );

        if (!trackAlreadyExists) {
            album.tracks.push(trackObjectId);
            await album.save();
        }

        return album.populate('tracks');
    }
}