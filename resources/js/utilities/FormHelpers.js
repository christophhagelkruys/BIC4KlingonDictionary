export const FormEnum = Object.freeze({
    TRANSLATION: 'Translation',
    TERM: 'Term',
});

export const FormTypes = Object.freeze( {
    TEXT: 'text',
    NUMBER: 'number',
    DATE: 'date',
    OBJECT: 'object',
    ARRAY: 'array',

})
const BaseType = [
    [
        {
            key: 'id',
            type: FormTypes.NUMBER,
        },
        {
            key: 'slug',
            type: FormTypes.NUMBER,
        },
        {
            key: 'name',
            type: FormTypes.NUMBER,
        },
        {
            key: 'description',
            type: FormTypes.NUMBER,
        },
        {
            key: 'created_at',
            type: FormTypes.NUMBER,
        },
        {
            key: 'updated_at',
            type: FormTypes.NUMBER,
        },

    ],
];
const TermId = {
    key: 'term_id',
    type: FormTypes.NUMBER,
}
const BaseParentType = [...BaseType,TermId ];

export const EnumConfig = {
    [FormEnum.TRANSLATION] : {
        listUrl: '/list/translation',
        formConfig: [...BaseParentType, {
                key: 'term',
                type: FormTypes.OBJECT,
                config: BaseType
            }
        ],
    },
    [FormEnum.TERM] : {
        listUrl: '/list/term',
        formConfig: [...BaseType, {
            key: 'translations',
            type: FormTypes.ARRAY,
            config: BaseParentType,
        }]
    },
}

export function setFormValues(form,data) {
    if(form instanceof Form){
        Object.keys(data).forEach( (key) => {
            form[key] = data[key];
        });
    }
}


