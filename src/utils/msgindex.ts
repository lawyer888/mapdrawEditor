import { message } from '@/utils/resetMessage';
export const Message = (type: any, payload: any, duration?: any, offset?: any) => {
    message[type]({
        'message': payload,
        'custom-class': 'className',
        'offset': offset || 56,
        'duration': duration || 8000,
        'appendTo': document.getElementsByClassName('className')[0]
    });
};
