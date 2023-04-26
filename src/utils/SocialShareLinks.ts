export interface SocialShareLink{
    shareUrl: string;
    display: string | JSX.Element;
}

export const socialShareLink: Record<string, SocialShareLink> = {
    facebook: {
        shareUrl: 'https://www.facebook.com/sharer/sharer.php?u=',
        display: 'Facebook',
    },
    twitter: {
        shareUrl: 'https://twitter.com/intent/tweet?text=',
        display: 'Twitter',
    },
    whatsapp: {
        shareUrl: 'https://api.whatsapp.com/send?text=',
        display: 'Whatsapp'
    }
}