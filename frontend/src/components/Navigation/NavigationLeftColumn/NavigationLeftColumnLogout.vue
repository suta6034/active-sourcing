<script setup lang="ts">
import { useLang } from '../../../packages/shared/composables/i18n';
import {
    DATA_GTM_ELEMENT,
    DATA_GTM_ELEMENT_DETAIL,
    TRACKINGPREFIX,
} from '../../../util/tracking/tracking';

import LogoutIcon from '../../../packages/shared/assets/icons/LogoutIcon.vue';

const {
    t,
} = useLang();

function getCSRFToken() {
    if (document.cookie) {
        // eslint-disable-next-line no-useless-escape
        const cookie = document.cookie.match(/(?:(?:^|.*;\s*)ASP-XSRF-TOKEN\s*\=\s*([^;]*).*$)|^.*$/);
        if (cookie) {
            return cookie[1];
        }
    }
    return null;
}

const CSRF_TOKEN = getCSRFToken();

</script>
<template>
    <form
        method="post"
        action="/logout"
        class="flex justify-center"
    >
        <input
            data-testid="logout input"
            name="_csrf"
            type="hidden"
            :value="CSRF_TOKEN"
        >
        <button
            data-testid="LogoutButton"
            type="submit"
            class="my-[20px]"
            :title="t('button', 'logout')"
            :data-gtm-element="`${TRACKINGPREFIX}: ${DATA_GTM_ELEMENT.navigation}`"
            :data-gtm-element-detail="DATA_GTM_ELEMENT_DETAIL.logout"
        >
            <svg
                viewBox="0 0 32 32"
                width="24"
                height="24"
            ><LogoutIcon/></svg>
        </button>
    </form>
</template>
