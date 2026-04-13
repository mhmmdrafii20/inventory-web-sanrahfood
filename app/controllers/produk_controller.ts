import Kategori from "#models/kategori"
import Produk from "#models/produk";
import { ProdukServices } from "#services/ProdukServices";
import { HttpContext } from "@adonisjs/core/http"

export default class ProdukController {
    async index ({inertia}:HttpContext) {
        const kategori = await Kategori.all();
        const produk = await Produk.query().preload('kategori');

        return inertia.render('produk', {kategori, produk})
    }
    async create({request, response, session}:HttpContext) {
        try{
            const payload = request.only(['nama_produk', 'satuan', 'id_kategori']);
            console.log(payload)
            await ProdukServices.create(payload);

            session.flash('success', 'Berhasil melakukan penambahan produk');
            return response.redirect().toRoute('produk.index');
        }catch(error){
            session.flash('error', 'Terjadi kesalahan dalam pembuatan produk.')
            return response.redirect().back();
        }
    }
}