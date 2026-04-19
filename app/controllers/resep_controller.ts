import type { HttpContext } from '@adonisjs/core/http'
import Bahan from '#models/bahan';
import Produk from '#models/produk';
import { ResepServices } from '#services/ResepServices';
import Resep from '#models/resep';
import ResepBahan from '#models/resep_bahan';

export default class ResepController {
    async index({ inertia }: HttpContext) {
        const bahan = await Bahan.query().where({ is_deleted: false });
        const produk = await Produk.query().where({ is_deleted: false });
        const resep = await Resep.query().preload('produk').where({ is_deleted: false });

        return inertia.render('resep', { bahan, produk, resep });
    }
    async create({ request, response, session }: HttpContext) {
        try {
            const payload = request.only(['nama_resep', 'id_produk', 'yield_per_batch', 'catatan_tambahan', 'bahan']);
            await ResepServices.create(payload);
            session.flash('success', `${payload.nama_resep} Berhasil ditambahkan `);
            return response.redirect().toRoute('resep.index');
        } catch (error) {
            session.flash('error', 'Terjadi kesalahan dalam pembuatan resep.');
            return response.redirect().back();
        }
    }
    async edit({ inertia, params }: HttpContext) {
        const specificResep = await Resep.find(params.id);
        const specificDataResep = specificResep?.$attributes;

        const specificResepBahan = await ResepBahan.findManyBy('id_resep', params.id);

        const produk = await Produk.query().where({ is_deleted: false });
        const bahan = await Bahan.query().where({ is_deleted: false });

        return inertia.render('updateResep', { specificDataResep, specificResepBahan, produk, bahan });
    }
    async update({ response, request, session, params }: HttpContext) {
        try {
            const payload = request.only(['id_resep', 'nama_resep', 'id_produk', 'yield_per_batch', 'bahan'])
            await ResepServices.update(params.id, payload);

            session.flash('success', `${payload.nama_resep} berhasil diupdate`);
            response.redirect().toRoute('resep.index');
        } catch (error) {
            session.flash('error', 'Terjadi kesalahan dalam update data.');
            return response.redirect().back();
        }
    }
    async destroy({ response, session, params }: HttpContext) {
        try {
            const resep = await Resep.find(params.id);
            await ResepServices.delete(params.id);

            session.flash('success', `${resep?.nama_resep} berhasil dihapus`);
            return response.redirect().toRoute('resep.index');
        } catch (error) {
            session.flash('error', 'Terjadi kesalahan saat delete.');
            return response.redirect().back();
        }
    }
}   