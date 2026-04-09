import Kategori from "#models/kategori"
import { ProdukServices } from "#services/ProdukServices";
import { HttpContext } from "@adonisjs/core/http"

export default class ProdukController {
    async index ({inertia}:HttpContext) {
        const kategori = await Kategori.all();
        return inertia.render('produk', {kategori})
    }
    async create({request, response, session}:HttpContext) {
        try{
            const payload = request.only(['id_kategori', 'nama_produk', 'satuan']);
            await ProdukServices.create(payload);

            session.flash('success', 'Berhasil melakukan penambahan produk');
            return response.redirect().toRoute('produk.index');
        }catch(error){
            session.flash('error', 'Terjadi kesalahan dalam pembuatan produk.')
            return response.redirect().back();
        }
    }
}