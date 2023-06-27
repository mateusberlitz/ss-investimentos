import * as gtag from '../services/gtag';

export const callWhatsapp = (text?:string) => {
    const whatsText = text ? text : `Olá Robson!\nGostaria de obter uma consultoria personalizada.`;

    gtag.track('conversion', { sendTo: 'AW-11140098875/xS46CN3gnKwYELvWgcAp', value: 0, currency: 'BRL'});
    window.open(`https://api.whatsapp.com/send?phone=5551985994869&text=${whatsText}`, '_blank');
}