import TemplateNotifikasi from "#models/notifikasi/template_notifikasi";
import TipeNotifikasi from "#models/notifikasi/tipe_notifikasi"
import { HttpContext } from "@adonisjs/core/http";
import { templateNotifikasiValidator, updateTemplateNotifikasiValidator } from "#validators/notifikasi/template_notifikasi";
import { TemplateNotifikasiServices } from "#services/notifikasi/TemplateNotifikasiServices";

export default class TemplateNotifikasiController {
    async index({ inertia }: HttpContext) {
        const tipeNotifikasi = await TipeNotifikasi.all();
        const templateNotifikasi = await TemplateNotifikasi.query().preload('tipe_notifikasi');
        return inertia.render('notifikasi/templateNotifikasi', { tipeNotifikasi, templateNotifikasi })
    }
    async create({ response, request, session }: HttpContext) {
        try {
            const payload = await request.validateUsing(templateNotifikasiValidator);

            await TemplateNotifikasiServices.create(payload);
            session.flash('success', `${payload.nama_template} berhasil ditambahkan`);
            return response.redirect().toRoute('templateNotifikasi.index');
        } catch (error) {
            console.error(error)
            if (error.code === 'E_VALIDATION_ERROR') {
                throw error
            }
            session.flash('error', 'Terjadi kesalahan saat tambah data.')
            return response.redirect().back();
        }
    }
    async edit({ inertia, params }: HttpContext) {
        const templateNotifikasi = await TemplateNotifikasi.query().where('id_template_notifikasi', params.id).preload('tipe_notifikasi').first();
        const tipeNotifikasi = await TipeNotifikasi.all();
        const dataTemplateNotifikasi = templateNotifikasi?.$attributes;
        return inertia.render('notifikasi/update/templateNotifikasi', { dataTemplateNotifikasi, tipeNotifikasi });
    }
    async update({ response, request, session, params }: HttpContext) {
        try {
            const payload = await request.validateUsing(updateTemplateNotifikasiValidator);

            await TemplateNotifikasiServices.update(payload, params.id);

            session.flash('success', `${payload.nama_template} berhasil diupdate`);
            return response.redirect().toRoute('templateNotifikasi.index');
        } catch (error) {
            if (error.code === 'E_VALIDATION_ERROR') {
                throw error
            }
            session.flash('error', 'Terjadi kesalahan saat update data.')
            return response.redirect().back();
        }
    }
    async destroy({ response, session, params }: HttpContext) {
        try {
            await TemplateNotifikasiServices.destroy(params.id);

            session.flash('success', `Template Notifikasi berhasil dihapus`);
            return response.redirect().toRoute('templateNotifikasi.index');
        } catch (error) {
            if (error.code === 'E_VALIDATION_ERROR') {
                throw error
            }
            session.flash('error', 'Terjadi kesalahan saat delete data.')
            return response.redirect().back();
        }
    }
    async search({ request, response, inertia }: HttpContext) {
        const search = request.input('search', '');
        if (!search) {
            return response.redirect().toRoute('templateNotifikasi.index');
        }
        const searchRes = await TemplateNotifikasiServices.search(search);
        return inertia.render("notifikasi/templateNotifikasi", { searchRes });
    }

}