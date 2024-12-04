import { findByProps } from "@vendetta/metro";
import intlProxy from "../intlProxy";
import { instead } from "@vendetta/patcher";

let unpatch;

export default {
    onLoad: () => {
        const Popup = findByProps("show", "openLazy");
        if (!Popup) return;

        unpatch = instead("show", Popup, (args, fn) => {
            if ([intlProxy.DELETE_MESSAGE, intlProxy.SUPPRESS_EMBED_TITLE].includes(args?.[0]?.title)) {
                args[0].onConfirm?.();
            } else {
                fn(...args);
            }
        });
    },
    onUnload: () => unpatch?.(),
};