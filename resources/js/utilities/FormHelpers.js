export const FormEnum = Object.freeze({
    TRANSLATION: 'Translation',
    TRANSLATION_CREATE: 'TranslationCreate',
    TRANSLATION_EDIT: 'TranslationEdit',
    TERM: 'Term',
    TERM_CREATE: 'TermCreate',
    TERM_EDIT: 'TermEdit',
});

export const FormTypes = Object.freeze( {
    TEXT: 'text',
    NUMBER: 'number',
    DATE: 'date',
    OBJECT: 'object',
    ARRAY: 'array',
})
const BaseType = [
    /*{
        key: 'id',
        type: FormTypes.NUMBER,
    },
    {
        key: 'slug',
        type: FormTypes.TEXT,
    },*/
    {
        key: 'name',
        type: FormTypes.TEXT,
    },
    {
        key: 'description',
        type: FormTypes.TEXT,
    },
    /*{
        key: 'created_at',
        type: FormTypes.DATE,
    },
    {
        key: 'updated_at',
        type: FormTypes.DATE,
    },*/
];
const TermId = {
    key: 'term_id',
    type: FormTypes.TEXT,
}
const BaseParentType = [...BaseType ];//TermId ];

const TranslationBase = {
    listUrl: '/list/translation',
    baseUrl: '/translation',
    noReset: ['name','description','term_id'],
    formConfig: BaseParentType
};
export const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}
export const TermBase = {
    listUrl: '/list/term',
    baseUrl: '/term',
    noReset: ['name','description','term_id'],
    formConfig: BaseType
};
export const EnumConfig = {
    [FormEnum.TRANSLATION_CREATE] : TranslationBase,
    [FormEnum.TRANSLATION_EDIT] : TranslationBase,
    [FormEnum.TRANSLATION] : { ...TranslationBase, formConfig: [...TranslationBase.formConfig, {
            key: 'term',
            type: FormTypes.OBJECT,
            config: BaseType
        } ]},
    [FormEnum.TERM_CREATE] : TermBase,
    [FormEnum.TERM_EDIT] : TermBase,
    [FormEnum.TERM] : { ...TermBase, formConfig: [...TermBase.formConfig, {
            key: 'translations',
            type: FormTypes.ARRAY,
            config: BaseParentType,
        }]},
}

export function setFormValues(form,data) {
    if(form instanceof Form){
        Object.keys(data).forEach( (key) => {
            form[key] = data[key];
        });
    }
}


