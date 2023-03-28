<script setup lang="ts">
import { useLang } from '../../../../../../../shared/composables/i18n';
import { ProfileHelpers } from '../ProfileHelpers';

import ProfileContentEntry from '../ProfileContentEntry.vue';

const { t } = useLang();

const props = defineProps({
    aboutMe: {
        type: String,
        default: '',
    },
    interests: {
        type: Object as () => string[],
        default: null,
    },
});

</script>
<template>
    <div
        class="ProfilePersonality mt-[2px] w-full grow bg-white lg:flex lg:gap-1 lg:bg-transparent"
        data-testid="ProfileContentPersonality"
    >
        <div class="lg:flex lg:w-1/3 lg:flex-col lg:gap-1">
            <div
                class="AboutMe bg-white lg:px-[44px] lg:pt-[32px] lg:pb-[22px]"
            >
                <ProfileContentEntry
                    :title="t('label', 'aboutMe')"
                    :content-entry-id="ProfileHelpers.contentEntries.ABOUTME"
                >
                    <div
                        class="break-words text-base tracking-[-0.1px]"
                    >
                        {{ props.aboutMe || t('input', 'notSpecified') }}
                    </div>
                </ProfileContentEntry>
            </div>
            <div class="Interests bg-white lg:px-[44px] lg:pt-[32px] lg:pb-[22px]">
                <ProfileContentEntry
                    :title="t('label', 'interests')"
                    :content-entry-id="ProfileHelpers.contentEntries.INTERESTS"
                >
                    <div
                        class="break-words text-base tracking-[-0.1px]"
                    >
                        {{
                            interests?.length > 0 ?
                                interests.join(', ') :
                                t('input', 'notSpecified')
                        }}
                    </div>
                </ProfileContentEntry>
            </div>
        </div>
        <div class="PersonalityTraits bg-white lg:w-2/3 lg:px-[42px] lg:pt-[29px]"/>
    </div>
</template>
