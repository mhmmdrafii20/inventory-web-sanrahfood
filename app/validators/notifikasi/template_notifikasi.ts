import TipeNotifikasi from '#models/notifikasi/tipe_notifikasi';
import vine from '@vinejs/vine';
import { FieldContext } from '@vinejs/vine/types';

const isKontenHasValidFormat = vine.createRule(async (value: unknown, _, field: FieldContext) => {
    if (typeof value !== 'string') {
        return field.report('Konten harus berupa string', 'string', field);
    }
    const variables = value.match(/\{(\w+)\}/g);
    if (!variables) {
        return field.report('Konten harus memiliki setidaknya satu {variable}', 'variable', field);
    }
    for (const variable of variables) {
        const key = variable.replace(/[{}]/g, '');

        const isValidFormat = /^[a-zA-Z_]+$/.test(key);

        if (!isValidFormat) {
            return field.report(`Variable tidak valid : {${key}}`, 'variable', field);
        }

    }

}, { isAsync: true })

export const templateNotifikasiValidator = vine.create({
    id_tipe_notifikasi: vine
        .number()
        .min(1),
    nama_template: vine
        .string()
        .minLength(3)
        .maxLength(50)
        .trim(),
    konten: vine
        .string()
        .minLength(3)
        .maxLength(100)
        .trim()
        .use(isKontenHasValidFormat()),
})

export const updateTemplateNotifikasiValidator = vine.create({
    id_notifikasi_template: vine
        .number()
        .min(1)
        .optional(),
    id_tipe_notifikasi: vine
        .number()
        .min(1)
        .optional(),
    nama_template: vine
        .string()
        .minLength(3)
        .maxLength(50)
        .trim()
        .optional(),
    konten: vine
        .string()
        .minLength(3)
        .maxLength(100)
        .trim()
        .use(isKontenHasValidFormat())
        .optional(),
})