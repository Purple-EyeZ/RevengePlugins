import { findByProps } from "@vendetta/metro";
import intlProxy from "../intlProxy";
import { instead } from "@vendetta/patcher";

const autoConfirmKeys = { embed: 'SUPPRESS_EMBED_BODY', message: 'DELETE_MESSAGE_BODY' };

let unpatch;

export default {
    onLoad: () => {
        const Popup = findByProps("show", "openLazy");
        if (!Popup) return;

        unpatch = instead("show", Popup, (args, fn) => {
            const titleOrBody = [args?.[0]?.children?.props?.title?.trim(), args?.[0]?.body?.trim()];
            const isDeletion = (type: keyof typeof autoConfirmKeys) =>
                titleOrBody.includes(intlProxy[autoConfirmKeys[type]]);

            if (isDeletion('message') || isDeletion('embed')) {
                args[0].onConfirm?.();
            } else {
                fn(...args);
            }
        });
    },
    onUnload: () => unpatch?.(),
};