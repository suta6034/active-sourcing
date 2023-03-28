<script setup lang="ts">
import {
    onMounted, onUnmounted, ref, watch, type Ref,
} from 'vue';
import { useLang } from '../../../../../../../shared/composables/i18n';
import BasePill from '../../../../../../../shared/components/base/BasePill.vue';
import type { ProfileSkills } from '../../../../../../../shared/types/profile/types';
import { ProfileHelpers, type Skill } from '../ProfileHelpers';

const props = defineProps({
    entries: {
        type: Object as () => ProfileSkills,
        default: null,
    },
});

const skills: Ref<Array<Skill>> = ref([]);
const container: Ref<HTMLElement | null> = ref(null);
const skillElements: Ref<Array<HTMLElement>> = ref([]);
const showAllSkills: Ref<boolean> = ref(false);
const lastVisibleSkillIdx: Ref<number> = ref(-1);
const layoutDone: Ref<boolean> = ref(false);

watch(() => showAllSkills.value, (newValue) => {
    for (let idx = lastVisibleSkillIdx.value + 1; idx < skills.value.length; idx += 1) {
        skills.value[idx].hidden = !newValue;
    }
});

const layoutSkills = (): void => {
    lastVisibleSkillIdx.value = ProfileHelpers.layout.getLastShownIndexOfSkills(skillElements.value, container.value);
    for (let idx = skills.value.length - 1; idx > lastVisibleSkillIdx.value; idx -= 1) {
        skills.value[idx].hidden = true;
    }
    layoutDone.value = true;
};

const resize = (): void => {
    layoutDone.value = false;
    for (const skill of skills.value) {
        skill.hidden = false;
    }
    setTimeout(() => {
        layoutSkills();
    }, 0);
};

onMounted(() => {
    if (props.entries) {
        for (const excellent of props.entries.excellent) {
            skills.value.push({ label: excellent, level: 3, hidden: false });
        }
        for (const advanced of props.entries.advanced) {
            skills.value.push({ label: advanced, level: 2, hidden: false });
        }
        for (const basic of props.entries.basic) {
            skills.value.push({ label: basic, level: 1, hidden: false });
        }
        setTimeout(() => {
            layoutSkills();
        }, 0);
        window.addEventListener('resize', resize);
    }
});

onUnmounted(() => {
    window.removeEventListener('resize', resize);
});

const { t } = useLang();
</script>
<template>
    <div class="ProfileSkills relative max-w-full">
        <div
            v-if="skills?.length"
            ref="container"
            class="ProfileSkillsContainer max-w-full"
            :class="{
                'absolute': !layoutDone,
            }"
        >
            <div
                v-for="(entry, index) of skills"
                :key="index"
                ref="skillElements"
                class="ProfileSkillsEntry inline-block max-w-full"
                :class="{
                    'invisible': !layoutDone,
                }"
            >
                <BasePill
                    v-if="!entry.hidden"
                    class="ProfileSkills_BasePill"
                    :selected-label="entry.label"
                    :show-dots="true"
                    :filled-dots="entry.level"
                    :gray-background="true"
                    :has-margin-right="true"
                    :has-margin-bottom="true"
                />
            </div>
            <div
                v-if="lastVisibleSkillIdx !== skills.length - 1 && layoutDone"
                class="ProfileSkillsMoreButton cursor-pointer text-small tracking-[-0.1px] text-gray-600 underline"
                @click="showAllSkills = !showAllSkills"
            >
                <span v-if="!showAllSkills">
                    {{ '+ ' + (skills.length - lastVisibleSkillIdx - 1) + ' ' + (t('label', 'showMore')) + '...' }}
                </span>
                <span v-else>
                    {{ (t('button', 'less')) + '...' }}
                </span>
            </div>
        </div>
    </div>
</template>
