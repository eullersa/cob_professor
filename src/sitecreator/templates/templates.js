import { bannerHouses, navbaritems } from "./examples";

export const templates = {
    navbars: [
        {
            value: 'NavbarItems',
            text: 'Transparente Com 3 Itens e Referências',
            example: navbaritems,
            inputs: [                
                {
                    value: 'title', 
                    text: 'Título da Página',
                    type: 'text'
                },
                {
                    value: 'font', 
                    text: 'Fonte da Página',
                    type: 'select',
                    options: [
                        {
                            text: 'Cabin',
                            value: `'Cabin', sans-serif`
                        },
                        {
                            text: 'Roboto',
                            value: `'Roboto', sans-serif`
                        }
                    ]
                },
                {
                    value: 'link', 
                    text: 'Logo Favicon da Página',
                    type: 'file',
                    width: '40',
                    placeholder: 'URL do favicon'
                },
                {
                    value: 'whatsapp', 
                    text: 'Link do WhatsApp (Opcional)',
                    type: 'text',
                    required: false
                },
                {
                    value: 'whatsappposition', 
                    text: 'Posição do Botão do WhatsApp',
                    type: 'select',
                    required: false,
                    options: [
                        {
                            text: 'Esquerda',
                            value: `left`
                        },
                        {
                            text: 'Direita',
                            value: `right`
                        }
                    ]
                },
                {
                    value: 'logo', 
                    text: 'URL da logo',
                    type: 'file',
                    width: '100',
                    placeholder: 'URL da imagem'
                },
                {
                    value: 'phone', 
                    text: 'Número de telefone',
                    type: 'text'
                },
                {
                    value: 'color', 
                    text: 'Cor do texto',
                    type: 'color'
                },
                {
                    value: 'weight', 
                    text: 'Tamanho do texto',
                    type: 'select',
                    required: false,
                    options: [
                        {
                            text: 'Normal',
                            value: '20px'
                        },
                        {
                            text: 'Muito Pequeno',
                            value: '16px'
                        },
                        {
                            text: 'Pequeno',
                            value: '18px'
                        },
                        {
                            text: 'Grande',
                            value: '22px'
                        },
                        {
                            text: 'Muito Grande',
                            value: '24px'
                        }
                    ]
                },
                // Primeiro Cartão
                {
                    cut: 'Item 1'
                },
                {
                    value: 'item1', 
                    text: 'Item 1',
                    type: 'text'
                },
                {
                    value: 'reference1', 
                    text: 'Referência 1',
                    type: 'number'
                },
                // Segundo Cartão
                {
                    cut: 'Item 2'
                },
                {
                    value: 'item2', 
                    text: 'Item 2',
                    type: 'text'
                },
                {
                    value: 'reference2', 
                    text: 'Referência 2',
                    type: 'number'
                },
                // Terceiro Cartão
                {
                    cut: 'Item 3'
                },
                {
                    value: 'item3', 
                    text: 'Item 3',
                    type: 'text'
                },
                {
                    value: 'reference3', 
                    text: 'Referência 3',
                    type: 'number'
                },
                // Espaçamento
                {
                    cut: 'Propriedades'
                },
                {
                    value: 'spacing', 
                    text: 'Espaçamento (em px)',
                    type: 'number',
                    required: false
                },
                {
                    value: 'center', 
                    text: 'Formato dos itens',
                    type: 'select',
                    required: false,
                    options: [
                        {
                            text: 'Com botão de acesso',
                            value: `student`
                        },
                        {
                            text: 'Sem botão de acesso',
                            value: `false`
                        }
                    ]
                },
                // Caso for selecionado Área do Aluno
                {
                    cut: 'Caso for selecionado Área do Aluno'
                },
                {
                    value: 'buttonColor', 
                    text: 'Cor do botão',
                    type: 'color',
                    required: false
                },
                {
                    value: 'buttonText', 
                    text: 'Texto do botão',
                    type: 'text',
                    required: false
                },
                {
                    value: 'textColor', 
                    text: 'Cor do texto do botão',
                    type: 'color',
                    required: false
                },
                {
                    value: 'buttonFormat', 
                    text: 'Arredondamento',
                    type: 'select',
                    required: false,
                    options: [
                        {
                            text: 'Redondo',
                            value: 'true'
                        },
                        {
                            text: 'Retangular',
                            value: 'false'
                        }
                    ]
                },
            ]
        },
    ],
    banners: [
        {
            example: bannerHouses,
            value: 'Banner', 
            text: 'Banner básico',
            inputs: [
                {
                    cut: 'Banner'
                },
                {
                    value: 'title', 
                    text: 'Título',
                    type: 'text'
                },
                {
                    value: 'subtitle', 
                    text: 'Subtítulo',
                    type: 'text'
                },
                {
                    value: 'backgroundColor', 
                    text: 'Cor de fundo',
                    type: 'color'
                },
                {
                    value: 'cta', 
                    text: 'Call to Action',
                    type: 'text'
                },
                {
                    value: 'colorButton', 
                    text: 'Cor do texto do botão',
                    type: 'color'
                },
                {
                    value: 'buttonColor', 
                    text: 'Cor do botão',
                    type: 'color'
                },
                {
                    value: 'buttonFormat', 
                    text: 'Arredondamento do botão',
                    type: 'select',
                    required: false,
                    options: [
                        {
                            text: 'Redondo',
                            value: 'true'
                        },
                        {
                            text: 'Retangular',
                            value: 'false'
                        }
                    ]
                },
                {
                    value: 'formPosition', 
                    text: 'Posição do cartão',
                    type: 'select',
                    options: [
                        {
                            text: 'Esquerda',
                            value: 'left'
                        },
                        {
                            text: 'Direita',
                            value: 'right'
                        }
                    ]
                },
                {
                    value: 'image', 
                    text: 'Banner',
                    type: 'file',
                    width: '1200',
                    placeholder: 'URL da imagem',
                    required: false
                },
                {
                    value: 'imagemdivertida',
                    text: 'Emoji',
                    type: 'file',
                    width: '90',
                    placeholder: 'URL da imagem',
                    required: false
                }
            ]
        }
    ]
}