import * as gtag from '../services/gtag';

export const callWhatsapp = () => {
    gtag.track('conversion', { sendTo: 'AW-11140098875/xS46CN3gnKwYELvWgcAp', value: 0, currency: 'BRL'});
    window.open(`https://api.whatsapp.com/send?phone=5551985994869&text=Olá Robson!\nGostaria de obter uma consultoria personalizada.`, '_blank');
}