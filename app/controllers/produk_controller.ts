import Kategori from "#models/kategori"
import Produk from "#models/produk";
import { ProdukServices } from "#services/ProdukServices";
import { HttpContext } from "@adonisjs/core/http"

export default class ProdukController {
    async index ({inertia}:HttpContext) {
        const kategori = await Kategori.all();
        const produk = await Produk.query().preload('kategori').where({is_deleted:false});

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
    async edit({inertia, params}:HttpContext) {
        const produk = await Produk.find(params.id);
        const dataProduk =  produk?.$attributes;

        const kategori = await Kategori.all();

        return inertia.render('updateProduk', {dataProduk, kategori});
    }
   async update({response, request,  session, params}:HttpContext){
        try{
            const produk = await Produk.find(params.id);
            const dataProduk = produk?.$attributes;
            
            const payload = request.only(['id_produk', 'id_kategori', 'nama_produk', 'satuan']);
            await ProdukServices.update(payload, params.id);
            session.flash('success', `${dataProduk?.nama_produk} berhasil diupdate`);
            return response.redirect().toRoute('produk.index');
        }catch(error){
            session.flash("error", 'Terjadi kesalahan saat update data');
            return response.redirect().back();
        }
   }
    async destroy({response, params, session}:HttpContext){
        try{
            const produk = await Produk.find(params.id);
            const dataProduk = produk?.$attributes;

            await ProdukServices.delete(params.id);
    
            session.flash('success', `${dataProduk?.nama_produk} berhasil dihapus`);
            return response.redirect().toRoute('produk.index');
        }catch(error){
            session.flash('error', 'Terjadi kesalahan saat delete.');
            return response.redirect().back();
        }
    }
}